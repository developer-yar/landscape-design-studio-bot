import { Markup } from "telegraf";

export const services = [
  "Ландшафтное проектиров.",
  "Реализация садов",
  "Аренда мини-техники",
  "Уход за садом",
  "Озеленение офисов",
];

export const buttons = () =>
  Markup.inlineKeyboard(
    services.map((service) => [Markup.button.callback(service, service)])
  );
