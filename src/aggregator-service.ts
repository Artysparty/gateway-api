import express from "express";
import axios from "axios";

import { IRestaurant } from "./restaurant-service";
import { ICity } from "./city-service";
import { IHotel } from "./hotel-service";

const app = express();

app.get("/hotels", async (req: any, res) => {
			try {
				const hotels = await axios.get(`http://localhost:5001/hotels`);
				res.json(hotels.data);
			} catch (error) {
				console.error("Ошибка при получении отелей", error);
				res.status(500).json({ error: "Ошибка при получении отелей" });
			}
});

app.get("/restaurants", async (req: any, res) => {
	
			try {
				const restaurants = await axios.get(`http://localhost:5002/restaurants`);
				res.json(
          {
            customers: restaurants.data
          }
        );
			} catch (error) {
				console.error("Ошибка при получении ресторанов", error);
				res.status(500).json({ error: "Ошибка при получении ресторанов" });
			}
});

app.get("/cities", async (req: any, res) => {
			try {
        const hotels: IHotel[] = (await axios.get(`http://localhost:5001/hotels`)).data;
        const restaurants: IRestaurant[] = (await axios.get(`http://localhost:5002/restaurants`)).data;
				const cities: ICity[] = (await axios.get(`http://localhost:5003/cities`)).data;

        const result = [];

        cities.forEach(city => {
          result.push({
            city,
            restaurants: restaurants.filter(restaurant => restaurant.cities.some(el => el === city.cityId)),
            hotels: hotels.filter(hotel => hotel.cities.some(el => el === city.cityId)),
          })
        })

				res.json(result);
			} catch (error) {
				console.error("Ошибка при получении городов", error);
				res.status(500).json({ error: "Ошибка при получении городов" });
			}
});

app.listen(3001, () => {
	console.log("Сервер запущен на порту 3001");
});
