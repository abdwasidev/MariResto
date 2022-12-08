/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
import { createRestaurantsItemCard } from '../../templates/template-creator';

class FavoriteRestoSearchView {
  getTemplate() {
    return `
        <article id="restaurant">
            <h2>Search Restaurants</h2>
            <input id="query" placeholder="Cari Restoran ..." type="text">
            <h2>Favorite Restaurants</h2>
            <div id="restaurant_data" class="list-item"></div>
        </article>
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurants) => carry.concat(createRestaurantsItemCard(restaurants)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('restaurant_data').innerHTML = html;

    document.getElementById('restaurant_data').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestoTemplate() {
    return '<div class="item__not__found restaurant__not__found">Tidak ada restoran untuk ditampilkan</div>';
  }
}

export default FavoriteRestoSearchView;
