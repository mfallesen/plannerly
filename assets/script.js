// declare global variables
let city = '';



// Date Picker event listener

$(document).ready(function () {
    $('.datepicker').datepicker({ defaultDate: new Date(), setDefaultDate: true, minDate: new Date() });
});



// event listener for the Make my date button event on #citySearch

document.getElementById("dateBtn").addEventListener("click", function(event) {
    event.preventDefault();
    $('#heroImg').css('display', 'none');
    city = $(".citySearch").val();
    console.log(city);


    var zomatoKey = "93c8753e5621d75fe88dade8f7ea42d4"

    var queryCity = `https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${zomatoKey}`;

    //Retrieve Lat and Lon
    $.ajax({

        url: queryCity,
        method: "GET"
    }).then(function (response) {
         console.log(response)
         if (response.location_suggestions.length === 0) {
            console.log("invalid Input")
            return
        } 

            //local variables for Lat and Lon
            var lat = response.location_suggestions[0].latitude
            var lon = response.location_suggestions[0].longitude
         

        //call restaurant information
        var queryRest = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&sort=rating&order=dec&apikey=${zomatoKey}`;

        $.ajax({
            url: queryRest,
            method: "GET"
        }).then(function(restaurant) {
            console.log(restaurant)
                //Pull random restaurant
            var i = Math.floor(Math.random() * 21);
            console.log(i)

            $('#foodChoice').empty()

            var image = $("<img>");
            image.attr("src", restaurant.restaurants[i].restaurant.featured_image)
            image.attr("id", "restImage")
            image.attr("alt", "Image of restaraunt food.")
            image.attr("class", "responsive-img")
            console.log(image)
            $("#foodChoice").append(image)

            var selectRest = $("<h2>");
            selectRest.text(restaurant.restaurants[i].restaurant.name)
            console.log(selectRest)
            $("#foodChoice").append(selectRest)

            var phone = $("<h4>");
            phone.text(restaurant.restaurants[i].restaurant.phone_numbers)
            console.log(phone)
            $("#foodChoice").append(phone)

            var address = $("<h4>");
            address.text(restaurant.restaurants[i].restaurant.location.address)
            console.log(address);
            $("#foodChoice").append(address);

        //    Pulling zipcode from restaurant for nearby event
            var zipCode= (restaurant.restaurants[i].restaurant.location.zipcode);

            eventGenerator(zipCode)
            function eventGenerator(zipCode){
               
                console.log(zipCode);
        // AJAX call to ticketmaster to pull any events 
                $.ajax({
                    type:"GET",
                    url:`https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zipCode}&apikey=TOztRrlp64HE0PRwLSbTGi4Oovx6sfg8`, 
                    async:true,
                    dataType: "json",
                    success: function(json) {
                                console.log(json);
        // Adding Name and ticket URL to Page 
                                var eventName= $("<h2>");
                                console.log(json._embedded.events[i].name)
                                eventName.text(json._embedded.events[i].name)
                                $("#eventChoice").append(eventName)
                               
                                var eventUrl=$("<a>");
                                eventUrl.attr('href', json._embedded.events[i].url)
                                eventUrl.text("Tickets")
                                $("#eventChoice").append(eventUrl)
                                console.log(json._embedded.events[i].url)
                                
                             },
                    error: function(xhr, status, err) {
                               
                             }
                  });
                

                
            };
            //     url: queryRest,
            //     method: "GET"
            // }).then(function(restaurant) {
            //     console.log(restaurant)
        });
    

    //     url: queryRest,
    //     method: "GET"
    //   }).then(function (restaurant) {
    //     console.log(restaurant)
    // //Pull random restaurant
    //     var i = Math.floor(Math.random()*21);
    //     console.log(i)

    //     var image = $("<img>");
    //     image.attr("src", restaurant.restaurants[i].restaurant.featured_image)
    //     console.log(image)

    //     var selectRest = $("<h4>");
    //     selectRest = restaurant.restaurants[i].restaurant.name;
    //     console.log(selectRest)

    //     var phone = $("<p>");
    //     phone = restaurant.restaurants[i].restaurant.phone_numbers;
    //     console.log(phone)

    //     var address = $("<p>");
    //     address = restaurant.restaurants[i].restaurant.location.address;
    //     console.log(address);  


    // Weather
    function loadWeatherData(cityName) {
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=abea8c198be08a98a25f51dd94240c1c&units=imperial`;
        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function(data) {
                console.log("data:", data);

                $("#weatherEl").empty();
                var weatherElements = `
      <div class="col s12">
          <div class="row">

              <h3 class="card-title">
                  ${data.name} (${new Date().toLocaleDateString()})
                  <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
              </h3>
              <p class="card-text">Temperature: ${data.main.temp}  °F</p>
          </div>
      </div>
      `;
                $("#weatherEl").html(weatherElements);
            },
        });
    }
    // Call Weather Function
    loadWeatherData(city);


});



// search parameters should be city or zip?
// event Listener makes call to Zomato (with restrictions in both ratings and mileage if possible) when clicked (and/or enter is hit?)

// maybe remove date picker initially?

// Call should return restaurants within the given parameters an be open on the date selected by the user. 
// build object with restaurants that meet description. 
// run a object through randomizer function (Fancy for loop with MATH.random) to select a restaurant.





// Make My Date button also makes ajax call to openweather API and retrieves weather for date selected. (if not available then tell user "Sorry No weather data is available that far ahead")
// This call should be made using the same search parameter as the restaurants since it works on the same function

// build the weather object and append to the page
// Needed info: City name Temperature, wind, and conditions (icon should be fine but we can also add text saying "bring an umbrella!" or similar)


// take randomized dinner choice and build the page elements to contain it

// image of restaurant first. Header with restaurant name and small blurb describing food underneath


//Seans restauraunt ajax call
// var zomatoKey = "93c8753e5621d75fe88dade8f7ea42d4"
// var city = "seattle"
// var queryCity = "https://developers.zomato.com/api/v2.1/locations?query=" +city+ "&apikey=" + zomatoKey;


// //Retrieve Lat and Lon
// $.ajax({
//     url: queryCity,
//     method: "GET"
// }).then(function(response){
//     console.log(response)
//     //local variables for Lat and Lon
//     var lat = response.location_suggestions[0].latitude
//     var lon = response.location_suggestions[0].longitude

//     //call restaurant information
//     var queryRest = "https://developers.zomato.com/api/v2.1/search?lat=" +lat+ "&lon=" +lon+ "&sort=rating&order=dec&apikey=" + zomatoKey;

//     $.ajax({
//         url: queryRest,
//         method: "GET"
//     }).then(function(restaurant){
//         console.log(restaurant)
//     })
 })