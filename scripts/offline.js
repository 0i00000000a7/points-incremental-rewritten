function updateOffline() {
  let diff = (Date.now() - player.lastUpdated) / 1000
  if (player.isOffline) {
    player.offlinedTime += diff
  }
  if (player.offlinedTime < 0) player.isOffline = true
  let speed = 2 ** player.offlinePower
  if (player.timeOverpower & (((speed - 1) / 30) < player.offlinedTime) & !player.isOffline) {
    player.offlinedTime -= (speed - 1) / 30
    player.timeSpeed = speed
  } else {
    player.timeSpeed = 1
  }
}
function switchGameState() {
  if (player.offlinedTime < 0) return
  if (player.isOffline) player.isOffline = false
  else player.isOffline = true
}
function switchTimeOverpower() {
  if (player.timeOverpower) player.timeOverpower = false
  else player.timeOverpower = true
}