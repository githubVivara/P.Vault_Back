import express from "express";
import uipath from "./uipathRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ safira: "back-end server is up" });
  });

  app.use(express.json(), uipath);
};

export default routes;
