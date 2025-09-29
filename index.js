const mineflayer = require('mineflayer')

// --- Configuration ---
const SERVER_HOST = 'CJV-SMP.aternos.me';
const SERVER_PORT = 28594;
const BOT_USERNAME = 'emeraldgod3v3@gmail.com'; 

// Create the bot instance
const bot = mineflayer.createBot({
  host: SERVER_HOST,
  port: SERVER_PORT,
  username: BOT_USERNAME,
  auth: 'microsoft',          // Use Microsoft authentication
  // version: false,           // Uncomment and set a specific version if needed
});

// --- Bot Functions ---

// Function to make the bot look at the nearest player's head position
function lookAtNearPlayer() {
  // Filter function to find only player entities
  const playerFilter = (entity) => entity.type === 'player'
  
  // Find the nearest entity that is a player
  const playerEntity = bot.nearestEntity(playerFilter)

  if (!playerEntity) return // If no player is found, stop

  // Calculate the position of the player's head (entity position + entity height)
  // This makes the bot look at the player's eyes/head, not their feet
  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  
  // Make the bot turn its head to look at the position
  bot.lookAt(pos)
}


// --- Bot Event Handlers ---

// Call the lookAtNearPlayer function on every 'physicTick' (about 20 times a second)
bot.on('physicTick', lookAtNearPlayer)

bot.on('login', () => {
  console.log(`✅ Bot connecting with Microsoft account: ${bot.username}`);
});

bot.on('spawn', () => {
  console.log('✨ Bot successfully joined and spawned!');
  bot.chat('Hello! I am a bot and I will watch your every move.');
});

// Log errors and kick reasons
bot.on('kicked', console.log)
bot.on('error', console.log)

bot.on('end', (reason) => {
  console.log(`🔌 Connection ended. Reason: ${reason}`);
  // In a production environment, you would add a reconnect mechanism here.
});

// Tell the user the bot is inside the server!
console.log("Your bot is now online!")
