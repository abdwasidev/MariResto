// import data from '../../../DATA.json';
// import CONFIG from '../../global/config';
// // import GetRestaurantSource from '../../data/get-restaurant-source';

// // const data = GetRestaurantSource.restaurantsList();

// function restaurantsList() {
//     let restaurantListHTML = '';

//     data.restaurants.map((getRestoData) => {
//         restaurantListHTML += `
//                 <div class="resto-card">
//                     <img src="${getRestoData.pictureId}" alt="${getRestoData.name}">
//     <a href="${CONFIG.BASE_URL + getRestoData.backdrop_path}"><h3>${getRestoData.name}</h3></a>
//                     <article class="detail">
//                         <i class="fa fa-star rating"> ${getRestoData.rating}</i>
//                         <i class="fa fa-location-dot city"> ${getRestoData.city}</i>
//                     </article>
//                     <p>${getRestoData.description}</p>
//                 </div>
//             `;
//     });
//     document.getElementById('restaurant-data').innerHTML = restaurantListHTML;
// }

// const RestaurantsData = restaurantsList(data);

// const Restaurants = {
//     async render() {
//       return RestaurantsData;
//     },

//     async afterRender() {
//       // Fungsi ini akan dipanggil setelah render()
//     },
// };

// export default Restaurants;
