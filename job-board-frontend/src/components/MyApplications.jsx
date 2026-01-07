import { useState, useEffect } from "react";

function MyApplications({ token }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_URL}/applications/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',
      reviewed: '#4169E1',
      shortlisted: '#32CD32',
      rejected: '#DC143C'
    };
    return colors[status] || '#666';
  };

  return (
    <div className="my-applications-container">
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p className="no-applications">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="applications-grid">
          {applications.map(app => (
            <div key={app._id} className="application-card">
              <h3>{app.jobId.title}</h3>
              <p className="company">{app.jobId.company}</p>
              <p className="location">📍 {app.jobId.location}</p>
              <p className="applied-date">
                Applied on {new Date(app.appliedAt).toLocaleDateString()}
              </p>
              <div 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(app.status) }}
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;