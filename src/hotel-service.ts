export const HotelsMock = [
  {
    name: 'Radisson',
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
    name: 'FourSeasons',
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
    name: 'Swisshotel',
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

export interface Hotel {
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
class HotelService {
  private hotels: Hotel[];

  constructor() {
    this.hotels = HotelsMock
  }

  public addHotel(hotel: Hotel): void {
    this.hotels.push(hotel);
  }

  public getAvailableHotelRooms(): Hotel[] {
    return this.hotels
    .filter(hotel => {
      return hotel.rooms.some(room => room.isFree)
    })
  }
}

const express = require('express');
const app = express();

const service = new HotelService();

app.get('/hotels', (req, res) => {
  res.json(service.getAvailableHotelRooms());
});

app.listen(5001, () => {
  console.log(service.getAvailableHotelRooms())
  console.log('Server listening port 5001');
});
