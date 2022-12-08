import FavoriteRestoDB from '../../data/favorite-resto-idb';
import { createRestaurantsItemCard } from '../templates/template-creator';

const FavoriteRestaurants = {
  async render() {
    return `
      <article id="restaurant">
        <h2>Favorite Restaurants</h2>
        <div id="restaurant_data" class="list-item"></div>
      </article>
    `;
  },

  async afterRender() {
    const restaurant = await FavoriteRestoDB.getAllRestaurants();
    const restaurantFavoriteContainer = document.querySelector('#restaurant_data');

    restaurant.forEach((restaurants) => {
      restaurantFavoriteContainer.innerHTML += createRestaurantsItemCard(restaurants);
    });
  },
};

export default FavoriteRestaurants;
