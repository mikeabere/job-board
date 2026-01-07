import { useState, useEffect } from "react";

function JobList({ user, token }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    category: '',
    sort: 'newest'
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });

    try {
      const response = await fetch(`${API_URL}/jobs?${params}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  return (
    <div className="job-list-container">
      <div className="filters-section">
        <h2>Find Your Dream Job</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by title, company, or keyword"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Design">Design</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : (
        <div className="jobs-grid">
          {jobs.length === 0 ? (
            <p className="no-jobs">No jobs found matching your criteria.</p>
          ) : (
            jobs.map(job => (
              <JobCard 
                key={job._id} 
                job={job} 
                onClick={() => setSelectedJob(job)}
              />
            ))
          )}
        </div>
      )}

      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)}
          user={user}
          token={token}
        />
      )}
    </div>
  );
}

export default JobList;