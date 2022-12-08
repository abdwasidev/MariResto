import UrlParser from '../../routes/url-parser';
import GetRestaurantSource from '../../data/get-restaurant-source';
import { createLikeRestoButtonTemplate, createRestaurantsDetail } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import CONFIG from '../../global/config';
import FavoriteRestoDB from '../../data/favorite-resto-idb';

const DetailRestaurants = {
    async render() {
      return `
        <article id="detail"></article>
        <div id="likeButtonContainer"></div>
      `;
    },

    async afterRender() {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await GetRestaurantSource.detailRestaurants(url.id);
      const restaurantContainer = document.getElementById('detail');
      restaurantContainer.innerHTML += createRestaurantsDetail(restaurant);

      const likeButtonContainer = document.querySelector('#likeButtonContainer');
      likeButtonContainer.innerHTML = createLikeRestoButtonTemplate();

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteResto: FavoriteRestoDB,
        restaurants: {
          id: restaurant.id,
          name: restaurant.name,
          image: `${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}`,
          rating: restaurant.rating,
          city: restaurant.city,
          description: restaurant.description,
        },
      });
    },
};

export default DetailRestaurants;
