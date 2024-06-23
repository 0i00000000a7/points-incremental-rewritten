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
    get isSofted2() {
      if(player.sqrt.points.gte("1e400")) return true
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
      if (player.square.chals.includes(1) && player.points.gte(1e10)) buff = buff.mul(player.points.slog(10))
      if (player.square.chals.includes(2) && player.sqrt.points.lt(Number.MAX_VALUE)) buff = buff.mul(player.dims[8][4].add(10).log10())
      return mult.root(debuff).pow(buff).min("1e10")
    },
    get galaxyEffect() {
      let eff = player.sqrt.points.log10().div(200).min(player.sqrt.galaxies.mul(1 / 2))
      if (player.chal == 2) eff = eff.mul(0.75)
      if (player.square.chals.includes(2)) eff = eff.mul(1.2)
      return eff
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
    let costPow = E(1)
    if (player.square.chals.includes(1)) costPow = costPow.mul(0.8)
    var x = player.points.root(costPow).overflow(tmp.dimsSoftStart1, tmp.dimsSoftPower1)
    final = x.log10().div(dim)
    if (player.isSetCappedDim) final = final.min(player.dims[dim][4].add(player.limitBuyDimNumber.div(10)))
    return final
  },
  square: {
    get gain() {
      return player.points.div("1e485").root(300).div(10).floor()
    },
    get effect() {
      return player.square.total.add(1).logBase(2).add(1)
    },
    get chal1cap() {
      return E(10).mul(E(0.99).pow(player.square.resetTime))
    }
  },
  hasSuperScalDim(dim) {
    return player.dims[dim][1].gte(Number.MAX_VALUE)
  },
}
