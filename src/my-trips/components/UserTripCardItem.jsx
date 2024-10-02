import React, {useEffect,useState} from 'react'
import { GetPlaceDetails } from '@/servies/GlobalApi';

function UserTripCardItem({trip}) {
    const [PhotoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();    
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label,
    };
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div>
        <img src={PhotoUrl} className="object-cover rounded-xl"/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.lable}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
  )
}

export default UserTripCardItem