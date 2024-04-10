import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./src/database/db.js";
//Rotas
import companyRoute from "./src/routes/company.route.js";
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import stockRoute from "./src/routes/stock.route.js";
import sellRoute from "./src/routes/sell.route.js";
import scheduleRoute from "./src/routes/schedule.route.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(express.json());
app.use(cors());
app.use("/company", companyRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/stock", stockRoute);
app.use("/sell", sellRoute);
app.use("/schedule", scheduleRoute);

app.listen(port);
