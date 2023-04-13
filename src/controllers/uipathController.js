import { api, consult, job } from "../service/api.js";
import axios from "axios";

class UipathController {
  //--------------------------------------------------------------------------

  static getSecToken = async (req, res) => {
    const mode = req.body.mode;
    if (mode === "prod") {
      return api
        .post("/identity_/connect/token", {
          grant_type: "client_credentials",
          client_id: "1fb25133-63e0-45e0-90b6-2162fad2062e",
          client_secret: "(rMn(~JtDn(J5dEE",
          scope: "OR.Folders.Read OR.Jobs OR.Execution",
        })
        .then((resp) => {
          res.status(200).send(resp.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      //Para testes use o postman para solicitar um novo token e depois cole no lugar desse access token expirado
      const testResult = {
        access_token:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IkExRTAxNjE4MkYxMTI5QjMwNTIxOUY2OUQ2REY0N0UzMEQzRDJGQzJSUzI1NiIsIng1dCI6Im9lQVdHQzhSS2JNRklaOXAxdDlINHcwOUw4SSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLnVpcGF0aC5jb20vaWRlbnRpdHlfIiwibmJmIjoxNjgxNDIwNzkyLCJpYXQiOjE2ODE0MjEwOTIsImV4cCI6MTY4MTQyNDY5MiwiYXVkIjoiVWlQYXRoLk9yY2hlc3RyYXRvciIsInNjb3BlIjpbIk9SLkV4ZWN1dGlvbiIsIk9SLkZvbGRlcnMuUmVhZCIsIk9SLkpvYnMiXSwic3ViX3R5cGUiOiJzZXJ2aWNlLmV4dGVybmFsIiwicHJ0X2lkIjoiN2Y4MDA3NzAtNTBlNi00M2NkLTgxY2EtY2RjYmY5ZWFkYjBmIiwiY2xpZW50X2lkIjoiMWZiMjUxMzMtNjNlMC00NWUwLTkwYjYtMjE2MmZhZDIwNjJlIiwianRpIjoiMjUzQUZEQTYwQzJFMDhDQzY2MUJGMUFCNUUwNUI1QzEifQ.ZxMKmN-sSHHiaOb9ysl2hzp5UuO3IHgkZttWAwkDACM3OijuoCd24rv98q3Pz_oilO1rc4l9MbzgA7bhstCxrvkMrZM7vUvB38r845FCZ7_jnkbp_cEHRuc1S-Rg5JWDMSoX8OS1meH1AG1rBduEJ8wdG1yVyymCka8nfAIZyb8KERpFmMq-_I2YugfTJonb8ibSqubASu2VRDb7a8vQhgEPw46mwMQCnDcVZW-weS5F8PJGLWya82Ct6Xvf4y-6KeEPGK5HHwAtPbPuvZ9a5qQbAVrKsy7nvx0QHvSVm41ItnAW2ot6GptUugrUVNM7cpLj6XfGsnirEbOGMtVX-w",
        expires_in: 3000,
        token_type: "Bearer",
        scope: "OR.Execution OR.Folders.Read OR.Jobs",
      };
      if (!mode) {
        console.log("400 - bad request");
        return res.status(400).send({ error: "bad request" });
      }
      return res.status(200).send(testResult);
    }
  };
  //--------------------------------------------------------------------------

  static startJob = async (req, res) => {
    const token = req.headers.authorization;
    const reqBody = req.body;

    consult.defaults.headers.authorization = token;
    consult
      .get(`/odata/Releases?$filter=Name eq 'UIPathProjects_AberturaCofre'`, {
        headers: {
          "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
        },
      })
      .then((resp) => {
        const jobBodyParam = {
          startInfo: {
            ReleaseKey: resp.data.value[0].Key,
            Strategy: "ModernJobsCount",
            JobsCount: 1,
            RobotIds: [],
            JobsCount: 1,
            JobPriority: "Normal",
            InputArguments: `{'in_branchName':'${reqBody.in_branchName}','in_Request':'${reqBody.in_Request}'}`,
          },
        };
        job.defaults.headers.authorization = token;
        job
          .post(
            "/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",
            jobBodyParam,
            {
              headers: {
                "Content-Type": "application/json",
                "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
              },
            }
          )
          .then((response) => {
            res.status(201).send(response.data);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });

    //----------------------------

    /* job
      .post(
        "/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",
        jobBodyParam,
        {
          headers: {
            "Content-Type": "application/json",
            "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
          },
        }
      )
      .then((resp) => {
        res.status(201).send(resp.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      }); */

    //res.status(200).send("Ok o trabalho pode ser solicitado");
    // const testResult = {
    //   "@odata.context":
    //     "https://cloud.uipath.com/tvivara/tvivara/orchestrator_/odata/$metadata#Jobs",
    //   "@odata.count": 1,
    //   value: [
    //     {
    //       Key: "5228326a-9989-4781-8a89-480b5afabd6d",
    //       StartTime: "2023-02-16T18:39:49.783Z",
    //       EndTime: "2023-02-16T18:39:49.783Z",
    //       State: "Pending",
    //       JobPriority: "Normal",
    //       SpecificPriorityValue: 45,
    //       ResourceOverwrites: null,
    //       Source: "Manual",
    //       SourceType: "Manual",
    //       BatchExecutionKey: "e1580c94-6871-4fbc-a419-c36e8bcdb882",
    //       Info: null,
    //       CreationTime: "2023-02-16T18:19:01.247Z",
    //       StartingScheduleId: null,
    //       ReleaseName: "UIPathProjects_AberturaCofre",
    //       Type: "Unattended",
    //       InputArguments: '{"in_branchName":"JOC","in_Request":0}',
    //       OutputArguments: null,
    //       HostMachineName: null,
    //       HasMediaRecorded: false,
    //       HasVideoRecorded: false,
    //       PersistenceId: null,
    //       ResumeVersion: null,
    //       StopStrategy: "Kill",
    //       RuntimeType: "Unattended",
    //       RequiresUserInteraction: true,
    //       ReleaseVersionId: null,
    //       EntryPointPath: "CoreTemp.xaml",
    //       OrganizationUnitId: 1291235,
    //       OrganizationUnitFullyQualifiedName:
    //         "Desenvolvimento/Segurança/Abertura de cofre",
    //       Reference: "",
    //       ProcessType: "Process",
    //       ProfilingOptions: null,
    //       ResumeOnSameContext: false,
    //       LocalSystemAccount: "",
    //       OrchestratorUserIdentity: null,
    //       RemoteControlAccess: "None",
    //       MaxExpectedRunningTimeSeconds: null,
    //       Id: 70758471,
    //     },
    //   ],
    // };
    // res.status(200).send(testResult);
  };
  //--------------------------------------------------------------------------
  static ConsultJobState = (req, res) => {
    const token = req.headers.authorization;
    const reqBody = req.body;

    job.defaults.headers.authorization = token;
    job
      .get(`/odata/Jobs?$Filter=Id eq ${reqBody.Id}`, {
        headers: {
          "X-UIPATH-TenantName": "tvivara",
          "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
        },
      })
      .then((resp) => {
        res.status(200).send(resp.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });

    // const testResult = {
    //   "@odata.context":
    //     "https://cloud.uipath.com/tvivara/tvivara/orchestrator_/odata/$metadata#Jobs",
    //   "@odata.count": 1,
    //   value: [
    //     {
    //       Key: "5228326a-9989-4781-8a89-480b5afabd6d",
    //       StartTime: "2023-02-16T18:39:49.783Z",
    //       EndTime: "2023-02-16T18:39:49.783Z",
    //       State: "Runnig",
    //       JobPriority: "Normal",
    //       SpecificPriorityValue: 45,
    //       ResourceOverwrites: null,
    //       Source: "Manual",
    //       SourceType: "Manual",
    //       BatchExecutionKey: "e1580c94-6871-4fbc-a419-c36e8bcdb882",
    //       Info: null,
    //       CreationTime: "2023-02-16T18:19:01.247Z",
    //       StartingScheduleId: null,
    //       ReleaseName: "UIPathProjects_AberturaCofre",
    //       Type: "Unattended",
    //       InputArguments: '{"in_branchName":"JOC","in_Request":0}',
    //       OutputArguments: null,
    //       HostMachineName: null,
    //       HasMediaRecorded: false,
    //       HasVideoRecorded: false,
    //       PersistenceId: null,
    //       ResumeVersion: null,
    //       StopStrategy: "Kill",
    //       RuntimeType: "Unattended",
    //       RequiresUserInteraction: true,
    //       ReleaseVersionId: null,
    //       EntryPointPath: "CoreTemp.xaml",
    //       OrganizationUnitId: 1291235,
    //       OrganizationUnitFullyQualifiedName:
    //         "Desenvolvimento/Segurança/Abertura de cofre",
    //       Reference: "",
    //       ProcessType: "Process",
    //       ProfilingOptions: null,
    //       ResumeOnSameContext: false,
    //       LocalSystemAccount: "",
    //       OrchestratorUserIdentity: null,
    //       RemoteControlAccess: "None",
    //       MaxExpectedRunningTimeSeconds: null,
    //       Id: 70758471,
    //     },
    //   ],
    // };
    // res.status(200).send(testResult);
    //res.status(500).send({ Erro: "Erro no servidor" });
  };
  //--------------------------------------------------------------------------
  static StopJobState = (req, res) => {
    const token = req.headers.authorization;
    const reqBody = req.body;
    const jobBodyParam = {
      jobIds: [reqBody.jobRequestId],
      strategy: "Kill",
    };
    job.defaults.headers.authorization = token;
    job
      .post(
        "/odata/Jobs/UiPath.Server.Configuration.OData.StopJobs",
        jobBodyParam,
        {
          headers: {
            "X-UIPATH-TenantName": "tvivara",
            "X-UIPATH-OrganizationUnitId": reqBody.OrganizationUnitId,
          },
        }
      )
      .then((resp) => {
        res.status(200).send(resp.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    //res.status(200).send({ job: "stoped" });
    //res.status(500).send({ Erro: "Erro no servidor" });
  };
  //--------------------------------------------------------------------------
}

export default UipathController;
