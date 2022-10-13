import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/usersRouter.js";
import urlRoute from "./routes/urlsRouter.js";
dotenv.config();

const server = express();
server.use(express.json());

server.use(userRoute);
server.use(urlRoute);

server.listen(process.env.PORT, () => {
  console.log(`Magic happens on ${process.env.PORT}`);
});
