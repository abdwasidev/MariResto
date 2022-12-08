class FavoriteRestoShowPresenter {
    constructor({ view, favoriteResto }) {
        this._view = view;
        this._favoriteResto = favoriteResto;

        this._showFavoriteRestaurants();
    }

    async _showFavoriteRestaurants() {
        const restaurants = await this._favoriteResto.getAllRestaurants();
        this._displayRestaurants(restaurants);
    }

    _displayRestaurants(restaurants) {
        this._view.showFavoriteRestaurants(restaurants);
    }
  }

  export default FavoriteRestoShowPresenter;
