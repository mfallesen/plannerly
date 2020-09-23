
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