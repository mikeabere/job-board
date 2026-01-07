function JobDetailsModal({ job, onClose, user, token }) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        {!showApplicationForm ? (
          <>
            <h2>{job.title}</h2>
            <p className="company-name">{job.company}</p>
            <div className="job-details-meta">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>📂 {job.category}</span>
              {job.salary && <span>💰 {job.salary}</span>}
            </div>

            <div className="job-section">
              <h3>Job Description</h3>
              <p>{job.description}</p>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div className="job-section">
                <h3>Requirements</h3>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {user?.role === 'applicant' && (
              <button 
                className="apply-btn"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply Now
              </button>
            )}
            {!user && (
              <p className="login-prompt">Please login as an applicant to apply for this job.</p>
            )}
          </>
        ) : (
          <ApplicationForm 
            job={job} 
            token={token} 
            onClose={onClose}
            onBack={() => setShowApplicationForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default JobDetailsModal;