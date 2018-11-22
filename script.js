const zomatoUrl = 'https://developers.zomato.com/api/v2.1';
const app = {
    baseUrl: zomatoUrl,
    locationsUrl: zomatoUrl + '/locations',
    cuisineUrl: zomatoUrl + '/cuisines',
    categories: zomatoUrl + '/categories',
    key: '96da6937114a6901ec154be1338c5427',
};

// app.url = 'https://developers.zomato.com/api/v2.1/location_details?entity_id=89&entity_type=city';

// CREATE FUNCTION THAT WILL GET LOCATION APIS
// app.getLocation = function(query) {
//     return $.ajax({
//         method: 'GET',
//         crossDomain: true,
//         url: app.locationsUrl,
//         dataType: 'json',
//         async: true,
//         headers: {
//             'user-key': app.key
//         },
//         data: {
//             query: query
//         },
//     }).then((res) => {
//         // console.log(res);
//         app.locationId = res.location_suggestions[0].city_id; // TAKE THE RESULT OF THIS FUNCTION AND STORE IN VARIABLE
//         // app.getCuisine(app.locationId); // once we have the location ID it will pass into this function
//     });
// };

// // app.getCuisine = function(city_id) {
// //     // console.log('getCuisine', city_id);
// //     $.ajax({
// //         method: 'GET',
// //         crossDomain: true,
// //         url: app.cuisineUrl,
// //         dataType: 'json',
// //         async: true,
// //         headers: {
// //             'user-key': app.key
// //         },
// //         data: {
// //             city_id: city_id
// //         },
// //     }).then((res) => {
// //         console.log('CUISINE', res);
// //     });
// // };

// app.getRestaurants = function(id) {
//     $.ajax({
//         method: 'GET',
//         crossDomain: true,
//         url: app.cuisineUrl,
//         dataType: 'json',
//         async: true,
//         headers: {
//             'user-key': app.key
//         },
//         data: {
//             city_id: city_id
//         },
//     }).then((res) => {
//         console.log('CUISINE', res);
//     });
// };


// // app.getCuisineArray = function (locationId) {
// //     app.cuisinesArray = []
// //     app.cuisine = res.cuisines.cuisine.cuisine_name
// //     for (let cuisine in cuisines) {
// //         if (indexOf(app.cuisine == -1)) {
// //             app.cuisinesArray.push(app.cuisine)
// //         }
// //     }
// //     return cuisinesArray
// // };

// app.init = function () {
//     app.getLocation('markham');
//     //pass in the user input 
//     // app.getCuisineArray();
// };

// //document ready 
// $(function () {
//     app.init();

// }) //document ready ends 