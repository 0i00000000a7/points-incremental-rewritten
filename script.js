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
}

function buydim(dim) {
  if(window[map+1].player.points.gte(window[map+1].player.dims[dim][1]) && tmp.canBuyDim(dim)) {
    window[map+1].player.dims[dim][4] = window[map+1].player.dims[dim][4].add(1)
    window[map+1].player.points = window[map+1].player.points.sub(window[map+1].player.dims[dim][1])
  }
}
function buyMaxDim(dim) {
  var x = window[map+1].player.points
  if (x.gt(E(2).pow(1024))) x = E(2).pow(1024)
  if(x.gte(window[map+1].player.dims[dim][1])) {
    window[map+1].player.dims[dim][4] = x.log10().div(dim).floor()
    x = x.sub(window[map+1].player.dims[dim][0].pow(x.log10().div(dim).floor()))
  }
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

function replicateSqrtPoints() {
  this.debuff = window[map+1].player.sqrt.points.div(1e100).log10().mul(0.15).add(1).max(1)
  const mult = E(1).add(E(0.25).mul(window[map+1].player.points.add(1).log10().div(80).max(1))).pow(1/30).root(debuff)
  if (window[map+1].player.sqrt.unl) window[map+1].player.sqrt.points = window[map+1].player.sqrt.points.mul(mult)
  if (window[map+1].player.sqrt.points.gt(1e100)) window[map+1].player.sqrt.points = E(1e100)
}

function galaxy() {
  var text_code = prompt('请输入测试代码')
  if (text_code == '') {
    alert('测试代码不能为空!')
    return
  }
  if (text_code == null) {
    return
  }
  if (text_code != 'Nice opinion, but there\'s just one more problem with it: Who asked? Like genuinely who asked. Who gave you talking stick? I\'ll tell you nobody did. Nobody asked you. There are 0 people who asked among us. Look! I invited everyone who asked through this party. Ayo, group photo of everyone who asked. Yo, check it out. It\'s a bus full of everyone who asked. You know what, man? I\'ll do you a favor. Clearly, we can\'t see who asked. So I\'m just gonna do it myself. I\'m gonna find out who asked. Sailing the seven seas to find out who asked. Yo, I literally found the one piece before I found who asked. I literally climed the top of Mount Everest and didn\'t find who asked. Keep searching boys, we gotta find who asked! I just infiltrated the largest satellite dish in the world and I still can\'t locate who asked. I literally found the cure to cancer before I found who asked. I\'m on maximum render distance and I still can\'t find who asked. I witnessed the collapse of human society resulting from a global nuclear war and now live in the grave of this broken world ravaged by radiation for years on the end before I found who asked. I visited every single planet in No Man\'s Sky and still didn\'t find who asked. Doctor Strange literally looked through fourteen million different timelines and not in one of them did anyone ask. I literally searched through every single backroom level and didn\'t find who asked. I literally died and went to heaven and god himself didn\'t know who asked. Leaving the Earth atomosphere to expand the range of our search. Yo, I literally found extra-terrestrial life on Mars before I found who asked. I have achieved intergalacitc travel before I found who asked. I just found a Dyson Sphere before I found who asked. I found the edge of the universe before I found who asked. I literally visited every single planet in the entire universe before I found who asked. I am literally witnessing the death of almost every star around me before I found who asked. The light of universe is slowly fading. I have searched across galaxies leaving no stone unturned yet. I am afraid my time in this universe is finally running outn It\'s a shame really. I\'ve witnessed stars being birthed and those same stars dying. I\'ve seen literally everything. There is to see in this beautiful universe yet this whole time.I \'ve been caught up with such a pretty task instead of enjoying my time while it lasted. I was distracted from the beauty of it. I don\'t regret what I\'ve done through this question started it all. Who asked has finally been answered. I\'ve searched every nook and cranny in this entire universe and can now cofidently say better than anybody. That truly nobody asked.') {
    alert('代码错误')
    return
  }
  console.log(6)
  if (window[map+1].player.points.gte(tmp.sqrt.galCost)) {
    window[map+1].player.dims = dims
    window[map+1].player.points = E(10)
    window[map+1].player.sqrt.points = E(1)
    window[map+1].player.sqrt.galaxies = window[map+1].player.sqrt.galaxies.add(1)
  }
}
