export interface IRestaurant {
  id: string;
  name: string;
  cities: string[];
  kitchenCountry: string;
  price: 'low' | 'medium' | 'expensive'
}

export const RestaurantsMock: IRestaurant[] = [
  {
    id: '1',
    name: 'JapanFood',
    cities: ['1', '3', '5'],
    kitchenCountry: 'Japan',
    price: 'expensive'
  },

  {
    id: '2',
    name: 'RussianFood',
    cities: ['1', '2', '4'],
    kitchenCountry: 'Russia',
    price: 'medium'
  },

  {
    id: '3',
    name: 'KoreanFood',
    cities: ['2', '3', '6'],
    kitchenCountry: 'Korea',
    price: 'low'
  },
]
class RestaurantService {
  private restaurants: IRestaurant[];

  constructor() {
    this.restaurants = RestaurantsMock;
  }

  public addRestaurant(rest: IRestaurant): void {
    this.restaurants.push(rest);
  }

  public getRestaurants(): IRestaurant[] {
    return this.restaurants
  }
}

const express = require('express');
const app = express();

const service = new RestaurantService();

app.get('/restaurants', (req, res) => {
  res.json(service.getRestaurants());
});

app.listen(5002, () => {
  console.log('Server listening port 5002');
});
