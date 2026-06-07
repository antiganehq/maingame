import { Hono } from "hono";
import games from "../../modules/games";
import streamers from "../../modules/streamers";

const v1 = new Hono();

v1.route("/games", games);
v1.route("/streamers", streamers);

export default v1;
