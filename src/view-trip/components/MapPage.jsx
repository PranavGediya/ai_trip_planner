import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MapPage() {
  const { state } = useLocation();
  const { location } = state || {}; // Accessing passed location data
  

  return (
    <div>
      
      
      <div>
        {location ? (
          <iframe
            title="Google Map"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCYF5GqbHJYzlYhzRkgwKbbok0PDWJBu6o&q=${encodeURIComponent(location)}`}
            width="100%"
        height="620px"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
}

export default MapPage;
