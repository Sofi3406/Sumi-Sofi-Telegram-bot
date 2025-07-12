
const userStates = {};

//  categories with related data
const categories = {
  "1": {
    name: "greeting",
    data: [
      "Hello my name is Sofiya! 👋",
      "Hi Sofiya! My name is Sumeya ☀️",
      "Good morning Sumi,How are you 😊",
    ],
  },
  "2": {
    name: "advice",
    data: [
      "Keep calm and carry on.",
      "Trust the process.",
      "Never stop learning.",
      "Write code as if the person who ends up maintaining it is a violent psychopath who knows where you live.",
      "Debugging is like being the detective in a crime movie where you are also the murderer.",
      "Code never lies, comments sometimes do.",
      "Good code is its own best documentation.",
      "First, solve the problem. Then, write the code.",
      "Programming isn't about what you know; it's about what you can figure out.",
      "Simplicity is the soul of efficiency.",
    ],
  },
  "3": {
    name: "jock",
    data: [
      "Why did the chicken cross the road? To get to the other side!",
      "I told my computer I needed a break, it said no problem — it needed one too.",
      "There are only 10 kinds of people in this world: those who understand binary and those who don’t.",
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "Why do Java developers wear glasses? Because they don’t see sharp.",
      "Debugging: Being the detective in a crime movie where you are also the murderer.",
      "To understand recursion, you must first understand recursion.",
      "Why was the developer unhappy at their job? They wanted arrays.",
    ],
  },
  "4": {
    name: "tech courses",
    data: [
      "Learn JavaScript at freeCodeCamp.",
      "Try the CS50 Harvard course.",
      "Check out The Odin Project.",
      "Explore Python on Codecademy.",
      "Master React with Scrimba tutorials.",
      "Dive into algorithms with LeetCode challenges.",
      "Understand data structures on GeeksforGeeks.",
    ],
  },
};

// When user clicks a category button, e.g. "1", "2", "3", "4"
function handleCategoryClick(userId, categoryId, ctx) {
  if (!categories[categoryId]) {
    ctx.telegram.sendMessage(userId, "Unknown category.");
    return;
  }

  userStates[userId] = { categoryId, index: 0 };

  const firstItem = categories[categoryId].data[0];
  ctx.telegram.sendMessage(userId, `${categories[categoryId].name}: ${firstItem}`);
}

// When user clicks "5, next"
function handleNextClick(userId, ctx) {
  const state = userStates[userId];

  if (!state || !categories[state.categoryId]) {
    ctx.telegram.sendMessage(userId, "🤔 I don’t have anything for that. Please select a category first.");
    return;
  }

  // Increment index
  state.index++;

  const categoryData = categories[state.categoryId].data;

  if (state.index >= categoryData.length) {
    // Loop back to start (or optionally notify)
    state.index = 0;
  }

  const nextItem = categoryData[state.index];
  ctx.telegram.sendMessage(userId, `${categories[state.categoryId].name}: ${nextItem}`);
}

module.exports = {
  categories,
  userStates,
  handleCategoryClick,
  handleNextClick,
};
