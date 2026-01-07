import { useState, useEffect } from "react";

function MyJobs({ token }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/employer/jobs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      await fetch(`${API_URL}/applications/${appId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchApplications(selectedJob._id);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const viewApplications = (job) => {
    setSelectedJob(job);
    fetchApplications(job._id);
  };

  return (
    <div className="my-jobs-container">
      <h2>My Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p className="no-jobs">You haven't posted any jobs yet.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map(job => (
            <div key={job._id} className="job-item">
              <div>
                <h3>{job.title}</h3>
                <p>{job.company} • {job.location}</p>
                <p className="job-type">{job.type} • {job.category}</p>
                <p className="posted-date">
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => viewApplications(job)}>
                View Applications
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content applications-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedJob(null)}>×</button>
            <h2>Applications for {selectedJob.title}</h2>
            {applications.length === 0 ? (
              <p>No applications yet.</p>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app._id} className="application-item">
                    <div className="applicant-info">
                      <h4>{app.applicantId.name}</h4>
                      <p>{app.applicantId.email}</p>
                      {app.applicantId.phone && <p>{app.applicantId.phone}</p>}
                      <p className="applied-date">
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="application-actions">
                      <a 
                        href={`http://localhost:5000/uploads/${app.resume}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-resume-btn"
                      >
                        View Resume
                      </a>
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                        className={`status-select ${app.status}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    {app.coverLetter && (
                      <div className="cover-letter">
                        <h5>Cover Letter:</h5>
                        <p>{app.coverLetter}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobs;