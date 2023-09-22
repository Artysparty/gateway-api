export interface IHotel {
  id: string;
  cities: string[];
  name: string;
  stars: number;
  rooms: Room[]
}

export interface Room {
  roomId: string;
  cost: number;
  isFree: boolean;
  numberOfBeds: number;
}

export const HotelsMock: IHotel[] = [
  {
    id: '1',
    name: 'Radisson',
    cities: ['1', '2'],
    stars: 5,
    rooms: [
      {
        cost: 5600,
        roomId: '1',
        isFree: false,
        numberOfBeds: 1,
      },
      {
        cost: 5600,
        roomId: '2',
        isFree: true,
        numberOfBeds: 1,
      },
      {
        cost: 5600,
        roomId: '3',
        isFree: false,
        numberOfBeds: 1,
      },
    ]
  },

  {
    id: '2',
    name: 'FourSeasons',
    cities: ['3', '4'],
    stars: 5,
    rooms: [
      {
        cost: 7800,
        roomId: '1',
        isFree: false,
        numberOfBeds: 1,
      },
      {
        cost: 7800,
        roomId: '2',
        isFree: true,
        numberOfBeds: 2,
      },
      {
        cost: 7800,
        roomId: '3',
        isFree: false,
        numberOfBeds: 1,
      },
    ]
  },

  {
    id: '3',
    name: 'Swisshotel',
    cities: ['5', '6'],
    stars: 5,
    rooms: [
      {
        cost: 4600,
        roomId: '1',
        isFree: false,
        numberOfBeds: 1,
      },
      {
        cost: 4600,
        roomId: '2',
        isFree: true,
        numberOfBeds: 1,
      },
      {
        cost: 4600,
        roomId: '3',
        isFree: true,
        numberOfBeds: 1,
      },
    ]
  },
];

class HotelService {
  private hotels: IHotel[];

  constructor() {
    this.hotels = HotelsMock
  }

  public addHotel(hotel: IHotel): void {
    this.hotels.push(hotel);
  }

  public getHotels(): IHotel[] {
    return this.hotels;
  }
}

const express = require('express');
const app = express();

const service = new HotelService();

app.get('/hotels', (req, res) => {
  res.json(service.getHotels());
});

app.listen(5001, () => {
  console.log('Server listening port 5001');
});
