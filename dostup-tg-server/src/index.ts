import { Telegraf } from "telegraf";

const token: string = "6244421311:AAEPUnvTISRF6U20IEfYkHZ3514kRzNqj7k";
const WEB_APP_URL = "https://27fe-89-19-213-24.ngrok-free.app";

const bot = new Telegraf(token);

bot.start(async (ctx) => {
  await ctx.sendMessage("Нажми на кнопку снизу", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть приложение",
            web_app: {
              url: WEB_APP_URL,
            },
          },
        ],
      ],
    },
  });
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
