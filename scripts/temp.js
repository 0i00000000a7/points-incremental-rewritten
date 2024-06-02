const tmp = {
  sqrt: {
    get dim_eff() {
      return window[map + 1].player.sqrt.points.add(1).log10().add(1).pow(2)
    },
    get galCost() {
      return E(100).pow(window[map + 1].player.sqrt.galaxies.mul(50).add(50))
    },
    get isCapped() {
      if(window[map + 1].player.sqrt.points.gte(1e100) && window[map + 1].player.sqrt.galaxies.eq(0)) return true
      else return false
    },
    get isSofted() {
      if(window[map + 1].player.sqrt.points.gte(1e100)) return true
      else return false
    },
    get replicatePerTick() {
      let mult = E(1).add(E(0.25).mul(window[map + 1].player.points.add(1).log10().div(80).max(1))).pow(1 / 30)
      let debuff = window[map + 1].player.sqrt.points.div(1e100).log10().mul(0.01).add(1).max(1)
      debuff = debuff.add(E(10).pow(window[map + 1].player.sqrt.points.div("1e400").log10().mul(0.0075).max(0)).sub(0))
      return mult.root(debuff)
    },
    get galaxyEffect() {
      return window[map + 1].player.sqrt.points.log10().div(200).min(window[map + 1].player.sqrt.galaxies.mul(1 / 2))
    },
  },
  canBuyDim(dim) {
    //忽略维度价格的情况下
    if(window[map + 1].player.dims[dim][1].gte(E(2).pow(1024)) && window[map + 1].player.sqrt.galaxies.lt(1)) return false
    else return true
  },
  get dimsSoftStart1() {
    return E(2).pow(1024)
  },
  pointsToDims(dim) {
    var x = window[map + 1].player.points.overflow(tmp.dimsSoftStart1, 0.5)
    return x.log10().div(dim)
  },
  square: {
    get gain() {
      return window[map + 1].player.points.div("1e485").root(300).div(10).floor()
    }
  }
}