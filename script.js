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


// app.userInput = input[type="text"].val()
// console.log(userInput)

/**
 * Make AJAX request with user inputted data
 * @param query User input for location
 */
app.getLocation = function(query) {
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
        console.log(res);

        app.locationId = res.location_suggestions[0].city_id;
        // change to next page div
        // call next page function
        // console.log(app.locationId);

        // return app.locationId;
        app.getCuisine(app.locationId);
    });
};

app.getCuisine = function(city_id) {
    console.log('getCuisine', city_id)
    $.ajax({
        method: 'GET',
        crossDomain: true,
        url: app.cuisineUrl,
        dataType: 'json',
        async: true,
        headers: {
            'user-key': app.key
        },
        data: {
            city_id: city_id
        },
    }).then((res) => {
        console.log('hello');
        console.log('CUISINE', res);
        
        // save cusiine

        // jquery navigate fn
    });
};

// check to see how to get a restaurant from a cuisine
//create another function that will grab the names of all of the cuisines returned
// return those names in an array 
// something in between
// for every item in the array make a call to get the restaurant

 app.getCuisineArray = function (locationId){
    app.cuisinesArray = []
    app.cuisine = res.cuisines.cuisine.cuisine_name
    for (let cuisine in cuisines) {
        if(indexOf(app.cuisine == -1)) {
            app.cuisinesArray.push(app.cuisine) 
        }
    }
    return cuisinesArray 
}





// Start app
app.init = function () {
    app.getLocation('new york')
    //pass in the user input 
    // app.getCuisine();
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
