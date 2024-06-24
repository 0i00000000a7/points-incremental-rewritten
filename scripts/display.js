function getPointDisplay() {
  if(player.points.lt('ee6')) return '你有<div class="pts-dis">' + formatWhole(player.points) + '</div>点数'
  else return '<div class="pts-dis">' + formatWhole(player.points) + '</div>'
}

function getPointGain() {
  return '你正在每秒获取 ' + formatGain(player.points,tmp.ptgain," 点数")
}

function getDimCostDisplay(dim) {
  return (tmp.canBuyDim(dim)) ? '价格：' + formatWhole(player.dims[dim][1]) : '已达硬上限'
}

function getMaxBtnText(dim) {
  let a
  if(player.autodims[dim - 1]) a = `购买次数：${format(player.dims[dim][4])}`
  else if(player.sqrt.galaxies.gte(1)) a = `购买次数：${format(player.dims[dim][4])} ➜ ${format(tmp.pointsToDims(dim))}`
  else a = "最大"
  return a
}

function updateTitle() {
  document.title = '点数增量重制版：' + formatWhole(player.points) + ' 点数'
}

function switchpage(page) {
  player.currentPage = page
}

function convertToB16(n) {
  let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  let x = n % 16
  return codes[(n - x) / 16] + codes[x]
}

function getUndulatingColor(period = Math.sqrt(760)) {
  let t = new Date().getTime()
  let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 0)
  let b = Math.sin(t / 1e3 / period * 2 * Math.PI + 2)
  let c = Math.sin(t / 1e3 / period * 2 * Math.PI + 4)
  a = convertToB16(Math.floor(a * 128) + 128)
  b = convertToB16(Math.floor(b * 128) + 128)
  c = convertToB16(Math.floor(c * 128) + 128)
  return "#" + String(a) + String(b) + String(c)
}

function colorText(elem, color, text) {
  return "<" + elem + " style='color:" + color + ";text-shadow:0px 0px 10px;'>" + text + "</" + elem + ">"
}


function formatEndgame() {
  const x = getUndulatingColor()
  const endgameText = "当前Endgame：" + colorText('h3', x, Endgame.format()) + " 点数"
  return endgameText
}
var notify = document.getElementById('notify');
// 显示通知框  
function showNotify(str) {
  notify.classList.remove('hide');
  notify.innerHTML = str
}
// 隐藏通知框  
function hideNotify() {
  notify.classList.add('hide');
}

function addNotify(str) {
  showNotify(str)
  setTimeout(function() {
    hideNotify()
  }, 1000)
}

function addAnimation(name, duration) {
  document.body.style.animation = `${name} ${duration}s 1`;
  setTimeout(() => {
    document.body.style.animation = "";
  }, duration * 1000);
}

function getGalRewardText() {
  const x = player.sqrt.galaxies;
  if(player.sqrt.galaxies.gte(galaxy_rewards[galaxy_rewards.length - 1].req)) return ""
  for(let i = galaxy_rewards.length - 1; i >= 0; i--) {
    if(x.gte(galaxy_rewards[i].req)) {
      return i > 1 ? `在${formatWhole(galaxy_rewards[i+1].req)}星系，` + galaxy_rewards[i + 1].desc : "";
    }
  }
  return `在${formatWhole(galaxy_rewards[0].req)}星系，` + galaxy_rewards[0].desc;
}

function getHotkeyText() {
  let hotkey = "快捷键："
  hotkey += "按1~8可最大对应的维度，"
  hotkey += "按shift+1~8可购买一次对应的维度，"
  hotkey += "按m可全部购买最大，"
  hotkey += "按g可进行星系重置，"
  if(player.sqrt.galaxies.gte(3) || player.square.unl) hotkey += "按s可进行平方重置"
  return hotkey
}

function get_pts_volume(x) {
  const meter_cubed = 2.368725399190357385e104
  if(x.gte("1e785")) return `如果你每秒写3个数字，那么把你的点数写下来需要${formatTime.fromSeconds(x.log10().floor().add(1).div(3))}`
  if(x.gte(Number.MAX_VALUE)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(Number.MAX_VALUE).format()}个无限`
  if(x.gte(meter_cubed * 1e113)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1e113).format()}个维度`
  if(x.gte(meter_cubed * 3.4e80)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*3.4e80).format()}个可观测宇宙`
  if(x.gte(meter_cubed * 1e73)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1e73).format()}个玉夫座空洞`
  if(x.gte(meter_cubed * 5e68)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e68).format()}个本星系团`
  if(x.gte(meter_cubed * 3.3e61)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*3.3e61).format()}个星系`
  if(x.gte(meter_cubed * 3.3e55)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*3.3e55).format()}个本地泡`
  if(x.gte(meter_cubed * 1.7e48)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.7e48).format()}个奥尔特云`
  if(x.gte(meter_cubed * 1.7e45)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.7e45).format()}个星云`
  if(x.gte(meter_cubed * 8e36)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*8e36).format()}个超巨星`
  if(x.gte(meter_cubed * 5e32)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e32).format()}个红巨星`
  if(x.gte(meter_cubed * 1.41e27)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.41e27).format()}个太阳`
  if(x.gte(meter_cubed * 1.53e24)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.53e24).format()}个木星`
  if(x.gte(meter_cubed * 1.08e21)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.08e21).format()}个地球`
  if(x.gte(meter_cubed * 4.5e17)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*4.5e17).format()}个矮行星`
  if(x.gte(meter_cubed * 5e12)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e12).format()}个大型小行星`
  if(x.gte(meter_cubed * 3.3e8)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*3.3e8).format()}座万里长城`
  if(x.gte(meter_cubed * 2.6006e6)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*2.6006e6).format()}座吉萨大金字塔`
  if(x.gte(meter_cubed * 2.5e3)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*2.5e3).format()}个奥运规模的游泳池`
  if(x.gte(meter_cubed * 1)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*1).format()}个冰箱`
  if(x.gte(meter_cubed * 7.5e-4)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*7.5e-4).format()}个酒瓶`
  if(x.gte(meter_cubed * 3.555e-6)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*3.555e-6).format()}个茶匙`
  if(x.gte(meter_cubed * 5e8)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e8).format()}粒米`
  if(x.gte(meter_cubed * 6.2e-11)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*6.2e-11).format()}粒沙子`
  if(x.gte(meter_cubed * 9e-17)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*9e-17).format()}个红细胞`
  if(x.gte(meter_cubed * 5e-21)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e-21).format()}个病毒`
  if(x.gte(meter_cubed * 7.23e-30)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*7.23e-30).format()}个氢原子`
  if(x.gte(meter_cubed * 1e-42)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1e-42).format()}个原子核`
  if(x.gte(meter_cubed * 2.82e-45)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*2.82e-45).format()}个质子`
  if(x.gte(meter_cubed * 1e-54)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-54).format()}立方阿米`
  if(x.gte(meter_cubed * 1e-63)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-63).format()}立方仄米`
  if(x.gte(meter_cubed * 1e-72)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-72).format()}立方幺米`
  if(x.gte(meter_cubed * 1e-81)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-81).format()}立方柔米`
  if(x.gte(meter_cubed * 1e-90)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-90).format()}立方亏米`
  return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${formatWhole(x)}个普朗克单位`
}

function get_sq_upg_text() {
  if(app.hover_upg == 0) return
  return `<span class="sky">[平方升级${app.hover_upg}]${app.squpgs2[app.hover_upg-1].desc}</span><br>价格：${app.squpgs2[app.hover_upg-1].cost.format(0)}点数<sup>2</sup>` + (typeof(app.squpgs2[app.hover_upg - 1].effectDisplay) == "undefined" ? "" : `<br><span class="green">当前：${app.squpgs2[app.hover_upg-1].effectDisplay}</span>`)
}
function get_sq_chal_text() {
  if(app.choosed_chal == 0) return
  return `<button class="btn" onclick="${player.chal == app.choosed_chal? (player.points.gte(sq_chal[app.choosed_chal-1].goal)? "completeChal()" : "exitChal()") : "enterChal(app.choosed_chal)"}">${player.chal == app.choosed_chal? (player.points.gte(sq_chal[app.choosed_chal-1].goal)? "完成" : "退出") : "进入"}挑战</button><h4>${sq_chal[app.choosed_chal-1].title}</h4><span style="color: red">${sq_chal[app.choosed_chal-1].desc}</span><br>价格：${sq_chal[app.choosed_chal-1].goal.format()}点数<br><span class="green">${sq_chal[app.choosed_chal-1].reward}</span>`
}
tabshow = {
  main: {
    get inTab() {
      return [1,4].includes(player.currentPage)
    },
    dimensions: {
      get inTab() {
        return player.currentPage == 1
      },
      get unlocked() {
        return [1,4].includes(player.currentPage)
      },
    },
    sqrt: {
      get inTab() {
        return player.currentPage == 4
      },
      get unlocked() {
        return [1,4].includes(player.currentPage)
      },
    },
  },
  resets: {
    get inTab() {
      return [5].includes(player.currentPage)
    },
    get unlocked() {
      return player.square.unl || player.sqrt.galaxies.gte(3)
    },
  },
  square: {
    get inTab() {
      return [7].includes(player.currentPage)
    },
    get unlocked() {
      return player.square.unl
    },
    upgrades: {
      get inTab() {
        return player.currentPage == 7
      },
      get unlocked() {
        return [7,8].includes(player.currentPage)
      },
    },
    challenges: {
      get inTab() {
        return player.currentPage == 8
      },
      get unlocked() {
        return [7,8].includes(player.currentPage) && hasSqUpg(4)
      },
    },
  },
  stats: {
    get inTab() {
      return [6].includes(player.currentPage)
    },
  },
  options: {
    get inTab() {
      return [2,3].includes(player.currentPage)
    },
    options: {
      get inTab() {
        return player.currentPage == 2
      },
      get unlocked() {
        return [2,3].includes(player.currentPage)
      },
    },
    about: {
      get inTab() {
        return player.currentPage == 3
      },
      get unlocked() {
        return [2,3].includes(player.currentPage)
      },
    },
  },
}

function getDimAutoText(dim) {
  return player.autodims[dim-1]? "开" : "关"
}

function newsTickerShownButtonText() {
  if (player.options.showNewsTicker) return "关闭新闻"
  return "开启新闻"
}

function getSqUpgClassName(id) {
  let upgradeClassName = 'sq_upg';
  if(hasSqUpg(id)) {
    upgradeClassName += '_bought';
  }
  if(player.square.points.gte(app.squpgs2[id - 1].cost) && !hasSqUpg(id)) {
    upgradeClassName += '_buyable';
  }
  return upgradeClassName
}
function getSqChalClassName(id) {
  return player.chal == id? 'inchal' : (player.square.chals.includes(id)? 'chalcomp' : 'chal')
}
function getAutoGalStatus() {
  if (player.autogalaxy) return "开"
  return "关"
}