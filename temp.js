const tmp = {
  sqrt: {
    get dim_eff() {
      return player.sqrt.points.add(1).log10().add(1).pow(2)
    },
    get galCost() {
      return E(10).pow(E(100).add(E(50).mul(player.sqrt.galaxies)))
    }
  }
}