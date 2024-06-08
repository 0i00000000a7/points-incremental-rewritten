function loop() {
  updateLastUpdateTime()
  updateRealDim()
  updateDimDatas()
  updatePoints()
  checkUnlocks()
  replicateSqrtPoints()
  updateSquare()
  autoDim()
  detectTimerHooker()
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
  player.singleDMult = E(2).add(tmp.sqrt.galaxyEffect)
  if(player.sqrt.galaxies.gte(2)) player.canautodim = true
}

function buydim(dim) {
  if(player.sqrt.galaxies.gte(1)) return
  if(player.points.gte(player.dims[dim][1]) && tmp.canBuyDim(dim)) {
    player.dims[dim][4] = player.dims[dim][4].add(1)
    if(player.sqrt.galaxies.lt(1)) player.points = player.points.sub(player.dims[dim][1])
  }
}

function buyMaxDim(dim) {
  if(player.sqrt.galaxies.gte(1)) {
    buyMaxDimAfterGal1(dim)
    return
  }
  var x = player.points
  if(x.gt(E(2).pow(1024))) x = E(2).pow(1024)
  if(x.gte(player.dims[dim][1])) {
    player.dims[dim][4] = x.log10().div(dim).floor()
    player.points = player.points.sub(player.dims[dim][0].pow(x.log10().div(dim).floor()))
  }
}

function buyMaxDimAfterGal1(dim) {
  player.dims[dim][4] = tmp.pointsToDims(dim)
}

function updatePoints() {
  player.ptgain = player.dims[1][5].mul(player.dims[1][2])
  player.points = player.points.add(player.ptgain.div(30))
  player.total = player.total.add(player.ptgain.div(30))
  if (player.best.lt(player.points)) player.best = player.points
}

function buyall() {
  for(i = 1; i <= 8; i++) buyMaxDim(i)
}

function updateLastUpdateTime() {
  player.lastUpdated = Date.now()
}

function checkUnlocks() {
  if(player.points.gte(1e80)) player.sqrt.unl = true
}

function changeAuto(dim) {
  player.autodims[dim - 1] = player.autodims[dim - 1] ? false : true
}

function autoDim() {
  for(let i = 1; i <= 8; i++) {
    if(player.autodims[i - 1]) buyMaxDim(i)
  }
}

function detectTimerHooker() {
  if(document.getElementsByClassName("_th-container")[0] != void 0) {
    clearInterval(saveVal)
    clearInterval(loopVal)
    showNotify("请先关闭宁的计时器掌控者")
  }
}