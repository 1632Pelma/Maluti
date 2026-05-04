import React, { useEffect, useState } from "react";
import "../styles/Campuses.css";

function Campuses() {
  const [campuses, setCampuses] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/campuses`)
      .then((res) => res.json())
      .then((data) => setCampuses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="campuses-section">
      <h2 className="campuses-title">Our Campuses</h2>

      <div className="campuses-container">
        {Array.isArray(campuses) &&
          campuses.map((campus) => (
            <div className="campus-card" key={campus.id}>
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
    </div>
  );
}

export default Campuses;