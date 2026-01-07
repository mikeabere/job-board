import { useState } from "react";


function PostJob({ token }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    category: 'Technology',
    salary: '',
    description: '',
    requirements: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const jobData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(r => r.trim())
    };

    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: '',
          company: '',
          location: '',
          type: 'Full-time',
          category: 'Technology',
          salary: '',
          description: '',
          requirements: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      {success && <div className="success">Job posted successfully!</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-row">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Salary Range</label>
            <input
              type="text"
              placeholder="e.g., $50,000 - $70,000"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Job Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Job Description *</label>
          <textarea
            rows="6"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Requirements (one per line)</label>
          <textarea
            rows="6"
            placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience&#10;Knowledge of React and Node.js"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          />
        </div>

        <button type="submit" className="submit-btn">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;