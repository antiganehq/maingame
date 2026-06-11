import { Hono } from "hono";
import games from "../../modules/games";
import streamers from "../../modules/streamers";
import stats from "../../modules/stats";

const v1 = new Hono();

v1.route("/games", games);
v1.route("/streamers", streamers);
v1.route("/stats", stats);

export default v1;
