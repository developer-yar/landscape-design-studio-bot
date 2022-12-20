import { Markup } from "telegraf";

export let commands = [
  {
    title: "Портфолио проектов",
  },
  {
    title: "Реализованные сады",
  },
  {
    title: "Услуги",
  },
  {
    title: "Прайс",
  },
  {
    title: "Контакты",
  },
];

export let buttons = () =>
  Markup.inlineKeyboard(
    commands
      .filter((command) => command.isEnabled)
      .map((command) => [Markup.button.callback(command.title, command.title)])
  ).resize();

export let disable = (index) => (commands[index].isEnabled = false);
