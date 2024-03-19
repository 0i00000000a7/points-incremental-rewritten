function loop() {
  updateLastUpdateTime()
  updateRealDim()
  updateDimDatas()
  updatePoints()
}

function updateRealDim() {
  for(i = 1; i <= 8; i++) {
    player.dims[i].real = player.dims[i].amount.add(player.dims[i].bought.mul(10))
  }
}

function updateDimDatas() {
  for(i = 1; i <= 7; i++) {
    player.dims[i].amount = player.dims[i].amount.add(player.dims[i + 1].real.mul(player.dims[i + 1].mult).div(30))
  }
  for(i = 1; i <= 8; i++) {
    player.dims[i].cost = player.dims[i].basecost.pow(player.dims[i].bought.add(1))
  }
  for(i = 1; i <= 8; i++) {
    player.dims[i].mult = player.singleDMult.pow(player.dims[i].bought)
  }
}

function buydim(dim) {
  if(player.points.gte(player.dims[dim].cost)) {
    player.dims[dim].bought = player.dims[dim].bought.add(1)
    player.points = player.points.sub(player.dims[dim].cost)
  }
}

function updatePoints() {
  player.ptgain = player.dims[1].real.mul(player.dims[1].mult)
  player.points = player.points.add(player.ptgain.div(30))
}

function buyall() {
  for(i = 1; i <= 8; i++) buydim(i)
}

function updateLastUpdateTime() {
  player.lastUpdated = Date.now()
}

setInterval(loop, 1000 / 30)