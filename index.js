import { app } from "./app.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

connectDB()
  .then((res) => {
    app.listen(port, () => {
      console.log(`App running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("mongo db connection error ", error));
