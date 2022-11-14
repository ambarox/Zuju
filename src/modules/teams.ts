import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import Joi = require("joi");
import { Team, JoiTeamObject } from "../entity";

export const teamsRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/teams",
    options: {
      handler: getTeams,
      response: {
        schema: Joi.array<Team>().items(JoiTeamObject),
        failAction: "log",
      },
      description: "Get All Teams",
      notes: "Returns all teams",
      tags: ["api"],
    },
  },
  {
    method: "GET",
    path: "/teams/{id}",
    options: {
      handler: getTeam,
      validate: {
        params: Joi.object({
          id: Joi.number().integer(),
        }),
      },
      response: {
        schema: JoiTeamObject,
        failAction: "log",
      },
      description: "Get Team by id",
      notes: "Returns a team by the id passed in the path",
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/teams",
    options: {
      handler: saveTeam,
      validate: {
        payload: JoiTeamObject,
      },
      response: {
        schema: JoiTeamObject,
        failAction: "log",
      },
      description: "Create or Update team.",
      notes:
        "When you submit without `id`, will create the entry. else will update the existing entry. And returns created team. please use this for flag : https://countryflagsapi.com/png/<country-code>",
      tags: ["api"],
    },
  },
  {
    method: "DELETE",
    path: "/teams/{id}",
    options: {
      handler: removeTeam,
      validate: {
        params: Joi.object({
          id: Joi.number().integer(),
        }),
      },
      response: {
        schema: JoiTeamObject,
        failAction: "log",
      },
      description: "Remove Team by id",
      notes: "Returns the removed team",
      tags: ["api"],
    },
  },
];

async function getTeams(
  r: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const teams = await Team.find({ skip: 0, take: 5 });
  return h.response(teams);
}

async function getTeam(
  r: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const teams = await Team.findOneBy({ id: r.params.id });
  return h.response(teams);
}

async function saveTeam(
  r: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  let response;

  try {
    let team = new Team();
    let payload: any = r.payload;
    if (payload.id) {
      team.id = payload.id;
    }
    team.name = payload.name;
    team.logo = payload.logo;
    await team.save();
    response = team;
  } catch (err) {
    response = err;
  }

  return h.response(response);
}

async function removeTeam(
  r: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const team = await Team.findOneBy({ id: r.params.id });
  team.softRemove();
  return h.response(team);
}
