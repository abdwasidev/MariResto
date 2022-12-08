/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
const itActsAsFavoriteRestoModel = (favoriteResto) => {
    it('should return the restaurant that has been added', async () => {
        favoriteResto.putRestaurant({ id: 1 });
        favoriteResto.putRestaurant({ id: 2 });

        expect(await favoriteResto.getRestaurant(1))
          .toEqual({ id: 1 });
        expect(await favoriteResto.getRestaurant(2))
          .toEqual({ id: 2 });
        expect(await favoriteResto.getRestaurant(3))
          .toEqual(undefined);
    });

    it('should refuse a restaurant from being added if it does not have the correct property', async () => {
        favoriteResto.putRestaurant({ aProperty: 'property' });

        expect(await favoriteResto.getAllRestaurants())
            .toEqual([]);
    });

    it('can return all of the restaurant that have been added', async () => {
        favoriteResto.putRestaurant({ id: 1 });
        favoriteResto.putRestaurant({ id: 2 });

        expect(await favoriteResto.getAllRestaurants())
            .toEqual([
                { id: 1 },
                { id: 2 },
            ]);
    });

    it('should remove favorite restaurant', async () => {
        favoriteResto.putRestaurant({ id: 1 });
        favoriteResto.putRestaurant({ id: 2 });
        favoriteResto.putRestaurant({ id: 3 });

        await favoriteResto.deleteRestaurant(1);

        expect(await favoriteResto.getAllRestaurants())
            .toEqual([
                { id: 2 },
                { id: 3 },
            ]);
    });

    it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
        favoriteResto.putRestaurant({ id: 1 });
        favoriteResto.putRestaurant({ id: 2 });
        favoriteResto.putRestaurant({ id: 3 });

        await favoriteResto.deleteRestaurant(4);

        expect(await favoriteResto.getAllRestaurants())
            .toEqual([
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]);
    });

    it('should be able to search for restaurant', async () => {
        favoriteResto.putRestaurant({ id: 1, name: 'resto aa' });
        favoriteResto.putRestaurant({ id: 2, name: 'resto bb' });
        favoriteResto.putRestaurant({ id: 3, name: 'resto aabb' });
        favoriteResto.putRestaurant({ id: 4, name: 'resto aa itu unik' });

      expect(await favoriteResto.searchRestaurants('resto aa')).toEqual([
        { id: 1, name: 'resto aa' },
        { id: 3, name: 'resto aabb' },
        { id: 4, name: 'resto aa itu unik' },
      ]);
    });
};

export { itActsAsFavoriteRestoModel };
