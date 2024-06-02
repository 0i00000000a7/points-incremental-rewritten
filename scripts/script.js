function loop() {
  updateLastUpdateTime()
  updateRealDim()
  updateDimDatas()
  updatePoints()
  checkUnlocks()
  replicateSqrtPoints()
  updateSquare()
  autoDim()
}

function updateRealDim() {
  for(i = 1; i <= 8; i++) {
    window[map+1].player.dims[i][5] = window[map+1].player.dims[i][3].add(window[map+1].player.dims[i][4].mul(10))
  }
}

function updateDimDatas() {
  for(i = 1; i <= 7; i++) {
    window[map+1].player.dims[i][3] = window[map+1].player.dims[i][3].add(window[map+1].player.dims[i + 1][5].mul(window[map+1].player.dims[i + 1][2]).div(30))
  }
  for(i = 1; i <= 8; i++) {
    window[map+1].player.dims[i][1] = window[map+1].player.dims[i][0].pow(window[map+1].player.dims[i][4].add(1))
  }
  for(i = 1; i <= 8; i++) {
    window[map+1].player.dims[i][2] = window[map+1].player.singleDMult.pow(window[map+1].player.dims[i][4]).mul(tmp.sqrt.dim_eff)
  }
  window[map+1].player.singleDMult = E(2).add(tmp.sqrt.galaxyEffect)
  if (window[map+1].player.sqrt.galaxies.gte(2)) window[map+1].player.canautodim = true
}

function buydim(dim) {
  if(window[map+1].player.points.gte(window[map+1].player.dims[dim][1]) && tmp.canBuyDim(dim)) {
    window[map+1].player.dims[dim][4] = window[map+1].player.dims[dim][4].add(1)
    if (window[map+1].player.sqrt.galaxies.lt(1)) window[map+1].player.points = window[map+1].player.points.sub(window[map+1].player.dims[dim][1])
  }
}
function buyMaxDim(dim) {
  if (window[map+1].player.sqrt.galaxies.gte(1)) {
    buyMaxDimAfterGal1(dim)
    return
  }
  var x = window[map+1].player.points
  if (x.gt(E(2).pow(1024))) x = E(2).pow(1024)
  if(x.gte(window[map+1].player.dims[dim][1])) {
    window[map+1].player.dims[dim][4] = x.log10().div(dim).floor()
    window[map+1].player.points = window[map+1].player.points.sub(window[map+1].player.dims[dim][0].pow(x.log10().div(dim).floor()))
  }
}
function buyMaxDimAfterGal1(dim) {
  window[map+1].player.dims[dim][4] = tmp.pointsToDims(dim)
}
function updatePoints() {
  window[map+1].player.ptgain = window[map+1].player.dims[1][5].mul(window[map+1].player.dims[1][2])
  window[map+1].player.points = window[map+1].player.points.add(window[map+1].player.ptgain.div(30))
}

function buyall() {
  for(i = 1; i <= 8; i++) buyMaxDim(i)
}

function updateLastUpdateTime() {
  window[map+1].player.lastUpdated = Date.now()
}

function checkUnlocks() {
  if (window[map+1].player.points.gte(1e80)) window[map+1].player.sqrt.unl = true
}

function changeAuto(dim) {
  window[map+1].player.autodims[dim-1] = window[map+1].player.autodims[dim-1]? false : true
}

function autoDim() {
  for (let i = 1;i <= 8;i++) {
    if (window[map+1].player.autodims[i-1]) buyMaxDim(i)
  }
}