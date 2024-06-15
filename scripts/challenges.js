function handleChalButtonClick(chal) {
  if (app.choosed_chal == chal) enterChal(chal)
  app.choosed_chal = chal
}
function enterChal(chal) {
  square_reset()
  player.chal = chal
}
function exitChal() {
  player.chal = 0
  square_reset()
}
function updateChal() {
  if (player.chal == 1) {
    player.dims[8][4] = E(0.1).max(player.dims[8][4]).min(tmp.square.chal1cap)
  }
}
function completeChal() {
  if (!player.square.chals.includes(player.chal)) player.square.chals.push(player.chal)
  exitChal()
}