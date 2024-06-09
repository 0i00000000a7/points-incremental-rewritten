const tmp = {
  sqrt: {
    get dim_eff() {
      let eff = player.sqrt.points.add(1).log10().add(1).pow(2)
      if (hasSqUpg(3)) {
        eff = eff.mul(player.sqrt.points.add(1).pow(0.01))
      }
      return eff
    },
    get galCost() {
      return E(100).pow(player.sqrt.galaxies.mul(50).add(50))
    },
    get isCapped() {
      if(player.sqrt.points.gte(1e100) && player.sqrt.galaxies.eq(0)) return true
      else return false
    },
    get isSofted() {
      if(player.sqrt.points.gte(1e100)) return true
      else return false
    },
    get replicatePerTick() {
      let mult = E(1).add(E(0.25).mul(player.points.add(1).log10().div(80).max(1))).pow(1 / 30)
      let debuff = player.sqrt.points.div(1e100).log10().mul(0.01).add(1).max(1)
      debuff = debuff.add(E(10).pow(player.sqrt.points.div("1e400").log10().mul(0.0075).max(0)).sub(0))
      buff = E(1)
      buff = buff.mul(tmp.square.effect)
      if (hasSqUpg(1)) buff = buff.mul(sq_upgs[0].effect)
      if (player.sqrt.galaxies.gte(6)) buff = buff.mul(player.sqrt.galaxies)
      return mult.root(debuff).pow(buff)
    },
    get galaxyEffect() {
      return player.sqrt.points.log10().div(200).min(player.sqrt.galaxies.mul(1 / 2))
    },
  },
  canBuyDim(dim) {
    //忽略维度价格的情况下
    if(player.dims[dim][1].gte(E(2).pow(1024)) && player.sqrt.galaxies.lt(1)) return false
    else return true
  },
  get dimsSoftStart1() {
    return E(2).pow(1024)
  },
  get dimsSoftPower1() {
    let a = E(0.5)
    if (hasSqUpg(2)) a = a.pow(0.8)
    return a
  },
  pointsToDims(dim) {
    var x = player.points.overflow(tmp.dimsSoftStart1, tmp.dimsSoftPower1)
    return x.log10().div(dim)
  },
  square: {
    get gain() {
      return player.points.div("1e485").root(300).div(10).floor()
    },
    get effect() {
      return player.square.total.add(1).logBase(2).add(1)
    }
  }
}