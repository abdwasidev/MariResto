/* eslint-disable no-prototype-builtins */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';

let favoriteResto = [];

const FavoriteRestoArray = {

    getRestaurant(id) {
        if (!id) {
        return;
        }

    return favoriteResto.find((restaurant) => restaurant.id === id);
  },

    getAllRestaurants() {
        return favoriteResto;
    },

    putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        if (this.getRestaurant(restaurant.id)) {
            return;
        }

        favoriteResto.push(restaurant);
    },

    deleteRestaurant(id) {
        favoriteResto = favoriteResto.filter((restaurant) => restaurant.id !== id);
    },

    searchRestaurants(query) {
        return this.getAllRestaurants()
        .filter((restaurant) => {
            const loweredCaseRestoName = (restaurant.name || '-').toLowerCase();
            const jammedRestoName = loweredCaseRestoName.replace(/\s/g, '');

            const loweredCaseQuery = query.toLowerCase();
            const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

            return jammedRestoName.indexOf(jammedQuery) !== -1;
        });
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteResto = []);

    itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
