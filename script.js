const search = document.querySelector('.inputSearch')
submitSearch = document.querySelector('#submitSearch'),
  resultHeader = document.querySelector('.resultHeader'),
  resultName = document.querySelector('.result-name'),
  resultAddress = document.querySelector('.result-address'),
  resultRating = document.querySelector('.result-rating'),
  resultPhoto = document.querySelector('.photo')
getCuisines = document.querySelector('.cuisine'),
  african = document.querySelector('.african'),
  chinese = document.querySelector('.chinese'),
  indian = document.querySelector('.indian'),
  thai = document.querySelector('.thai'),
  turkish = document.querySelector('.turkish'),
  mainForm = document.querySelector('.example')

singleResultInfo = document.querySelector('.singleResultInfo')



// see if geolocation is there. If so give us the information of location.//

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {

 

    // search restaurants and fetch API 
    async function searchRestaurant(e) {
      console.log(position.coords)
      
      e.preventDefault();
      //clear singleResultInfo once clicked search again. it 
      singleResultInfo.innerHTML = "";
      // get search term:
      const searchInput = search.value;

      // get location 
      const getResponseLocation = await fetch(`https://developers.zomato.com/api/v2.1/locations?query&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
        {
          headers: { "user-key": "bdbbe0bee9e2ad2915f9649a7e23071d" }
        })
      const getResponseLocationJSON = await getResponseLocation.json();
      console.log(getResponseLocationJSON)

    
  
      // search cuisine.

      const getResponseCuisine = await fetch(`https://developers.zomato.com/api/v2.1/cuisines?query=${searchInput}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
        {
          headers: { "user-key": "bdbbe0bee9e2ad2915f9649a7e23071d" }
        });
      const getResponseCuisineJSON = await getResponseCuisine.json();
      console.log(getResponseCuisineJSON)
    

  for (let i = 0; i < getResponseCuisineJSON.cuisines.length; i++) {
    let restaurantSingle = document.createElement('li')
    restaurantSingle.textContent = getResponseCuisineJSON.cuisines[i].cuisine.cuisine_name;

    restaurantSingle.addEventListener('click', getCuisineRestaurants)
    getCuisines.appendChild(restaurantSingle)
  }

 async function getCuisineRestaurants(e){
    
    console.log(`${e.target.textContent}`)
    let cuisineId = "";
    //get the cuisine id - if the element selected matches the cuisine name, give me the id
    for(let i = 0; i < getResponseCuisineJSON.cuisines.length; i++){
        if(e.target.textContent === getResponseCuisineJSON.cuisines[i].cuisine.cuisine_name){
            cuisineId = getResponseCuisineJSON.cuisines[i].cuisine.cuisine_id
        }
    }
    
console.log(`${cuisineId}`)

const cuisineApi = await fetch(`https://developers.zomato.com/api/v2.1/search?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cuisines=${cuisineId}`, {
  headers: { "user-key": "b4548824a9d395ebd8be92a554c928cc" }
})
const cuisineApiJson = await cuisineApi.json()
console.log(cuisineApiJson);


for (let i = 0; i < cuisineApiJson.restaurants.length; i++) {
  nameId[i].textContent = `${cuisineApiJson.restaurants[i].restaurant.name}`
  addressId[i].textContent = `${cuisineApiJson.restaurants[i].restaurant.location.address}`
  ratingId[i].textContent = `${cuisineApiJson.restaurants[i].restaurant.user_rating.aggregate_rating}`
  timingId[i].textContent = `${cuisineApiJson.restaurants[i].restaurant.timings}`
  urlId[i].href = `${cuisineApiJson.restaurants[i].restaurant.url}`
}
  }

  // search restaurant
  const getResponseRestaurant = await fetch(`https://developers.zomato.com/api/v2.1/search?query=${searchInput}&count=20&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=10000&order=asc

      `, {
    headers: { "user-key": "bdbbe0bee9e2ad2915f9649a7e23071d" }
  })
  const getResponseRestaurantJSON = await getResponseRestaurant.json();
  console.log(getResponseRestaurantJSON)

  resultHeader.innerHTML = `<h2>Search result for nearby restaurants:</h2>`
  const resultHeaderChildren = Array.from(resultHeader.children);
  resultHeaderChildren.forEach(element => {

    for (let i = 0; i < getResponseRestaurantJSON.restaurants.length; i++) {

      const restaurantResults = `<li class="results"> <b>Name</b>: <div id="nameId">${getResponseRestaurantJSON.restaurants[i].restaurant.name}</div>
          <br> <b>Address</b>: <div id="addressId">${getResponseRestaurantJSON.restaurants[i].restaurant.location.address}</div>
          <br> <b>Rating</b>: <div id="ratingId">${getResponseRestaurantJSON.restaurants[i].restaurant.user_rating.aggregate_rating}</div>
          <br> <b> Timings</b>: <div id="timingId">${getResponseRestaurantJSON.restaurants[i].restaurant.timings}</div>
          <br> <button class="result-footer-button">Call</button>
          <button class="result-footer-button"><a href="${getResponseRestaurantJSON.restaurants[i].restaurant.url}" id="urlId" target="_blank" class="result-website">Visit Website</a></button>
          </li>`

      resultHeader.insertAdjacentHTML("beforeend", restaurantResults)

    }


  });

};

submitSearch.addEventListener('click', searchRestaurant)



 })
console.log('geolocation available');
} else {
  console.log('geolocation not available');
 }

