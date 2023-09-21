import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

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
				const response = await axios.get(`http://localhost:5001/hotels`);
				res.json(response.data);
			} catch (error) {
				console.error("Ошибка при получении пользователей", error);
				console.error(authData);
				res.status(500).json({ error: "Ошибка сервера" });
			}
		}
	});
});

app.get("/hotels-customers", verifyToken, (req: any, res) => {
	jwt.verify(req.token, secretKey, async (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			try {
				const customers = await axios.get(`http://localhost:5002/customers`);
				const hotels = await axios.get(`http://localhost:5001/hotels`);
				res.json(
          {
            hotels: hotels.data,
            customers: customers.data
          }
        );
			} catch (error) {
				console.error("Ошибка при получении данных", error);
				res.status(500).json({ error: "Ошибка сервера" });
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
