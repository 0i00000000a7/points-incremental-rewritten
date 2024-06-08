function replicateSqrtPoints() {
  if (player.sqrt.unl) player.sqrt.points = player.sqrt.points.mul(tmp.sqrt.replicatePerTick)
  if (tmp.sqrt.isCapped) player.sqrt.points = E(1e100)
}

function galaxy() {
  if (player.sqrt.points.lt(tmp.sqrt.galCost)) return
  if (player.sqrt.galaxies.lt(1)) {
    if (!confirm('你真的要重置吗?')) return
  }
  galaxy_reset()
  player.sqrt.galaxies = player.sqrt.galaxies.add(1)
}
function galaxy_reset() {
  const dims = [null,
    [E(10),E(10),E(1),E(0),E(0),E(0)],
    [E(100),E(100),E(1),E(0),E(0),E(0)],
    [E(1e3),E(1e3),E(1),E(0),E(0),E(0)],
    [E(1e4),E(1e4),E(1),E(0),E(0),E(0)],
    [E(1e5),E(1e5),E(1),E(0),E(0),E(0)],
    [E(1e6),E(1e6),E(1),E(0),E(0),E(0)],
    [E(1e7),E(1e7),E(1),E(0),E(0),E(0)],
    [E(1e8),E(1e8),E(1),E(0),E(0),E(0)],
  ]
  player.sqrt.points = E(1)
  player.points = E(10)
  player.dims = dims
}

const galaxy_rewards = [
  {
    req: E(1),
    desc: "移除复制器硬上限，购买维度不再花费点数，你可以购买小数个维度"
  },
  {
    req: E(2),
    desc: "自动购买维度",
  },
  {
    req: E(3),
    desc: "解锁点数<sup>2</sup>",
  }
]