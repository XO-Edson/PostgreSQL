import dotenv from "dotenv";

import express from "express";
import pool from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send({ message: "Running..." }));

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

app.post("/products", async (req, res) => {
  try {
    // Extract product data from the request body
    const { type_id, name, supplier, description } = req.body;

    // Execute a SQL INSERT query to add the product to the database
    const query = `
            INSERT INTO product (type_id, name, supplier, description)
            VALUES ($1, $2, $3, $4)
            RETURNING *;`;

    const values = [type_id, name, supplier, description];
    const result = await pool.query(query, values);

    // Return the newly added product as the response
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // If an error occurs, log the error and send a 500 Internal Server Error response
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

app.listen(3500, () => console.log("Server running on port 3500"));
