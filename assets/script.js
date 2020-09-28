// declare global variables
let city = '';



// Date Picker event listener

// $(document).ready(function() {
//     $('.datepicker').datepicker({ defaultDate: new Date(), setDefaultDate: true, minDate: new Date() });
// });

//trying to make a checked box conditional


// event listener for the Make my date button calls weather, zomato, and ticketmaster API's

document.getElementById("dateBtn").addEventListener("click", function (event) {
    event.preventDefault();

    city = $(".citySearch").val();
    var zomatoKey = "93c8753e5621d75fe88dade8f7ea42d4"
    var queryCity = `https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${zomatoKey}`;

    //Retrieve Lat and Lon
    $.ajax({

        url: queryCity,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // check for valid user entry
        if (response.location_suggestions.length === 0) {

            $(".citySearch").val("");

            let invEntry = $(`<div id="warningBox">`);
            let invEntryP = $("<p>");
            invEntryP.text(`Please choose a valid city!`);
            // build and display error Message
            invEntry.append(invEntryP)
            $("#selections").prepend(invEntry);
            $("#selections").attr("style", "color: #a43131; font-size: 1.5rem; font-weight: bold;")


            // return
        } else {
            // remove copy text
            $('.copyText').css('display', 'none')
            // remove hero image
            $('#heroImg').css('display', 'none');
            // remove error div if exists
            $("#warningBox").css("display", "none")
            //local variables for Lat and Lon
            var lat = response.location_suggestions[0].latitude
            var lon = response.location_suggestions[0].longitude


            //call restaurant information
            var queryRest = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&sort=rating&order=dec&apikey=${zomatoKey}`;

            $.ajax({
                url: queryRest,
                method: "GET"
            }).then(function (restaurant) {
                console.log(restaurant)
                //Pull random restaurant
                var i = Math.floor(Math.random() * 21);
                console.log(i)

                $('#foodChoice').empty()

                var image = $("<img>");
                image.attr("src", restaurant.restaurants[i].restaurant.featured_image)
                image.attr("id", "restImage")
                image.attr("alt", "Image of restaurant food.")
                image.attr("class", "responsive-img")
                // console.log(image)
                $("#foodChoice").append(image)

                var selectRest = $("<h2>");
                selectRest.text(restaurant.restaurants[i].restaurant.name)
                // console.log(selectRest)
                $("#foodChoice").append(selectRest)

                var type = $("<h4>");
                type.text(restaurant.restaurants[i].restaurant.cuisines)
                // console.log(type)
                $("#foodChoice").append(type)

                var phone = $("<h4>");
                phone.text(restaurant.restaurants[i].restaurant.phone_numbers)
                // console.log(phone)
                $("#foodChoice").append(phone)

                var address = $(`<a  href="https://www.google.com/maps?q=${selectRest} ${restaurant.restaurants[i].restaurant.location.address}" target="blank">`)
                address.text(restaurant.restaurants[i].restaurant.location.address)
                // console.log(address);
                $("#foodChoice").append(address);

                //    Pulling zipcode from restaurant for nearby event
                var zipCode = (restaurant.restaurants[i].restaurant.location.zipcode);

                eventGenerator(zipCode)

                function eventGenerator(zipCode) {

                    console.log(zipCode);
                    // AJAX call to ticketmaster to pull any events 
                    $.ajax({
                        type: "GET",
                        url: `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zipCode}&apikey=TOztRrlp64HE0PRwLSbTGi4Oovx6sfg8`,
                        async: true,
                        dataType: "json",

                        success: function (json) {
                            $('#eventChoice').empty()
                            if ($("#event").is(":checked")) {
                                console.log("hello there");



                                // Adding Name and ticket URL to Page 

                                var eventName = $("<h2>");
                                // console.log(json._embedded.events[i].name)
                                eventName.text(json._embedded.events[i].name)
                                $("#eventChoice").append(eventName)

                                var eventUrl = $("<a>");
                                eventUrl.attr('href', json._embedded.events[i].url)
                                eventUrl.text("Tickets")
                                $("#eventChoice").append(eventUrl)

                                // console.log(json._embedded.events[i].url)
                            } else {
                                console.log("Not Checked");
                            }
                                if (response.eventName_suggestions.length === 0) {

                                    $(".eventName").val("");

                                    let invEntry = $(`<div id="warningBox">`);
                                    let invEntryP = $("<p>");
                                    invEntryP.text(`There are no current events in your area!`);
                                    // build and display error Message
                                    invEntry.append(invEntryP)
                                    $("#selections").prepend(invEntry);
                                    $("#selections").attr("style", "color: #a43131; font-size: 1.5rem; font-weight: bold;")


                                    // return
                                } else {
                                    // remove hero image
                                    $('#heroImg').css('display', 'none');
                                    // remove error div if exists
                                    $("#warningBox").css("display", "none")
                                    //local variables for Lat and Lon
                                    var lat = response.location_suggestions[0].latitude
                                    var lon = response.location_suggestions[0].longitude

                                    }

                        },
                        error: function (xhr, status, err) { }
                    });
                };
            });

            // Weather
            function loadWeatherData(cityName) {
                var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=abea8c198be08a98a25f51dd94240c1c&units=imperial`;
                $.ajax({
                    type: "GET",
                    url: queryURL,
                    dataType: "json",
                    success: function (data) {

                        // empty previous weather info if any
                        $("#weatherEl").empty();
                        // build new weather element on screen
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
                        // add those weather elements to screen
                        $("#weatherEl").html(weatherElements);
                    },
                });
            }
            // Call Weather Function
            loadWeatherData(city);


        }
    });

})