// declare global variables



// event listener for the Make my date button event on #citySearch

document.getElementById("dateBtn").addEventListener("click", function(event) {
 event.preventDefault();
});


// search parameters should be city or zip?
// event Listener makes call to Zomato (with restrictions in both ratings and mileage if possible) when clicked (and/or enter is hit?)

// maybe remove date picker initially?

// Call should return restaurants within the given parameters an be open on the date selected by the user. 
// build object with restaurants that meet description. 
// run a object through randomizer function (Fancy for loop with MATH.random) to select a restaurant.


// Date Picker event listener
  $(document).ready(function(){
    $('.datepicker').datepicker();
  });

// Make My Date button also makes ajax call to openweather API and retrieves weather for date selected. (if not available then tell user "Sorry No weather data is available that far ahead")
// This call should be made using the same search parameter as the restaurants since it works on the same function

// build the weather object and append to the page
// Needed info: City name Temperature, wind, and conditions (icon should be fine but we can also add text saying "bring an umbrella!" or similar)

// take randomized dinner choice and build the page elements to contain it
// image of restaurant first. Header with restaurant name and small blurb describing food underneath
