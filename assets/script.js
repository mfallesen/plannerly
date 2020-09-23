
// declare global variables



// event listener for the Make my date button event on #citySearch
// search parameters should be city or zip?
// event Listener makes call to Zomato (with restrictions in both ratings and mileage if possible) when clicked (and/or enter is hit?)

// maybe remove date picker initially?

// Call should return restaurants within the given parameters an be open on the date selected by the user. 
// build object with restaurants that meet description. 
// run a object through randomizer function (Fancy for loop with MATH.random) to select a restaurant.


// Date Picker event listener
  $(document).ready(function(){
    $('.datepicker').datepicker({defaultDate: new Date(), setDefaultDate: true, minDate: new Date()});
  });


// Make My Date button also makes ajax call to openweather API and retrieves weather for date selected. (if not available then tell user "Sorry No weather data is available that far ahead")
// This call should be made using the same search parameter as the restaurants since it works on the same function

// build the weather object and append to the page
// Needed info: City name Temperature, wind, and conditions (icon should be fine but we can also add text saying "bring an umbrella!" or similar)

// take randomized dinner choice and build the page elements to contain it
// image of restaurant first. Header with restaurant name and small blurb describing food underneath


//Seans restauraunt ajax call
var zomatoKey = "93c8753e5621d75fe88dade8f7ea42d4"
var city = "seattle"
var queryCity = "https://developers.zomato.com/api/v2.1/locations?query=" +city+ "&apikey=" + zomatoKey;


//Retrieve Lat and Lon
$.ajax({
    url: queryCity,
    method: "GET"
}).then(function(response){
    console.log(response)
    //local variables for Lat and Lon
    var lat = response.location_suggestions[0].latitude
    var lon = response.location_suggestions[0].longitude

    //call restaurant information
    var queryRest = "https://developers.zomato.com/api/v2.1/search?lat=" +lat+ "&lon=" +lon+ "&sort=rating&order=asc&apikey=" + zomatoKey;

    $.ajax({
        url: queryRest,
        method: "GET"
    }).then(function(restaurant){
        console.log(restaurant)
    })
})