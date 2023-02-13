import axios from "axios";
import { api, job } from "../service/api.js";
import cors from "cors";

class UipathController {
  static getSecToken = async (req, res) => {
    var corsOptions = {
      origin: "https://cloud.uipath.com",
    };
    api
      .post("identity_/connect/token", {
        grant_type: "client_credentials",
        client_id: "1fb25133-63e0-45e0-90b6-2162fad2062e",
        client_secret: "(rMn(~JtDn(J5dEE",
        scope: "OR.Folders.Read OR.Jobs  OR.Execution",
      })
      .then((resp) => {
        res.status(200).send(resp.data);
      })
      .catch((err) => {
        res.status(400).send({ "Deu erro": err });
      });
  };
  static startJob = (req, res) => {
    const token = req.headers.authorization;
    const jobBodyParam = req.body;
    const jtype = req.query;

    //res.status(200).send("Ok o trabalho pode ser solicitado");
    res
      .status(200)
      .send({ token: token, jobBodyParam: jobBodyParam, jtype: jtype });
  };
}

export default UipathController;
