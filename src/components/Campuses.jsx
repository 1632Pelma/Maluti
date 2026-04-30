import { useEffect, useState } from "react";
import "../styles/Campuses.css";

function Campuses() {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    fetch("https://maluti.onrender.com/api/campuses")
      .then(res => res.json())
      .then(data => setCampuses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="campuses-section">
      <h2 className="campuses-title">Our Campuses</h2>

      <div className="campuses-container">
        {campuses.map((campus) => (
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