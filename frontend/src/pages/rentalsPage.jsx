import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/rentalspage.css'; 

function RentalsPage() {
  const [rentalsData, setRentalsData] = useState([]);
  

  useEffect(() => {
    // Make an API request to fetch data from the backend
    axios.get('http://127.0.0.1:8000/api/v1/core/for-rent/')
      .then((response) => {
        setRentalsData(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching rentals data:', error);
      });
  }, []);

  return (
    <div>
      <h2 className='headerWrapper'>LATEST RENTAL PROPERTIES</h2>
      <div className="rentals-container">
        {rentalsData.map((property) => (
          <div className="property-card" key={property.id}>
            <div className="property-image">
              <img src={property.main_photo} alt={property.title} />
            </div>
            <div className="property-details">
              <h3>
                <Link to={`/property/${property.id}`}>{property.title}</Link>
                    </h3>
              <p>{property.description}</p>
              <p>{property.address}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Price: ${property.price}</p>
            </div>
          </div>
        ))}
          </div>
          <Link to="/rental" className="view-all-button">View All</Link>
    </div>
  );
}

export default RentalsPage;
