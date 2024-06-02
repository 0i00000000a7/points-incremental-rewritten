function square_reset() {
  galaxy_reset()
  window[map+1].player.sqrt.galaxies = E(1)
}
function square() {
  if (window[map+1].player.points.lt("1e785")) return
  window[map+1].player.square.points = window[map+1].player.square.points.add(tmp.square.gain)
  window[map+1].player.square.total = window[map+1].player.square.total.add(tmp.square.gain)
  square_reset()
  window[map+1].player.square.unl = true
}
function updateSquare() {
  if (window[map+1].player.square.best.lt(window[map+1].player.points)) window[map+1].player.square.best = window[map+1].player.square.points
}