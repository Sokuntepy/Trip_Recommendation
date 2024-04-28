import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const ImageRenderer = () => {
  const [attractionTypes, setAttractionTypes] = useState([]);
  const [proximity, setProximity] = useState('');
  const attractionTypeRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (attractionTypeRef.current && !attractionTypeRef.current.contains(event.target)) {
        // setShowAttractionTypes(false); // Remove this line if setShowAttractionTypes is not defined
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (attractionTypes.includes("park") && proximity === "very near") {
      setSearchResults([
        {
          name: "Ssangam Park",
          predictedReview: 4.5,
          location: "39 Cheomdanjungang-ro, Buk-gu",
          image: "/park1.jpg" // relative path to Ssangam Park image
        },
        {
          name: "Gwangju Family Land",
          predictedReview: 4.0,
          location: "77 Uchi-ro, Buk-gu",
          image: "/park2.bmp" // relative path to Gwangju Family Land image
        }
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="container">
      <img src="/gwangju.jpg" alt="Gwangju" className="image-style" />
      <div className="text-overlay">Things to do in Gwangju</div>
      <div className="search-text"><h1>Search Your Trip Here</h1></div>
      <div className="half-container">
        {/* Attraction Type Selector */}
        <div className="inline-container">
          <div className="inline-label">Your Favorite Type of Trip:</div>
          <select value={attractionTypes} onChange={e => setAttractionTypes(e.target.value)}>
            <option value="">Select type</option>
            <option value="park">park</option>
            <option value="market">market</option>
            <option value="modern architecture">modern architecture</option>
            <option value="historical site">historical site</option>
            <option value="cinema">cinema</option>
            <option value="museum">museum</option>
            <option value="forest">forest</option>
            <option value="stadium">stadium</option>
            <option value="mountain">mountain</option>
            <option value="waterfall">waterfall</option>
            <option value="church">church</option>
            <option value="other tourist destination">other tourist destination</option>
          </select>
        </div>
        {/* Proximity to Downtown Selector */}
        <div className="inline-container">
          <div className="inline-label">Proximity to Downtown:</div>
          <select value={proximity} onChange={e => setProximity(e.target.value)}>
            <option value="">Select proximity</option>
            <option value="very near">Very near downtown</option>
            <option value="near">Near downtown</option>
            <option value="far">Far from downtown</option>
          </select>
        </div>
        {/* Search Button */}
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Display search results */}
      <div className="search-results">
        {searchResults.length > 0 ? (
          <>
            <h2>Results Found:</h2>
            <div className="image-container">
              {searchResults.map((result, index) => (
                <div key={index} className="park-container">
                  <img src={result.image} alt={result.name} className="park-image" />
                  <div className="park-details">
                    <p>{result.name}</p>
                    <p>Predicted review: {result.predictedReview}</p>
                    <p>Location: {result.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default ImageRenderer;
