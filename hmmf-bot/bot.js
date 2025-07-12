require("dotenv").config();
const { Telegraf } = require("telegraf");

const {
  categories,
  handleCategoryClick,
  handleNextClick,
} = require("./data.js");

const bot = new Telegraf(process.env.BOT_TOKEN);

const keyboard = [
  [{ text: "1, greeting", callback_data: "1" }],
  [{ text: "2, advice", callback_data: "2" }],
  [{ text: "3, jock", callback_data: "3" }],
  [{ text: "4, tech courses", callback_data: "4" }],
  [{ text: "5, next", callback_data: "5" }],
  [{ text: "6, back to menu", callback_data: "6" }],
];

bot.start((ctx) => {
  ctx.reply("Welcome to How Meet My Friend Bot! Please select a category:", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

bot.on("callback_query", (ctx) => {
  const userId = ctx.from.id;
  const data = ctx.callbackQuery.data;

  if (["1", "2", "3", "4"].includes(data)) {
    handleCategoryClick(userId, data, ctx);
  } else if (data === "5") {
    handleNextClick(userId, ctx);
  } else if (data === "6") {
    ctx.telegram.sendMessage(userId, "Please select a category:", {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
  ctx.answerCbQuery();
});

bot.launch();
console.log("How Meet My Friend Bot.");
