import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import { Telegraf } from "telegraf";

import { replies } from "./components/replies.js";
import * as actions from "./components/actions.js";
import { services, buttons } from "./components/services.js";
import {
  deleteButtons,
  sendResponse,
  sendButtons,
  sendPhotos,
  sendServices,
  enableButtons,
} from "./components/botFunctions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const projects_portfolio = "./images/projects_portfolio";
const completed_gardens = "./images/completed_gardens";

const bot = new Telegraf(process.env.token);

bot.start((ctx) => {
  enableButtons();
  sendResponse(ctx, replies.greeting);
  setTimeout(() => sendResponse(ctx, replies.general_information), 2000);
  setTimeout(() => sendButtons(ctx, replies.question, actions.buttons(), 4000));
});

bot.action(actions.commands[0].title, (ctx) => {
  deleteButtons(ctx);
  actions.disable(0);
  sendPhotos(ctx, projects_portfolio, process.env.url);
  setTimeout(() => sendButtons(ctx, replies.next, actions.buttons(), 60000));
});

bot.action(actions.commands[1].title, (ctx) => {
  deleteButtons(ctx);
  actions.disable(1);
  sendPhotos(ctx, completed_gardens, process.env.url);
  setTimeout(() => sendButtons(ctx, replies.next, actions.buttons(), 60000));
});

bot.action(actions.commands[2].title, (ctx) => {
  deleteButtons(ctx);
  actions.disable(2);
  sendServices(ctx, actions.commands[2].title, buttons());
  setTimeout(() => sendButtons(ctx, replies.next, actions.buttons(), 2000));
});

bot.action(actions.commands[3].title, (ctx) => {
  deleteButtons(ctx);
  actions.disable(3);
  sendResponse(ctx, `${process.env.url}/tseny`);
  setTimeout(() => sendButtons(ctx, replies.next, actions.buttons(), 2000));
});

bot.action(actions.commands[4].title, (ctx) => {
  deleteButtons(ctx);
  actions.disable(4);
  sendResponse(ctx, `${process.env.contacts}\n${process.env.url}`);
  sendButtons(ctx, replies.next, actions.buttons());
});

services.forEach((service) =>
  bot.action(service, (ctx) => {
    sendResponse(
      ctx,
      `${process.env.url}/storage/editor/April_studio_2022.doc`
    );
  })
);

bot.launch();
