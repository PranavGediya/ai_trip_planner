import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AI_PROMPT, SelectBudgteOptions, SelectTravelList } from '@/components/constants/optinos';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/servies/Aimodel';
import { auth, provider, signInWithPopup,db } from "../firebase/firebse"; // Ensure correct path
import { useNavigate } from "react-router-dom";
import { setDoc,doc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getAuth } from 'firebase/auth';


function CreateTrip() {
  const [place,setPlace] = useState();
  const [formdata, setFormdata] = useState([]);
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();


  let handleInputChange = (name,value)=>{

    setFormdata({
      ...formdata, 
      [name] : value
    });
  } 

  const SaveAiTrip = async(Tripdata)=>{
    setLoading(true);
    const docID = Date.now().toString();
    const email = auth.currentUser.email;
    await setDoc(doc(db, "AITrips", docID), {
      userSelection:formdata,
      tripdata:JSON.parse(Tripdata),
      email:email,
      id:docID
    });
    setLoading(false);
    navigate(`/view-trip/${docID}`);
  }
  const onCreateTrip = async ()=>{
    if (!auth.currentUser) {
      // If the user is not logged in, prompt them to sign in
      try {
        const result = await signInWithPopup(auth, provider);
        const loggedInUser = result.user;

        console.log("User signed in: ", loggedInUser);

        // Now, the user is signed in, you can navigate to the trip creation page
        navigate("/create-trip");
      } catch (error) {
        setError(error.message);
        loading(false);
        console.error("Error during Google Sign-In: ", error);
      }
    } else {
      // If the user is already logged in, proceed to trip creation
      navigate("/create-trip");
    }



    if(formdata?.noOfDays>5 || !formdata?.budget || !formdata?.noOfDays || !formdata?.location || !formdata?.traveler){
      toast("Fill all the valid details !!!")
      return;
    }
    setLoading(true);
    //.replace('{location}', formdata?.location?.lable)     for when add google auto place api integrate
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formdata?.location?.label)
    .replace('{noOfDays}', formdata?.noOfDays)
    .replace('{traveler}', formdata?.traveler)
    .replace('{budget}', formdata?.budget)
    .replace('{noOfDays}', formdata?.noOfDays)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }
  useEffect(()=>{
    console.log(formdata);
  },[formdata])




  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h1 className="text-3xl font-oswald">Tell us your travel preferences <span role="img" aria-label="tent">⛺</span> <span role="img" aria-label="palm tree">🌴</span></h1>
      <p className="text-gray-600 mt-4">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-lg mb-3'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey='AIzaSyCYF5GqbHJYzlYhzRkgwKbbok0PDWJBu6o'
            selectProps={{
              place,
              onChange : (v)=>{setPlace(v);console.log(v); handleInputChange('location',v)} 
            }}
          />
          {/* <Input placeholder={'Location'} type = "string"
          onBlur={(e) => handleInputChange('location', e.target.value)}/> */}

        </div>

        <div>
          <h2 className='text-lg mb-3'>How many days are you planning your trip?</h2>
          <Input placeholder={'ex-3'} type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}/>
        </div>


        <div>
          <h2 className='text-lg mb-3'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-3' >
            {SelectBudgteOptions.map((item,index) =>(
              <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formdata?.budget==item.title&&'border-black shadow-lg'}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-lg mb-3'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-3'>
            {SelectTravelList.map((item,index)=>(
              <div key={index}
              onClick={() => handleInputChange('traveler',item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-md
              ${formdata?.traveler==item.people&&'border-black shadow-lg'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-gray-500'>{item.desc}</h2> 
                
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='my-8 flex justify-end' >
        <Button onClick={()=>onCreateTrip()}
         disabled = {loading}>
          {loading?<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> :'Create Trip'}</Button>
      </div>
    </div>

  )
}

export default CreateTrip
