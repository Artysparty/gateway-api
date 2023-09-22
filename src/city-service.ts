import express from 'express'

export interface ICity {
  cityId: string;
  name: string;
  country: string;
  peopleCount: number;
}

const CityMock: ICity[] = [
  {
    cityId: '1',
    name: 'Astana',
    country: 'Kazakhstan',
    peopleCount: 7000000
  },
  {
    cityId: '2',
    name: 'Minsk',
    country: 'Belarus',
    peopleCount: 3000000
  },
  {
    cityId: '3',
    name: 'Moscow',
    country: 'Russia',
    peopleCount: 14000000
  },
  {
    cityId: '4',
    name: 'Berlin',
    country: 'Germany',
    peopleCount: 8000000
  },
  {
    cityId: '5',
    name: 'Tokyo',
    country: 'Japan',
    peopleCount: 12000000
  },
  {
    cityId: '6',
    name: 'Hong-Kong',
    country: 'China',
    peopleCount: 21000000
  },
]

class CityService {
  private cities: ICity[];

  constructor() {
    this.cities = CityMock;
  }

  public addCity(city: ICity): void {
    this.cities.push(city);
  }

  public getCities(): ICity[]{
    return this.cities;
  }
}

const app = express();

const service = new CityService();

app.get('/cities', (req, res) => {
  res.json(service.getCities());
});

app.listen(5003, () => {
  console.log('Server listening port 5003');
});
