import React, { useState } from "react";
import { fetchMarsPhotos, fetchMarsManifest } from "../Services/Api";
import "./Mars.css";
import '../App.css';
import { FaSearch } from "react-icons/fa"; 
import { IoRocketSharp } from "react-icons/io5"; 

const MarsRover = () => {
  const [rover, setRover] = useState("curiosity");
  const [sol, setSol] = useState("");
  const [earthDate, setEarthDate] = useState("");
  const [camera, setCamera] = useState(""); 
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const cameraOptions = ["CHEMCAM", "FHAZ", "MARDI", "RHAZ"];

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      if (!sol && !earthDate) {
        setError("Please enter either a Sol or Earth Date.");
        setLoading(false);
        return;
      }

      const photoParams = { rover, sol, earth_date: earthDate, camera, page };
      const photosData = await fetchMarsPhotos(photoParams);
      setPhotos(photosData);

      const manifestData = await fetchMarsManifest(rover);
      setManifest(manifestData);

      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 300);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="mars-container">
      <h1><IoRocketSharp />Mars Rover Exploration</h1>

     
      <div className="search-panel">
        <label htmlFor="rover">Rover:</label>
        <select id="rover" value={rover} onChange={(e) => setRover(e.target.value)}>
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>

        <label htmlFor="sol">Sol:</label>
        <input type="number" id="sol" value={sol} onChange={(e) => setSol(e.target.value)} className="input-box" />

        <label htmlFor="earthDate">Earth Date:</label>
        <input type="date" id="earthDate" value={earthDate} onChange={(e) => setEarthDate(e.target.value)} className="input-box" />

        <label htmlFor="camera">Camera:</label>
        <select id="camera" value={camera} onChange={(e) => setCamera(e.target.value)} className="input-box">
          <option value="">Select Camera</option>
          {cameraOptions.map((cam, index) => (
            <option key={index} value={cam}>{cam}</option>
          ))}
        </select>

        <label htmlFor="page">Page:</label>
        <input type="number" id="page" value={page} onChange={(e) => setPage(e.target.value)} min="1" className="input-box" />

        <button className="fetch-button" onClick={fetchData}><FaSearch />Fetch Mars Photos</button>
      </div>

  
      {error && <p className="error">{error}</p>}


      {manifest && (
        <div className="manifest">
          <h2> Mission Manifest - {manifest.name}</h2>
          <p><strong>Status:</strong> {manifest.status}</p>
          <p><strong>Landing Date:</strong> {manifest.landing_date}</p>
          <p><strong>Last Photo Date:</strong> {manifest.max_date}</p>
          <p><strong>Total Photos:</strong> {manifest.total_photos}</p>
        </div>
      )}

    
      <div className="photo-gallery">
        {loading ? <p>Loading...</p> : photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.img_src} alt="Mars" />
            <p><strong>Camera:</strong> {photo.camera.full_name}</p>
            <p><strong>Earth Date:</strong> {photo.earth_date}</p>
          </div>
        ))}
      </div>
      {photos.length > 0 && (
        <div className="response-container">
          <h3>Total Photos Found: {photos.length}</h3>
        </div>
      )}
    </div>
  );
};

export default MarsRover;
