/* eslint-disable no-new */
/* eslint-disable no-undef */
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/favorite-resto/favorite-resto-show-presenter';
import FavoriteRestoSearchView from '../src/scripts/views/pages/favorite-resto/favorite-resto-search-view';
import FavoriteRestoDB from '../src/scripts/data/favorite-resto-idb';

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestoSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {
        it('should ask for the favorite restaurants', () => {
            const favoriteResto = spyOnAllFunctions(FavoriteRestoDB);

            new FavoriteRestoShowPresenter({
                view,
                favoriteResto,
            });

            expect(favoriteResto.getAllRestaurants).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no restaurants have been liked', (done) => {
            document.getElementById('restaurant_data').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.item__not__found').length)
                .toEqual(1);

                done();
            });

            const favoriteResto = spyOnAllFunctions(FavoriteRestoDB);
            favoriteResto.getAllRestaurants.and.returnValues([]);

            new FavoriteRestoShowPresenter({
                view,
                favoriteResto,
            });
        });
    });

    describe('When favorite restaurants exist', () => {
        it('should show the restaurants', (done) => {
            document.getElementById('restaurant_data').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.resto-card').length).toEqual(2);
                done();
        });

        const favoriteResto = spyOnAllFunctions(FavoriteRestoDB);
        favoriteResto.getAllRestaurants.and.returnValues([
            {
            id: 11, name: 'A', rating: 3, city: 'Kota A', description: 'Terdapat restaurant A',
            },
            {
            id: 22, name: 'B', rating: 4, city: 'Kota B', description: 'Terdapat restaurant B',
            },
        ]);

        new FavoriteRestoShowPresenter({
            view,
            favoriteResto,
        });
        });
    });
});
