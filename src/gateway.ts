import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

import { IRestaurant } from "./restaurant-service";
import { ICity } from "./city-service";
import { IHotel } from "./hotel-service";

const app = express();
const secretKey = "mysecretkey";

app.get("/login", (req, res) => {
	const user = {
		id: 1,
		username: "myusername",
	};

	jwt.sign({ user }, secretKey, { expiresIn: "30m" }, (err, token) => {
		if (err) throw err;
		res.json({
			token,
		});
	});
});

app.get("/hotels", verifyToken, (req: any, res) => {
	jwt.verify(req.token, secretKey, async (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			try {
				const hotels = await axios.get(`http://localhost:5001/hotels`);
				res.json(hotels.data);
			} catch (error) {
				console.error("Ошибка при получении отелей", error);
				res.status(500).json({ error: "Ошибка при получении отелей" });
			}
		}
	});
});

app.get("/restaurants", verifyToken, (req: any, res) => {
	jwt.verify(req.token, secretKey, async (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
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
		}
	});
});

app.get("/cities", verifyToken, (req: any, res) => {
	jwt.verify(req.token, secretKey, async (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
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
		}
	});
});

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

app.listen(3000, () => {
	console.log("Сервер запущен на порту 3000");
});
