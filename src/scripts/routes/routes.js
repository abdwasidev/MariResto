import DetailRestaurants from '../views/pages/detail-restaurants';
import HomePage from '../views/pages/homepage';
import FavoriteRestaurants from '../views/pages/favorites-restaurants';

const routes = {
    '/': HomePage, // default page
    '/favorites': FavoriteRestaurants,
    '/detail/:id': DetailRestaurants,
};

export default routes;
