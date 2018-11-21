// Create app namespace to hold all methods
const zomatoUrl = 'https://developers.zomato.com/api/v2.1';
const app = {
    baseUrl: zomatoUrl,
    locationsUrl: zomatoUrl + '/locations',
    cuisineUrl : zomatoUrl + '/cuisines',
    categories: zomatoUrl + '/categories',
    key: '96da6937114a6901ec154be1338c5427',
};

app.url = 'https://developers.zomato.com/api/v2.1/location_details?entity_id=89&entity_type=city';


// Collect user input
// app.collectInfo = function () {

// }

/**
 * Make AJAX request with user inputted data
 * @param query User input for location
 */
app.getLocation = function getLocation(query) {
    return $.ajax({
        method: 'GET',
        crossDomain: true,
        url: app.locationsUrl,
        dataType: 'json',
        async: true,
        headers: {
            'user-key': app.key
        },
        data: {
            query: query
        },
    }).then((res) => {
        // app.displayInfo();
        console.log(res);

        app.entityId = res.location_suggestions[0].entity_id;;
        
        // change to next page div
        // call next page function

        return app.entityId;
    });
};

app.getCuisine = function getCuisine(city_id) {
    $.ajax({
        method: 'GET',
        crossDomain: true,
        url: app.cuisinesUrl,
        dataType: 'json',
        async: true,
        headers: {
            'user-key': app.key
        },
        data: {
            city_id: city_id
        },
    }).then((res) => {
        // app.displayInfo();
        console.log(res);

        // save cusiine

        // jquery navigate fn
    });
};



// Display data on the page
app.displayInfo = function (res) {
    res.forEach()

};

// Start app
app.init = function () {

    app.getLocation()
        
    //pass in the user input 
    app.getCuisine(app.getLocation)
};

app.geolocateUser = function() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}


//document ready 
$(function(){
    app.init();

}) //document  ready ends 
