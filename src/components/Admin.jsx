import { useEffect, useState } from "react";

function Admin() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [campuses, setCampuses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    contact_email: "",
    contact_phone: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // -------------------------
  // FETCH CAMPUSES
  // -------------------------
  const fetchCampuses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/campuses`);
      const data = await res.json();
      setCampuses(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  // -------------------------
  // INPUT HANDLER
  // -------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------------
  // ADD CAMPUS
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/campuses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Campus added successfully!");

        setForm({
          name: "",
          location: "",
          contact_email: "",
          contact_phone: "",
          image: "",
        });

        fetchCampuses();
      } else {
        setMessage(data.error || "❌ Error adding campus");
      }
    } catch (err) {
      setMessage("❌ Server error");
    }

    setLoading(false);
  };

  // -------------------------
  // DELETE CAMPUS
  // -------------------------
  const deleteCampus = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this campus?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/api/campuses/${id}`, {
        method: "DELETE",
      });

      fetchCampuses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Campus Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="contact_email"
            placeholder="Email"
            value={form.contact_email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="contact_phone"
            placeholder="Phone"
            value={form.contact_phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.addButton}>
            {loading ? "Adding..." : "Add Campus"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        {/* TABLE */}
        <h3 style={styles.sectionTitle}>Campuses</h3>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {campuses.length === 0 ? (
                <tr>
                  <td colSpan="7" style={styles.empty}>
                    No campuses found
                  </td>
                </tr>
              ) : (
                campuses.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.location}</td>
                    <td>{c.contact_email}</td>
                    <td>{c.contact_phone}</td>
                    <td>
                      {c.image ? (
                        <a href={c.image} target="_blank" rel="noreferrer">
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteCampus(c.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;

/* -------------------------
   STYLES
------------------------- */
const styles = {
  page: {
    background: "#f4f6f8",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },

  title: {
    marginBottom: "20px",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },

  addButton: {
    gridColumn: "span 2",
    padding: "12px",
    background: "#1e88e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  message: {
    marginBottom: "15px",
  },

  sectionTitle: {
    marginTop: "20px",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },

  empty: {
    textAlign: "center",
    padding: "20px",
  },

  deleteButton: {
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};