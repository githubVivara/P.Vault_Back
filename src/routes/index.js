import express from "express";
import app from "../app.js";
import uipath from "./uipathRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Vault back-end" });
  });

  app.use(express.json(), uipath);
};

export default routes;
