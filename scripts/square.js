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

sq_upgs = [
  {
    desc: "复制器速率基于复制器而增加",
    get effect() {
      return player.sqrt.points.log10().add(1).pow(0.2)
    },
    cost: E(1),
    get effectDisplay() {
      return `×${this.effect.format()}`
    }
  },
  {
    desc: "维度的超级折算弱化20%",
    cost: E(2),
  },
  {
    desc: "大幅强化√点数的乘数增益",
    cost: E(10),
  },
  {
    desc: "解锁挑战",
    cost: E(3000),
  },
]
function hasSqUpg(upg) {
  return player.square.upgrades.includes(upg)
}
function buySqUpg(upg) {
  if (hasSqUpg(upg)) return
  if (player.square.points.lt(sq_upgs[upg-1].cost)) return
  player.square.points = player.square.points.sub(sq_upgs[upg-1].cost)
  player.square.upgrades.push(upg)
}