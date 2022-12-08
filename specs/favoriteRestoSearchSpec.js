/* eslint-disable no-undef */
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/favorite-resto/favorite-resto-search-presenter';
import FavoriteRestoSearchView from '../src/scripts/views/pages/favorite-resto/favorite-resto-search-view';
import FavoriteRestoDB from '../src/scripts/data/favorite-resto-idb';

describe('Searching restaurants', () => {
    let presenter;
    let favoriteResto;
    let view;

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestoSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteResto = spyOnAllFunctions(FavoriteRestoDB);
        presenter = new FavoriteRestoSearchPresenter({
            favoriteResto,
            view,
        });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurants('resto aa');

            expect(presenter.latestQuery)
                .toEqual('resto aa');
        });

        it('should ask the model to search for restaurants', () => {
            searchRestaurants('resto aa');

            expect(favoriteResto.searchRestaurants)
                .toHaveBeenCalledWith('resto aa');
        });

        it('should show the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1 }]);
            expect(document.querySelectorAll('.resto-card').length)
                .toEqual(1);

            presenter._showFoundRestaurants([{
                id: 1,
                name: 'Satu',
            }, {
                id: 2,
                name: 'Dua',
            }]);
            expect(document.querySelectorAll('.resto-card').length)
                .toEqual(2);
        });

        it('should show the title of the found restaurants', () => {
            presenter._showFoundRestaurants([{
                id: 1,
                name: 'Satu',
            }]);
            expect(document.querySelectorAll('.resto-name')
                .item(0).textContent)
                .toEqual('Satu');
        });

        it('should show - when the restaurant returned does not contain a name', (done) => {
            document.getElementById('restaurant_data').addEventListener('restaurants:updated', () => {
                const restaurantNames = document.querySelectorAll('.resto-name');
                expect(restaurantNames.item(0).textContent).toEqual('-');

                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto aa').and.returnValues([
                { id: 444 },
            ]);

            searchRestaurants('resto aa');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants(' ');
            expect(presenter.latestQuery.length)
                .toEqual(0);

            searchRestaurants('    ');
            expect(presenter.latestQuery.length)
                .toEqual(0);

            searchRestaurants('');
            expect(presenter.latestQuery.length)
                .toEqual(0);

            searchRestaurants('\t');
            expect(presenter.latestQuery.length)
                .toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            searchRestaurants('    ');

            expect(favoriteResto.getAllRestaurants)
                .toHaveBeenCalled();
        });
    });

    describe('When no favorite restaurant could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('restaurant_data').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.item__not__found').length).toEqual(1);

                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto aa').and.returnValues([]);

            searchRestaurants('resto aa');
        });

        it('should not show any restaurant', (done) => {
            document.getElementById('restaurant_data').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.resto-card').length)
                .toEqual(0);
                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto aa')
                .and
                .returnValues([]);

            searchRestaurants('resto aa');
        });
    });
});
