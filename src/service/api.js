import axios from "axios";
import cors from "cors";

export const api = axios.create({
  baseURL: "https://cloud.uipath.com",
  headers: {
    authorization: "Bearer Token",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const consult = axios.create({
  baseURL: "https://cloud.uipath.com/tvivara/tvivara",
});

export const job = axios.create({
  baseURL: "https://cloud.uipath.com/tvivara/tvivara/orchestrator_",
});
