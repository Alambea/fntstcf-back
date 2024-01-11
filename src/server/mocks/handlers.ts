import "dotenv/config";
import { type HttpHandler, HttpResponse, http } from "msw";
import { apiUsersMock } from "./apiUsersMock";

const apiUrl = process.env.API_SYNC_URL;

export const handlers: HttpHandler[] = [
  http.get(`${apiUrl}${"/users"}`, () => HttpResponse.json(apiUsersMock)),
];
