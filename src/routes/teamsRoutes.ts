import  express, { Router } from "express";
import TeamsController from "../controllers/TeamsController";

const teamsController: TeamsController = new TeamsController();

const teamsRouter: Router = express.Router();

teamsRouter.get('', teamsController.getTeams);
teamsRouter.get('/:team_id', teamsController.getTeamId);
teamsRouter.get('/:team_id/members', teamsController.getMembersTeam);
teamsRouter.post('/', teamsController.createTeam);
teamsRouter.post('/:team_id/members/:user_id', teamsController.addMemberTeam);
teamsRouter.patch('/:team_id', teamsController.updateTeam);
teamsRouter.delete(':team_id', teamsController.deleteTeam);

export default teamsRouter;