const tmp = {
  sqrt: {
    get dim_eff() {
      return window[map+1].player.sqrt.points.add(1).log10().add(1).pow(2)
    },
    get galCost() {
      return E(100).pow(window[map+1].player.sqrt.galaxies.mul(50).add(50))
    },
    get isCapped() {
      if (window[map+1].player.sqrt.points.gte(1e100) && window[map+1].player.sqrt.galaxies.eq(0)) return true
      else return false
    }
  },
  canBuyDim(dim) {
    //忽略维度价格的情况下
    if (window[map+1].player.dims[dim][1].gte(E(2).pow(1024)) && window[map+1].player.sqrt.galaxies.lt(1)) return false
    else return true
  },
}