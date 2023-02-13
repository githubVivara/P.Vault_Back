import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "*", //"http://localhost:3000",
  //optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json());
app.use(cors());
routes(app);

export default app;
