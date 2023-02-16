import axios from "axios";
import { api, job } from "../service/api.js";
import cors from "cors";

class UipathController {
  //--------------------------------------------------------------------------
  static getSecToken = async (req, res) => {
    // api
    //   .post("identity_/connect/token", {
    //     grant_type: "client_credentials",
    //     client_id: "1fb25133-63e0-45e0-90b6-2162fad2062e",
    //     client_secret: "(rMn(~JtDn(J5dEE",
    //     scope: "OR.Folders.Read OR.Jobs  OR.Execution",
    //   })
    //   .then((resp) => {
    //     res.status(200).send(resp.data);
    //   });

    res.status(200).send({ token: "token aqui do servidor" });
    //res.status(500).send({ Erro: "Erro aqui no servidor" });
  };
  //--------------------------------------------------------------------------
  static startJob = (req, res) => {
    const token = req.headers.authorization;
    const reqBody = req.body;
    const jobBodyParam = {
      startInfo: {
        ReleaseKey: "256dc842-073d-4d7a-8794-309bdb16a7fb",
        Strategy: "ModernJobsCount",
        JobsCount: 1,
        RobotIds: [],
        JobsCount: 1,
        JobPriority: "Normal",
        InputArguments: `{'in_branchName':'${reqBody.in_branchName}','in_Request':'${reqBody.in_Request}'}`,
      },
    };
    // job.defaults.headers.authorization = token;

    // job
    //   .post(
    //     "/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",
    //     jobBodyParam,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
    //       },
    //     }
    //   )
    //   .then((resp) => {
    //     res.status(201).send(resp.data);
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });

    //res.status(200).send("Ok o trabalho pode ser solicitado");
    res.status(200).send({ job: "Trabalho iniciado" });
  };
  //--------------------------------------------------------------------------
  static ConsultJobState = (req, res) => {
    const token = req.headers.authorization;
    const reqBody = req.body;

    // job.defaults.headers.authorization = token;
    // job
    //   .get(`/odata/Jobs?$Filter=Id eq ${reqBody.Id}`, {
    //     headers: {
    //       "X-UIPATH-TenantName": "tvivara",
    //       "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
    //     },
    //   })
    //   .then((resp) => {
    //     res.status(200).send(resp.data);
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });

    res.status(500).send({ Erro: "Erro no servidor" });
  };
  //--------------------------------------------------------------------------
  static StopJobState = (req, res) => {
    // const token = req.headers.authorization;
    // const reqBody = req.body;
    // const jobBodyParam = {
    //   jobIds: [reqBody.jobRequestId],
    //   strategy: "Kill",
    // };
    // job.defaults.headers.authorization = token;
    // job
    //   .post(
    //     "/odata/Jobs/UiPath.Server.Configuration.OData.StopJobs",
    //     jobBodyParam,
    //     {
    //       headers: {
    //         "X-UIPATH-TenantName": "tvivara",
    //         "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
    //       },
    //     }
    //   )
    //   .then((resp) => {
    //     res.status(200).send(resp.data);
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });
    res.status(500).send({ Erro: "Erro no servidor" });
  };
  //--------------------------------------------------------------------------
}

export default UipathController;
