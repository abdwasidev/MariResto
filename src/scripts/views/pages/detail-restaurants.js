import UrlParser from '../../routes/url-parser';
import GetRestaurantSource from '../../data/get-restaurant-source';
import { createLikeButtonTemplate, createRestaurantsDetail } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import CONFIG from '../../global/config';

const DetailRestaurants = {
    async render() {
      return `
        <article id="detail"></article>
        <div id="likeButtonContainer">as</div>
      `;
    },

    async afterRender() {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await GetRestaurantSource.detailRestaurants(url.id);
      const restaurantContainer = document.getElementById('detail');
      restaurantContainer.innerHTML += createRestaurantsDetail(restaurant);

      const likeButtonContainer = document.querySelector('#likeButtonContainer');
      likeButtonContainer.innerHTML = createLikeButtonTemplate();

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
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
