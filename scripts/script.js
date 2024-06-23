(function() {  
  function loop() {  
    updateLastUpdateTime();  
    updateRealDim();  
    updateDimDatas();  
    updatePoints();  
    checkUnlocks();  
    replicateSqrtPoints();  
    updateSquare();  
    autoBuy();  
    detectTimerHooker();  
    updateChal();  
    updateResetTime();  
  }  
  
  document.addEventListener('DOMContentLoaded', function(event) {  
    window.loopVal = setInterval(loop, 1000 / 30); 
  });  
})();

function updateRealDim() {
  for(i = 1; i <= 8; i++) {
    player.dims[i][5] = player.dims[i][3].add(player.dims[i][4].mul(10))
    if (player.chal == 1 && i<=7) player.dims[i][5] = player.dims[i][5].min(player.dims[i+1][5].pow(2))
  }
}

function updateDimDatas() {
  for(i = 1; i <= 7; i++) {
    if (player.chal != 2) player.dims[i][3] = player.dims[i][3].add(player.dims[i + 1][5].mul(player.dims[i + 1][2]).div(30))
    else {
      if (i<7) player.dims[i][3] = player.dims[i][3].add(player.dims[i + 1][5].mul(player.dims[i + 2][2]).div(30))
      else player.dims[i][3] = player.dims[i][3].add(player.dims[i + 1][5].div(30))
    }
  }
  for(i = 1; i <= 8; i++) {
    player.dims[i][1] = player.dims[i][0].pow(player.dims[i][4].add(1))
  }
  for(i = 1; i <= 8; i++) {
    player.dims[i][2] = player.singleDMult.pow(player.dims[i][4]).mul(tmp.sqrt.dim_eff)
    if (player.square.chals.includes(2)) player.dims[i][2].mul(tmp.sqrt.dim_eff.pow(i*0.1))
    if (hasSqUpg(5) && i<=5) player.dims[i][2].mul(tmp.sqrt.dim_eff.pow(sq_upgs[4].effect))
    if (player.square.chals.includes(1) && i<8 && player.dims[i+1][2].gte(1024)) player.dims[i][2] = player.dims[i][2].mul(player.dims[i+1][2].logBase(2))
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
  if (player.chal == 3) {
    let debuff = E(1)
    let galaxybought = player.sqrt.galaxies.sub(1)
    let alldimbought = player.dims[1][4].add(player.dims[2][4]).add(player.dims[3][4]).add(player.dims[4][4]).add(player.dims[5][4]).add(player.dims[6][4]).add(player.dims[7][4]).add(player.dims[8][4]).div(10)
    let rec0_9 = E(1.11111111111111111111111)
    debuff = debuff.mul(rec0_9.pow(galaxybought))
    debuff = debuff.mul(E(1.696).pow(alldimbought.add(1).log10()))
    player.ptgain = player.ptgain.root(debuff)
    for (let i=2;i<=8;i++) {
      player.ptgain = player.ptgain.mul(E(i).pow(player.dims[i][4]))
    }
  }
  player.points = player.points.add(player.ptgain.div(30))
  if (player.chal == 1) player.points = player.points.min(player.sqrt.points.pow(2))
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

function autoBuy() {
  for(let i = 1; i <= 8; i++) {
    if(player.autodims[i - 1]) buyMaxDim(i)
  }
  if (player.autogalaxy) galaxy()
}

function detectTimerHooker() {
  if(document.getElementsByClassName("_th-container")[0] != void 0) {
    clearInterval(saveVal)
    clearInterval(loopVal)
    showNotify("请先关闭宁的计时器掌控者")
  }
}

function capPoints() {
  if (player.points.gt(E(10).expansion(1e40))) player.points = E(10).expansion(1e40)
}

function changeNewsTickerShown() {
  if (player.options.showNewsTicker) player.options.showNewsTicker = false
  else player.options.showNewsTicker = true
}
function updateResetTime() {
  player.square.resetTime = player.square.resetTime.add(1/30)
}
const Endgame = E("1e4400")
function isEndgame() {
  return player.points.gte(Endgame)
}