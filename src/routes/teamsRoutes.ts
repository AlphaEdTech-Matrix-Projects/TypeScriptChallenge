import express, { Router } from "express";
import TeamsController from "../controllers/TeamsController";

const teamsController: TeamsController = new TeamsController();

const teamsRouter: Router = express.Router();

teamsRouter.get("", teamsController.getTeams.bind(teamsController));
teamsRouter.get("/:team_id", teamsController.getTeamId.bind(teamsController));
teamsRouter.get(
  "/:team_id/members",
  teamsController.getMembersTeam.bind(teamsController)
);
teamsRouter.post("/", teamsController.createTeam.bind(teamsController));
teamsRouter.post(
  "/:team_id/members/:user_id",
  teamsController.addMemberTeam.bind(teamsController)
);
teamsRouter.patch(
  "/:team_id",
  teamsController.updateTeam.bind(teamsController)
);
teamsRouter.delete(
  "/:team_id",
  teamsController.deleteTeam.bind(teamsController)
);
teamsRouter.delete(
  "/:team_id/members/:user_id",
  teamsController.removeMemberTeam.bind(teamsController)
);

export default teamsRouter;
