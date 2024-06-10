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
const sq_chal = [{
  id: 1,
  title: "挑战1 - 递归地狱",
  desc: "你的前一维度不能超过后一维度的数量平方(第八维度除外)<br>点数不能超过√点数的平方<br>但开始拥有一个第8维度",
  goal: E(2).pow(1024),
  reward: "奖励：前一维度的倍率×log<sub>2</sub>(后一维度倍率)，但前提是后一维度倍率达到至少1024倍；√点数获取速度×slg(点数)，前提是点数达到1.000e10；所有维度的价格^0.8",
},
]