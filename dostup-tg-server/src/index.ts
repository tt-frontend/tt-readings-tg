import { Telegraf } from "telegraf";

const token: string = "6669772925:AAE58dVurI0DlI0HRsW6CuzgLfcG9HNGRSY";
const WEB_APP_URL = "https://efa0-5-3-152-62.ngrok-free.app";

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
