function square_reset() {
  galaxy_reset()
  player.sqrt.galaxies = E(1)
}

function square() {
  if(player.points.lt("1e785")) return
  player.square.points = player.square.points.add(tmp.square.gain)
  player.square.total = player.square.total.add(tmp.square.gain)
  square_reset()
  player.square.unl = true
}

function updateSquare() {
  if(player.square.best.lt(player.points)) player.square.best = player.square.points
}

const sq_upgs = [
  {
    desc: "复制器速率基于复制器而增加",
    get effect() {
      return player.sqrt.points.log10().add(1).pow(0.2)
    },
    cost: 'square_points',
  },
]