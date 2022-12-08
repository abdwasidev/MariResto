import API_DATA from '../global/api-data';

class GetRestaurantSource {
  static async restaurantsList() {
    const response = await fetch(API_DATA.HOMEPAGE);
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.restaurants;
  }

  static async detailRestaurants(id) {
    const response = await fetch(API_DATA.DETAIL(id));
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.restaurant;
  }
}

export default GetRestaurantSource;
