export const SelectTravelList = [
    {
        id : 1,
        title:'Just me',
        desc:'A sole traveler in exploration',
        icon:'✈️',
        people:'1 people'
    },
    {
        id : 2,
        title:'A Couple',
        desc:'Two travelers in tandem',
        icon:'🥂',
        people:'2 people'
    },
    {
        id : 3,
        title:'Family',
        desc:'A group of fun-loving adventurers',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id : 4,
        title:'Friends',
        desc:'A bunches of thrill-seekes',
        icon:'🏡',
        people:'2 to 5 people'
    }
]

export const SelectBudgteOptions = [
    {
        id : 1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id : 2,
        title:'Moderate',
        desc:'Keep costs on the average side',
        icon:'💰'
    },
    {
        id : 3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💸'
    }
]


export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {noOfDays} Days for {traveler} with a {budget} budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing,rating, Time to travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format.'