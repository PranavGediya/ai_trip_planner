import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function Placestovisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip.tripdata?.itinerary.map((item, index) => (
          <div className="mt-5">
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((places, index) => (
                <div>
                  <h2 className="font-medium text-sm text-orange-600">
                    {places.time}
                  </h2>
                  <PlaceCardItem places={places} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Placestovisit;
