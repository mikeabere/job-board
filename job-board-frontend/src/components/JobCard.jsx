function JobCard({ job, onClick }) {
  return (
    <div className="job-card" onClick={onClick}>
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <div className="job-meta">
        <span className="location">📍 {job.location}</span>
        <span className="type">{job.type}</span>
      </div>
      <p className="category">{job.category}</p>
      {job.salary && <p className="salary">💰 {job.salary}</p>}
      <p className="posted">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default JobCard;