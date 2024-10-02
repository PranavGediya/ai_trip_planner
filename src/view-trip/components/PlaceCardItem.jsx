import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/servies/GlobalApi"; 
import { FaMapLocationDot } from "react-icons/fa6";

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyCYF5GqbHJYzlYhzRkgwKbbok0PDWJBu6o'; // Replace with your actual API key

function PlaceCardItem({ places }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    places && GetPlacePhoto();
  }, [places]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: places.place,
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
    const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCYF5GqbHJYzlYhzRkgwKbbok0PDWJBu6o&q=${encodeURIComponent(places.place)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div 
      className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'
      onClick={handleCardClick}
    >
      <img src={PhotoUrl} className='w-[130px] h-[130px] rounded-xl object-cover' alt={places.place || "Place Image"} />
      <div>
        <h2 className='font-bold text-lg'>{places.place}</h2>
        <p className='text-sm text-gray-400'>{places.details}</p>
        <h2 className='mt-2'>🕙{places.timeToTravel}</h2>
        <Button onClick={(e) => { e.stopPropagation(); handleCardClick(); }}>
          <FaMapLocationDot />
        </Button>
      </div>
    </div>
  );
}

export default PlaceCardItem;
