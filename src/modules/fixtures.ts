import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import Joi = require("joi");
import { Event, JoiEventObject, Team } from "../entity";

export const fixturesRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/fixtures",
    options: {
      handler: getEvents,
      validate: {
        query: Joi.object({
          date: Joi.date().optional(),
          the_page: Joi.number().integer(),
          per_page: Joi.number().integer(),
          // pagination: Joi.boolean(),
        }),
      },
      response: {
        schema: Joi.object({
          results: Joi.array<Event>().items(JoiEventObject),
          metadata: Joi.object({
            count: Joi.number(),
            totalPages: Joi.number(),
            totalCount: Joi.number(),
            next: Joi.string(),
          }),
        }),
        failAction: "log",
      },
      description: "Get All Events",
      notes: "Returns all fixtures",
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/fixtures",
    options: {
      handler: saveEvent,
      validate: {
        payload: JoiEventObject,
      },
      response: {
        schema: JoiEventObject,
        failAction: "log",
      },
      description: "Create or Update fixture.",
      notes:
        "`home` and `away` fields are optional. To update, fill `id` field.",
      tags: ["api"],
    },
  },
  {
    method: "DELETE",
    path: "/fixtures/{id}",
    options: {
      handler: removeEvent,
      validate: {
        params: Joi.object({
          id: Joi.number().integer(),
        }),
      },
      response: {
        schema: JoiEventObject,
        failAction: "log",
      },
      description: "Remove Fixture by id",
      notes: "Returns the removed fixture",
      tags: ["api"],
    },
  },
];

async function getEvents(
  r: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  console.log(r.query, r.query.date ? new Date(r.query.date) : new Date())
  let [fixtures, totalCount] = await Event.findAndCount({
    skip: r.query.per_page * (r.query.the_page - 1),
    take: r.query.per_page,
    where: {
      event_date: r.query.date ? new Date(r.query.date) : new Date(),
    },
    relations: {
      home: true,
      away: true,
    },
  });
  console.log('fixtures, totalCount')

  return h.response({ results: fixtures, totalCount: totalCount });
}

async function saveEvent(
  r: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  let response;

  try {
    let fixture = new Event();
    let payload: any = r.payload;
    if (payload.id) {
      fixture.id = payload.id;
    }
    fixture.event_date = payload.event_date;
    fixture.location = payload.location;

    fixture.home = await Team.findOneBy({ id: payload.homeId });
    fixture.away = await Team.findOneBy({ id: payload.awayId });

    if (payload.home_score) fixture.home_score = payload.home_score;
    if (payload.away_score) fixture.away_score = payload.away_score;
    if (payload.isLive) fixture.isLive = payload.isLive;

    await fixture.save();
    response = fixture;
  } catch (err) {
    response = err;
  }

  return h.response(response);
}

async function removeEvent(
  r: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const fixture = await Event.findOneBy({ id: r.params.id });
  fixture.softRemove();
  return h.response(fixture);
}
