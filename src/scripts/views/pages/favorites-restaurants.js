/* eslint-disable no-new */
import FavoriteRestoDB from '../../data/favorite-resto-idb';
import FavoriteRestoSearchView from './favorite-resto/favorite-resto-search-view';
import FavoriteRestoSearchPresenter from './favorite-resto/favorite-resto-search-presenter';
import FavoriteRestoShowPresenter from './favorite-resto/favorite-resto-show-presenter';

const view = new FavoriteRestoSearchView();

const FavoriteRestaurants = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestoShowPresenter({ view, favoriteResto: FavoriteRestoDB });
    new FavoriteRestoSearchPresenter({ view, favoriteResto: FavoriteRestoDB });
  },
};

export default FavoriteRestaurants;
