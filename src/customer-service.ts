export interface Customer {
  fullName: string;
  age: number;
  passportSeriesAndNumber: string;
  hotelName: string;
  roomId: string;
}
export const CustomersMock = [
  {
    fullName: 'Full Name Name',
    age: 22,
    passportSeriesAndNumber: '1233 332244',
    hotelName: 'Radisson',
    roomId: '1',
  },
  {
    fullName: 'Full Name Name',
    age: 22,
    passportSeriesAndNumber: '1233 332244',
    hotelName: 'Radisson',
    roomId: '2',
  },
  {
    fullName: 'Full Name Name',
    age: 22,
    passportSeriesAndNumber: '1233 332244',
    hotelName: 'Radisson',
    roomId: '3',
  },
  {
    fullName: 'Full Name Name',
    age: 22,
    passportSeriesAndNumber: '1233 332244',
    hotelName: 'Four Seasons',
    roomId: '1',
  },
  {
    fullName: 'Full Name Name',
    age: 22,
    passportSeriesAndNumber: '1233 332244',
    hotelName: 'Four Seasons',
    roomId: '2',
  },
  {
    fullName: 'Full Name Name',
    age: 22,
    passportSeriesAndNumber: '1233 332244',
    hotelName: 'Four Seasons',
    roomId: '3',
  },
  {
    fullName: 'Full Name Name',
    age: 22,
    passportSeriesAndNumber: '1233 332244',
    hotelName: 'Radisson',
    roomId: '1',
  },
]
class CustomerService {
  private customers: Customer[];

  constructor() {
    this.customers = CustomersMock;
  }

  public addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }

  public getCustomerByHotelRoom(hotel: string, room: string): Customer[] {
    return this.customers.filter(customer => {
      return customer.hotelName === hotel && customer.roomId === room
    })
  }

  public getCustomers(): Customer[] {
    return this.customers
  }
}

const express = require('express');
const app = express();

const service = new CustomerService();

app.get('/customer-in-hotel-room', (req, res) => {
  res.json(service.getCustomerByHotelRoom('Radisson', '1'));
});

app.get('/customers', (req, res) => {
  res.json(service.getCustomers());
});

app.listen(5002, () => {
  console.log('Server listening port 5002');
});
