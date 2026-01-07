import { useState } from "react";

function ApplicationForm({ job, token, onClose, onBack }) {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!resume) {
      setError('Please upload your resume');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', job._id);
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h2>✓ Application Submitted!</h2>
        <p>Your application has been sent successfully.</p>
      </div>
    );
  }

  return (
    <div className="application-form">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>Apply for {job.title}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Resume (PDF, DOC, DOCX - Max 5MB) *</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>Cover Letter (Optional)</label>
          <textarea
            rows="6"
            placeholder="Tell us why you're a great fit for this position..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplicationForm;