function square_reset() {
  galaxy_reset()
  player.sqrt.galaxies = E(1)
  player.square.resetTime = E(0)
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
  if (hasSqChal(5)) {
    player.square.points = player.square.points.add(tmp.square.gain.mul(0.1/30))
    player.square.total = player.square.total.add(tmp.square.gain.mul(0.1/30))
  }
}
const sq_upgs = [{
    desc: "√点数速率基于√点数而增加",
    get effect() {
      return player.sqrt.points.log10().add(1).pow(0.2)
    },
    cost: E(1),
    get effectDisplay() {
      return `×${this.effect.format()}`
    },
    unlocked: true
  },
  {
    desc: "维度的超级折算弱化20%",
    cost: E(2),
    unlocked: true,
    get effectDisplay() {
      return `-${this.effect.mul(100).format()}%`
    },
    get effect() {
      let eff = E(0.2)
      if (hasSqUpg(6)) eff = eff.mul(1.2)
      return eff
    }
  },
  {
    desc: "大幅强化√点数的乘数增益",
    cost: E(10),
    unlocked: true
  },
  {
    desc: "解锁挑战",
    cost: E(3000),
    unlocked: true
  },
  {
    desc: "对于挑战2的第二个奖励，前五个维度的指数增益+0.5",
    cost: E(5e8),
    get unlocked() {
      return hasSqChal(3) && player.square.chals.length >= 1
    },
    get effect() {
      let eff = E(0.5)
      if (hasSqUpg(6)) eff = eff.mul(1.2)
      return eff
    },
    get effectDisplay() {
      return `+${this.effect.format()}`
    }
  },
  {
    desc: "前面的升级的效果+20%",
    cost: E(1e10),
    get unlocked() {
      return hasSqChal(3) && player.square.chals.length >= 2
    }
  },
  {
    desc: "解锁自动购买星系，挑战2第三效果在1.79e308后仍然生效，√点数效果^4",
    cost: E(1.5e12),
    get unlocked() {
      return hasSqChal(3) && player.square.chals.length >= 3
    }
  },
  {
    desc: "点数获取速度指数+0.08，在任意平方挑战内+0.16，解锁平方挑战5",
    cost: E(1e20),
    get unlocked() {
      return hasSqChal(3) && player.square.chals.length >= 4
    }
  },
  {
    desc: "Coming S∞n",
    cost: E(2e34),
    get unlocked() {
      return hasSqChal(3) && player.square.chals.length >= 5
    }
  },
]

function hasSqUpg(upg) {
  return player.square.upgrades.includes(upg)
}

function hasSqChal(upg) {
  return player.square.chals.includes(upg)
}

function buySqUpg(upg) {
  if(hasSqUpg(upg)) return
  if(player.square.points.lt(sq_upgs[upg - 1].cost)) return
  player.square.points = player.square.points.sub(sq_upgs[upg - 1].cost)
  player.square.upgrades.push(upg)
}
const sq_chal = [{
    id: 1,
    title: "挑战1 - 递归地狱",
    desc: "你的前一维度不能超过后一维度的数量平方(第八维度除外)<br>点数不能超过√点数的平方<br>开始拥有一个第8维度<br>第8维度上限100个，且此上限每秒×0.99",
    goal: E(2).pow(1024),
    reward: "前一维度的倍率×log<sub>2</sub>(后一维度倍率)，但前提是后一维度倍率达到至少1024倍<br>√点数获取速度×slg(点数)，前提是点数达到1.000e10<br>所有维度的价格^0.8",
    unlocked: true
  },
  {
    id: 2,
    title: "挑战2 - 倍数后移",
    desc: "一个维度的倍率是前一个维度的，8维倍率自动填充为1倍<br>星系效率-25%",
    get unlocked() {
      return player.square.chals.includes(1)
    },
    goal: E(2).pow(1024).pow(2),
    reward: "星系的效率+20%<br>√点数对第一维度的乘数增益指数+0.1，第二维度+0.2，以此类推，第八维度+0.8<br>√点数在1.79e308之前的复制速度*lg(第八维度购买的数量+10)<br>允许你对下次购买维度时购买的数量设置上限"
  },
  {
    id: 3,
    title: "挑战3 - 行动受限",
    desc: `每购买一个√星系(除了第一个永久保留的√星系)，都将点数获取速度^0.9<br>点数获取^(1/1.696)^(维度购买数量+1)<br>购买1维使点数生产×1，2维×2，以此类推`,
    get unlocked() {
      return player.square.chals.includes(2)
    },
    goal: E(2).pow(1024).pow(3),
    reward: "解锁(已完成的平方挑战数)个新平方升级<br>√星系价格^0.9<br>√星系不再重置任何东西"
  },
  {
    id: 4,
    title: "挑战4 - 星系摧毁",
    desc: `基于√点数的星系效果无效`,
    get unlocked() {
      return hasSqUpg(7)
    },
    goal: E(2).pow(1024).pow(4),
    reward: "√点数复制速度×π,挑战3第二效果也对星系效果生效"
  },
  {
    id: 5,
    title: "挑战5 - 终焉挑战",
    desc: `C1~C4同时运行<br>平方升级1,3,5,7禁用<br>自动购买维度和星系禁用<br>第一维度效果对所有维度都生效(每个星系都移除一个，上限移除6个)<br>C3第一效果生效6次<br>每个星系使点数获取速度×2`,
    get unlocked() {
      return hasSqUpg(8)
    },
    goal: E(2).pow(1024),
    get reward() {return `每秒获取10%点数<sup>2</sup><br>点数<sup>2</sup>基础效果^2<br>解锁${wordShift.randomCrossWords("?????",10)}`},
  },
]