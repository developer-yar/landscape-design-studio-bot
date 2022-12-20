import fs from "fs";

import { commands } from "./actions.js";

export const enableButtons = () =>
  commands.map((command) => (command.isEnabled = true));

export const deleteButtons = (ctx) => ctx.deleteMessage();

export const sendResponse = (ctx, message) => ctx.reply(message);

export const sendButtons = (ctx, message, buttons) => {
  if (commands.filter((command) => command.isEnabled).length > 0)
    ctx.reply(message, buttons);
};

export const sendPhotos = (ctx, images) =>
  fs.readdirSync(images).forEach((image) => {
    ctx.replyWithPhoto({ source: `${images}/${image}` });
  });

export const sendServices = (ctx, message, buttons) =>
  ctx.reply(message, buttons);
