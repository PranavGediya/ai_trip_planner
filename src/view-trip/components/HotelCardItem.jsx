import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/servies/GlobalApi";

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyCYF5GqbHJYzlYhzRkgwKbbok0PDWJBu6o'; // Replace with your actual API key

function HotelCardItem({ hotel }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.name,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const photos = resp?.data?.places[0]?.photos;
      if (photos && photos.length > 3) {
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photos[3].name);
        setPhotoUrl(PhotoUrl);
      } else {
        console.warn("Photo not found for the given index.");
      }
    });
  };

  const handleCardClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCYF5GqbHJYzlYhzRkgwKbbok0PDWJBu6o&q=${encodeURIComponent(hotel?.name + ',' + hotel?.address)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="hover:scale-105 transition-all cursor-pointer" onClick={handleCardClick}>
      <img src={PhotoUrl} className="rounded-xl h-[180px] w-full object-cover" alt={hotel?.name || "Hotel Image"} />
      <div className="my-2 flex flex-col gap-2">
        <h2 className="font-medium">
          {hotel?.name || "Hotel Name Missing"}
        </h2>
        <h2 className="text-xs text-gray-500">📍
          {hotel?.address || "Address Missing"}
        </h2>
        <h2 className="text-sm">💰{hotel?.price}</h2>
        <h2 className="text-sm">⭐{hotel?.rating}</h2>
      </div>
    </div>
  );
}

export default HotelCardItem;
