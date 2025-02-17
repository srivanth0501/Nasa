import React, { useState } from "react";
import { fetchApod } from "../Services/Api";
import { FaSearch } from "react-icons/fa"; 
import { IoRocketSharp } from "react-icons/io5"; 
import "./Apod.css";
import "../App.css";

const Apod = () => {
  const [searchBy, setSearchBy] = useState("random");
  const [date, setDate] = useState("");
  const [count, setCount] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleFetchApod = async () => {
    setLoading(true);
    setError("");
    setData([]);
    try {
      const params = { searchBy, date, count, showThumbnails };
      const response = await fetchApod(params);
      setData(response);
    } catch (err) {
      setError("Failed to fetch APOD. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="apod-container">
      <h1 className="title">
        <IoRocketSharp className="icon" /> NASA Astronomy Picture of the Day
      </h1>

      <div className="search-section">
        <div className="input-group">
          <label className="label">Search By:</label>
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="dropdown">
            <option value="random">Random Count</option>
            <option value="date">Specific Date</option>
            <option value="range">Date Range</option>
          </select>
        </div>


        <div className="input-group">
          {searchBy !== "random" ? (
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-date" />
          ) : (
            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="input-number" min="1" max="10" />
          )}
        </div>

        <div className="input-group checkbox-group">
          <input type="checkbox" checked={showThumbnails} onChange={() => setShowThumbnails(!showThumbnails)} />
          <label>Show Thumbnails</label>
        </div>

        <button onClick={handleFetchApod} className="fetch-button">
          <FaSearch /> Fetch APOD
        </button>
      </div>

      {loading && <p className="loading">Fetching data...</p>}
      {error && <p className="error">{error}</p>}

      <div className="image-gallery">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="image-card">
              <h2>{item.title}</h2>
              {item.media_type === "image" ? (
                <img src={item.url} alt={item.title} className="apod-image" />
              ) : (
                <iframe src={item.url} title={item.title} className="apod-video"></iframe>
              )}
              <p className="explanation">{item.explanation}</p>
            </div>
          ))
        ) : (
          !loading && <p className="no-data"> No APOD data found. Try a different date or search option.</p>
        )}
      </div>
    </div>
  );
};

export default Apod;
