import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/servies/GlobalApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import for navigation
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyCYF5GqbHJYzlYhzRkgwKbbok0PDWJBu6o'; // Replace with your actual API key

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const photos = resp?.data?.places[0]?.photos;
      if (photos && photos.length > 3) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photos[3].name);
        setPhotoUrl(photoUrl);
      } else {
        console.warn("Photo not found for the given index.");
      }
    });
  };

  const handleImageClick = () => {
    // Navigate to the map page with the location data
    navigate('/MapPage', { state: { location: trip?.userSelection?.location?.label } });
  };

  return (
    <div>
      <a onClick={handleImageClick}>
        <img src={photoUrl} className="h-[340px] w-full object-cover rounded-xl cursor-pointer" alt="Trip Location" />
      </a>
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md">
              💰{trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md">
              🥂 No. of Traveler: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
