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


app.startApp = function () {
    $('.searchBar').on('submit', function (e) {
        e.preventDefault();
        app.userInput = $('#userInput').val();
        app.getLocation(app.userInput)
        console.log(app.userInput)
    });
}

// for every item in the array make a call to get the restaurant


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
        // console.log(res);

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
        console.log(res)
        app.getCuisineArray(res);
        // jquery navigate fn
    });
};

app.submitCuisine = function () {
    $('.cuisinesForm').on('submit', function (e) {
        e.preventDefault();
        app.userCuisine = $('#selectCuisines option:selected').val();
        console.log($('#selectCuisines option:selected').val());
        // app.getRestaurant(app.userCuisine);
        // returns the cuisineID
    });
}



/**
 * cuisineArray is an array of objects that has two properties : cuisine_id and cuisine_name
 * cuisineEntry is the indiviudal objects we are looking at in each 'cuisines array' returned by API call
 */
 app.getCuisineArray = function (res){
    //  console.log('in cuisine array',res)
   app.cuisineArray = res.cuisines.map(function(cuisineEntry){
        return cuisineEntry.cuisine
    });
    console.log('this is the cuisineArray', app.cuisineArray);
    // create UI  (dropbox)
    // selecting cuisines, pass in the array of objects cuisine, extract the name to display , but id is 
    
    app.cuisineArray.forEach(cuisine => {
        $('#selectCuisines').append(`<option value="${cuisine.cuisine_id}">${cuisine.cuisine_name}</option>`)
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

//questions : only shows 20 restaurant/ array , how do we chain it to make more calls?
//get cuisine returns an array of objects that returns 2 propertys : cuisine_name and cuisine_id , we only want certain names, 
    //come up with a list of cuisine names that WE WANT --> extract that cuisine object from the cuisineArray (that way the associated ID can be used to passed into get restaurant)

   

// Start app
app.init = function () {
    app.startApp();
   
    //on submit of form, store the input value in variable, and pass the variable in as an arguement to app.getLocation();
    // app.getLocation('toronto')
    // app.getRestaurant(6);
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
