import React, { useEffect, useState } from "react";
import "../styles/Campuses.css";

function Campuses() {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!API_URL) return;

    setLoading(true);

    fetch(`${API_URL}/api/campuses`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch campuses");
        }
        return res.json();
      })
      .then((data) => {
        setCampuses(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="campuses-section">
      <h2 className="campuses-title">Our Campuses</h2>

    
      {loading && (
        <div className="campuses-container">
          {[...Array(6)].map((_, i) => (
            <div className="campus-card skeleton" key={i}>
              <div className="campus-image skeleton-box"></div>
              <div className="campus-name skeleton-text"></div>
            </div>
          ))}
        </div>
      )}

    
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

    
      {!loading && !error && campuses.length === 0 && (
        <p className="empty-message">No campuses available.</p>
      )}

      
      {!loading && !error && campuses.length > 0 && (
        <div className="campuses-container">
          {campuses.map((campus, index) => (
            <div
              className="campus-card fade-in"
              key={campus.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="campus-image-wrapper">
                <img
                  src={campus.image}
                  alt={campus.name}
                  className="campus-image"
                />
              </div>
              <div className="campus-name">
                <h3>{campus.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Campuses;