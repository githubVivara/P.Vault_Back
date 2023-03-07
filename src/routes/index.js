import express from "express";
import uipath from "./uipathRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Vault back-end is working here" });
  });

  app.use(express.json(), uipath);
};

export default routes;
