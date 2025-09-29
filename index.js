const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'CJV-SMP.aternos.me', // minecraft server ip
  username: 'emeraldgod3v3@gmail.com', // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
  auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
  port: 28594,              // set if you need a port that isn't 25565
  // version: false,           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  password: 'riplolo2021'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
})

function lookAtNearPlayer() {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)

  if(!playerEntity) return

  const pos = playerEntity.position
  bot.lookAt(pos)
}

bot.on('physicTick', lookAtNearPlayer)
// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)
