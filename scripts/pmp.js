function buyPMP(x) {
  switch (x) {
    case 1:
      if (player.square.points.lt(tmp.pmp.squareCost)) return
      player.pmp.fromsquare = player.pmp.fromsquare.add(1)
      player.square.points = E(0)
      break
    case 2:
      if (player.points.lt(tmp.pmp.pointCost)) return
      player.pmp.frompoints = player.pmp.frompoints.add(1)
      player.dims = [null,
        [E(10),E(10),E(1),E(0),E(0),E(0)],
        [E(100),E(100),E(1),E(0),E(0),E(0)],
        [E(1e3),E(1e3),E(1),E(0),E(0),E(0)],
        [E(1e4),E(1e4),E(1),E(0),E(0),E(0)],
        [E(1e5),E(1e5),E(1),E(0),E(0),E(0)],
        [E(1e6),E(1e6),E(1),E(0),E(0),E(0)],
        [E(1e7),E(1e7),E(1),E(0),E(0),E(0)],
        [E(1e8),E(1e8),E(1),E(0),E(0),E(0)],
      ]
      player.points = E(10)
      break
    case 3: 
      if (player.sqrt.points.lt(tmp.pmp.sqrtCost)) return
      player.pmp.fromsqrt = player.pmp.fromsqrt.add(1)
      player.sqrt.points = E(1)
      player.sqrt.galaxies = E(1)
  }
}

function updatePMP() {
  player.pmp.transPoint = player.pmp.transPoint.add(tmp.pmp.tPgain.div(30).mul(player.timeSpeed))
  let ct = player.pmp.transPoint.log10().div(6).floor()
  if (ct.gt(50)) ct = player.pmp.transPoint.logBase(2).logBase(1.024).div(6).floor()
  if (player.pmp.transCrystal.lt(ct)) player.pmp.transCrystal = ct
}

function respecCrysBab() {
  square_reset()
  player.pmp.buyables = [null,E(0),E(0),E(0)]
}

function buyCrysBab(x) {
  if (hasSqUpg(11) && player.pmp.buyables[x].gte(player.pmp.transCrystal) && x == 1) return
  if (hasSqUpg(12) && player.pmp.buyables[x].gte(player.pmp.transCrystal) && x == 2) return
  if (hasSqUpg(12) && player.pmp.buyables[x].gte(player.pmp.transCrystal) && x == 3) return
  if (tmp.pmp.realCrystal.lt(1)) {
    if (hasSqUpg(11) && x == 1) {}
    else if (hasSqUpg(12) && x == 2) {}
    else if (hasSqUpg(12) && x == 3) {}
    else return
  }
  player.pmp.buyables[x] = player.pmp.buyables[x].add(1)
}