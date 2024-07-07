const tmp = {
  sqrt: {
    get dim_eff() {
      let eff = player.sqrt.points.add(1).log10().add(1).pow(2)
      if((hasSqUpg(3) && player.chal != 5)) {
        eff = eff.mul(player.sqrt.points.add(1).pow(0.01))
      }
      if((hasSqUpg(7) && player.chal != 5)) eff = eff.pow(4)
      return eff
    },
    get galCost() {
      let cost = E(100).pow(player.sqrt.galaxies.mul(50).add(50))
      if (player.sqrt.galaxies.gte(20)) cost = E(10).pow(E(player.sqrt.galaxies).pow(2.554))
      if (player.sqrt.galaxies.gte(80)) cost = E(10).pow(E(1.1502).pow(E(player.sqrt.galaxies)))
      cost = cost.root(tmp.sqrt.fullCostRoot)
      return cost
    },
    get isCapped() {
      if(player.sqrt.points.gte(1e100) && player.sqrt.galaxies.eq(0)) return true
      else return false
    },
    get isSofted() {
      if (hasSqUpg(9)) return false
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
      if (hasSqUpg(9)) debuff = E(1)
      debuff = debuff.add(E(10).pow(player.sqrt.points.div("1e400").log10().mul(0.0075).max(0).root(tmp.sqrt.SoftRoot)))
      let buff = E(1)
      buff = buff.mul(tmp.square.effect)
      if((hasSqUpg(1) && player.chal != 5)) buff = buff.mul(sq_upgs[0].effect)
      if(player.sqrt.galaxies.gte(6)) buff = buff.mul(player.sqrt.galaxies)
      if(player.square.chals.includes(1) && player.points.gte(1e10)) buff = buff.mul(player.points.slog(10))
      if(player.square.chals.includes(2) && (player.sqrt.points.lt(Number.MAX_VALUE) || (hasSqUpg(7) && player.chal != 5))) buff = buff.mul(player.dims[8][4].add(10).log10())
      if(hasSqChal(4)) buff = buff.mul(Math.PI)
      return mult.root(debuff).pow(buff).min(this.maxRepSpeed)
    },
    get galaxyEffect() {
      if((player.chal == 4 || player.chal == 5)) return E(0)
      let div = E(200)
      if(hasSqChal(4)) div = div.div(tmp.sqrt.fullCostRoot)
      let eff = player.sqrt.points.log10().div(div).min(player.sqrt.galaxies.mul(1 / 2))
      if((player.chal == 2 || player.chal == 5)) eff = eff.mul(0.2)
      if(player.square.chals.includes(2)) eff = eff.mul(1.2)
      return eff
    },
    get fullCostRoot() {
      let root = E(1)
      if(player.square.chals.includes(3)) root = root.mul(1 / 0.9)
      root = root.mul(tmp.pmp.Bab3eff)
      return root
    },
    get SoftRoot() {
      let eff = E(1)
      if (hasSqUpg(9)) eff = eff.mul(1.25)
      eff = eff.mul(tmp.pmp.tPeff)
      return eff
    },
    get maxRepSpeed() {
      let cap = E(1e40)
      if (hasSqUpg(13)) cap = cap.pow(5)
      if (hasSqUpg(14)) cap = cap.pow(10)
      return cap
    }
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
    if(hasSqUpg(2)) a = E(1).sub(a.mul(E(1).sub(sq_upgs[1].effect)))
    return a.min(1)
  },
  pointsToDims(dim) {
    let costPow = E(1)
    if(player.square.chals.includes(1)) costPow = costPow.mul(0.8)
    var x = player.points.root(costPow).overflow(tmp.dimsSoftStart1, tmp.dimsSoftPower1)
    let final = x.log10().div(dim)
    if(player.isSetCappedDim) final = final.min(player.dims[dim][4].add(player.limitBuyDimNumber.div(10)))
    let a = Math.min(player.sqrt.galaxies.toNumber(), 6)
    if(player.chal == 5 && (a < dim)) final = final.min(tmp.square.chal1cap).max(0.1)
    if(player.chal == 1 && dim == 8) final = final.min(tmp.square.chal1cap).max(0.1)
    return final
  },
  square: {
    get gain() {
      return player.points.div("1e485").root(300).div(10).pow(tmp.pmp.Bab2eff).overflow("1e800",0.9).floor()
    },
    get effect() {
      let eff = player.square.total.add(1).logBase(2).add(1)
      if(hasSqChal(5)) eff = eff.pow(2)
      return eff
    },
    get chal1cap() {
      return E(10).mul(E(0.99).pow(player.square.resetTime))
    }
  },
  hasSuperScalDim(dim) {
    return player.dims[dim][1].gte(Number.MAX_VALUE)
  },
  get ptgain() {
    let gain = player.dims[1][5].mul(player.dims[1][2])
    if((player.chal == 3 || player.chal == 5)) {
      let debuff = E(1)
      let galaxybought = player.sqrt.galaxies.sub(1)
      let alldimbought = player.dims[1][4].add(player.dims[2][4]).add(player.dims[3][4]).add(player.dims[4][4]).add(player.dims[5][4]).add(player.dims[6][4]).add(player.dims[7][4]).add(player.dims[8][4]).div(10)
      let rec0_9 = E(1 / 0.9)
      debuff = debuff.mul(rec0_9.pow(galaxybought))
      if(player.chal == 5) debuff = debuff.mul(rec0_9.pow(galaxybought.pow(5)))
      debuff = debuff.mul(E(1.7).pow(alldimbought.add(1).log10()))
      gain = gain.root(debuff)
      for(let i = 2; i <= 8; i++) {
        gain = gain.mul(E(i).pow(player.dims[i][4]))
      }
    }
    if(hasSqUpg(8)) {
      if(player.chal != 0) gain = gain.pow(1.16)
      else gain = gain.pow(1.08)
    }
    if(player.chal == 5) gain = gain.mul(E(2).pow(player.sqrt.galaxies))
    gain = gain.overflow("ee5",0.5)
    return gain
  },
  pmp: {
    get squareCost() {
      return E(10).pow(E(32).mul(E(1.2).add(E(0.2).mul(player.pmp.fromsquare)).pow(2)))
    },
    get pointCost() {
      return E(10).pow(E(1e4).mul(E(1.2).add(E(0.2).mul(player.pmp.frompoints)).pow(2)))
    },
    get sqrtCost() {
      return E(10).pow(E(10).pow(E(10).add(E(0.3).mul(player.pmp.fromsqrt)).div(3)))
    },
    get totalpts() {
      let a = player.pmp.fromsquare
      let b = player.pmp.frompoints
      let c = player.pmp.fromsqrt
      if (hasSqUpg(13)) b = b.mul(2)
      return a.add(b).add(c)
    },
    get tPgain() {
      let gain = E(3).add(tmp.pmp.Bab1eff).pow(tmp.pmp.totalpts).sub(1)
      if (hasSqUpg(10)) gain = gain.mul(sq_upgs[9].effect)
      return gain
    },
    get tPeff() {
      return player.pmp.transPoint.add(10).log10().pow(0.2)
    },
    get tCrysNextGoal() {
      return E(1e6).pow(player.pmp.transCrystal.add(1))
    },
    get spentCrystal() {
      return player.pmp.buyables[1].mul(hasSqUpg(11)?0 : 1).add(player.pmp.buyables[2].mul(hasSqUpg(12)?0 : 1)).add(player.pmp.buyables[3].mul(hasSqUpg(12)?0 : 1))
    },
    get realCrystal() {
      return player.pmp.transCrystal.sub(this.spentCrystal)
    },
    get Bab1eff() {
      return player.pmp.buyables[1].mul(2)
    },
    get Bab2eff() {
      return E(0.1).mul(player.pmp.buyables[2]).add(1)
    },
    get Bab3eff() {
      return E(1/0.9).pow(player.pmp.buyables[3])
    },
  },
}