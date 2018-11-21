// Create app namespace to hold all methods
const zomatoUrl = 'https://developers.zomato.com/api/v2.1';
const app = {
    baseUrl: zomatoUrl,
    locationsUrl: zomatoUrl + '/locations',
    cuisineUrl : zomatoUrl + '/cuisines',
    restaurantUrl: zomatoUrl + '/search',
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

        app.locationId = res.location_suggestions[0].city_id; //returns a number 
        // change to next page div
        // call next page function
        // console.log(app.locationId);

        // return app.locationId;
        app.getCuisine(app.locationId); //calling the getCusine , passing in the number that was returned from getLocation
    });
};

app.getCuisine = function(city_id) {
    console.log('getCuisine', city_id)
    $.ajax({
        method: 'GET',
        crossDomain: true,
        url: app.restaurantUrl,
        dataType: 'json',
        async: true,
        headers: {
            'user-key': app.key
        },
        data: {
            city_id: city_id
        },
    }).then((res) => {
        console.log(res)
        app.getCuisineArray(res);
        

        // jquery navigate fn
    });
};

// check to see how to get a restaurant from a cuisine
    //from the info we get from getCusine ; we need cusine_name array for user selection purposes, cusine_id array will be saved and passed into the 'search' API to populate restaurant list
//create another function that will grab the names of all of the cuisines returned
// return those names in an array 
// something in between
// for every item in the array make a call to get the restaurant

/**
 * cuisineArray is an array of objects that has two properties : cuisine_id and cuisine_name
 * cuisineEntry is the indiviudal objects we are looking at in each 'cuisines array' returned by API call
 */
 app.getCuisineArray = function (res){
   app.cuisineArray = res.cuisines.map(function(cuisineEntry){
        return cuisineEntry.cuisine
    });
    return app.cuisineArray;
    } 


//access the cuisineArray to get the cuisineName and pass into the serach call 
app.getRestaurant = function (cuisine_id) {
        $.ajax({
            method: 'GET',
            crossDomain: true,
            url: app.restaurantUrl,
            dataType: 'json',
            async: true,
            headers: {
                'user-key': app.key
            },
            data: {
                cuisines: cuisine_id
            },
        }).then((res) => {
            console.log(res)
        });
    };





// Start app
app.init = function () {
    app.getLocation('boston')
    app.getRestaurant(6);
    //pass in the user input 
};

// app.geolocateUser = function() {
//     var options = {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//     };

//     function success(pos) {
//         var crd = pos.coords;

//         console.log('Your current position is:');
//         console.log(`Latitude : ${crd.latitude}`);
//         console.log(`Longitude: ${crd.longitude}`);
//         console.log(`More or less ${crd.accuracy} meters.`);
//     }

//     function error(err) {
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     }

//     navigator.geolocation.getCurrentPosition(success, error, options);
// }


//document ready 
$(function(){
    app.init();

}) //document  ready ends 
