choosed_chal = 0
function handleChalButtonClick(chal) {
  if (choosed_chal == chal) enterChal(chal)
  choosed_chal = chal
}
function enterChal(chal) {
  player.square.points = player.square.points.add(tmp.square.gain)
  player.square.total = player.square.total.add(tmp.square.gain)
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
  if (player.chal == 5) {
    let a = Math.min(player.sqrt.galaxies.toNumber(), 6)
    for (let i = 1;i<=8;i++) {
      player.dims[i][4] = E(0.1).max(player.dims[i][4])
      if (a < i) player.dims[i][4] = player.dims[i][4].min(tmp.square.chal1cap)
    }
  }
}
function completeChal() {
  if (!player.square.chals.includes(player.chal)) player.square.chals.push(player.chal)
  exitChal()
}
function handleSqChalAnotherButtonClick() {
  player.chal == choosed_chal? (player.points.gte(sq_chal[choosed_chal-1].goal)? completeChal() : exitChal()) : enterChal(choosed_chal)
}

