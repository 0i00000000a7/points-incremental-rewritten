function loop() {
  updateLastUpdateTime()
  updateRealDim()
  updateDimDatas()
  updatePoints()
  checkUnlocks()
  replicateSqrtPoints()
}

function updateRealDim() {
  for(i = 1; i <= 8; i++) {
    player.dims[i][5] = player.dims[i][3].add(player.dims[i][4].mul(10))
  }
}

function updateDimDatas() {
  for(i = 1; i <= 7; i++) {
    player.dims[i][3] = player.dims[i][3].add(player.dims[i + 1][5].mul(player.dims[i + 1][2]).div(30))
  }
  for(i = 1; i <= 8; i++) {
    player.dims[i][1] = player.dims[i][0].pow(player.dims[i][4].add(1))
  }
  for(i = 1; i <= 8; i++) {
    player.dims[i][2] = player.singleDMult.pow(player.dims[i][4]).mul(tmp.sqrt.dim_eff)
  }
}

function buydim(dim) {
  if(player.points.gte(player.dims[dim][1])) {
    player.dims[dim][4] = player.dims[dim][4].add(1)
    player.points = player.points.sub(player.dims[dim][1])
  }
}

function updatePoints() {
  player.ptgain = player.dims[1][5].mul(player.dims[1][2])
  player.points = player.points.add(player.ptgain.div(30))
}

function buyall() {
  for(i = 1; i <= 8; i++) buydim(i)
}

function updateLastUpdateTime() {
  player.lastUpdated = Date.now()
}

function checkUnlocks() {
  if (player.points.gte(1e80)) player.sqrt.unl = true
}

function replicateSqrtPoints() {
  if (player.sqrt.unl) player.sqrt.points = player.sqrt.points.mul(E(1).add(E(0.25).mul(player.points.add(1).log10().div(80).max(1))).pow(1/30))
}

function galaxy() {
  alert('5小时后更新......')
}