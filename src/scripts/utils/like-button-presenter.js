import { createLikeRestoButtonTemplate, createUnlikeRestoButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
    async init({ likeButtonContainer, favoriteResto, restaurants }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurants = restaurants;
        this._favoriteResto = favoriteResto;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurants;

        if (await this._isRestaurantExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurants = await this._favoriteResto.getRestaurant(id);
        return !!restaurants;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeRestoButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteResto.putRestaurant(this._restaurants);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createUnlikeRestoButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteResto.deleteRestaurant(this._restaurants.id);
            this._renderButton();
        });
    },
};

export default LikeButtonPresenter;
