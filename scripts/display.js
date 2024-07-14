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
  let b = Math.min(player.sqrt.galaxies.toNumber(), 6)
  if ((player.chal == 1 && dim == 8) || (player.chal == 5 && b < dim)) a += `/${tmp.square.chal1cap.format()}`
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
  hotkey += "按1~8可最大对应的维度"
  hotkey += "，按shift+1~8可购买一次对应的维度"
  hotkey += "，按m可全部购买最大"
  hotkey += "，按g可进行星系重置"
  if(player.sqrt.galaxies.gte(3) || player.square.unl) hotkey += "，按s可进行平方重置"
  return hotkey
}

function get_pts_volume(x) {
  const meter_cubed = 2.3687253991903575e104
  if(x.gte("ee9")) return "大神啊！你的点数已经可以制造1个多元宇宙了！"
  if(x.gte("1e785")) return `如果你每秒写3个数字，那么把你的点数写下来需要${formatTime.fromSeconds(x.log10().floor().add(1).div(3))}`
  if(x.gte(Number.MAX_VALUE)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(Number.MAX_VALUE).format()}个无限`
  const prefixes = [
    { value: 1e113, name: "维度", verb: "制造" },
    { value: 3.4e80, name: "可观测宇宙", verb: "制造" },
    { value: 1e73, name: "玉夫座空洞", verb: "制造" },
    { value: 5e68, name: "本星系团", verb: "制造" },
    { value: 3.3e61, name: "星系", verb: "制造" },
    { value: 3.3e55, name: "本地泡", verb: "制造" },
    { value: 1.7e48, name: "奥尔特云", verb: "制造" },
    { value: 1.7e45, name: "星云", verb: "制造" },
    { value: 8e36, name: "超巨星", verb: "制造" },
    { value: 5e32, name: "红巨星", verb: "制造" },
    { value: 1.41e27, name: "太阳", verb: "制造" },
    { value: 1.53e24, name: "木星", verb: "制造" },
    { value: 1.08e21, name: "地球", verb: "制造" },
    { value: 4.5e17, name: "矮行星", verb: "制造" },
    { value: 5e12, name: "大型小行星", verb: "制造" },
    { value: 3.3e8, name: "万里长城", verb: "填满" },
    { value: 2.6006e6, name: "吉萨大金字塔", verb: "填满" },
    { value: 2.5e3, name: "奥运规模的游泳池", verb: "填满" },
    { value: 1, name: "冰箱", verb: "填满" },
    { value: 7.5e-4, name: "酒瓶", verb: "填满" },
    { value: 3.555e-6, name: "茶匙", verb: "填满" },
    { value: 5e-8, name: "米", verb: "制造" },
    { value: 6.2e-11, name: "沙子", verb: "制造" },
    { value: 9e-17, name: "红细胞", verb: "制造" },
    { value: 5e-21, name: "病毒", verb: "制造" },
    { value: 7.23e-30, name: "氢原子", verb: "制造" },
    { value: 1e-42, name: "原子核", verb: "制造" },
    { value: 2.82e-45, name: "质子", verb: "制造" },
    { value: 1e-54, name: "立方阿米", verb: "占据" },
    { value: 1e-63, name: "立方仄米", verb: "占据" },
    { value: 1e-72, name: "立方幺米", verb: "占据" },
    { value: 1e-81, name: "立方柔米", verb: "占据" },
    { value: 1e-90, name: "立方亏米", verb: "占据" },
  ]
  for (let prefix of prefixes) {
    if (x.gte(prefix.value * meter_cubed)) {
      return `如果你的每个点数占据一个普朗克单位，你的点数足以${prefix.verb}${x.div(prefix.value * meter_cubed).format()}个${prefix.name}`
    }
  }
  return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${formatWhole(x)}个普朗克单位`
}

function get_sq_upg_text() {
  if(app.hover_upg == 0) return
  let a =  `<span class="sky">[平方升级${app.hover_upg}]${app.squpgs2[app.hover_upg-1].desc}</span><br>价格：${app.squpgs2[app.hover_upg-1].cost.format(0)}点数<sup>2</sup>` + (typeof(app.squpgs2[app.hover_upg - 1].effectDisplay) == "undefined" ? "" : `<br><span class="green">当前：${app.squpgs2[app.hover_upg-1].effectDisplay}</span>`)
  if (player.chal == 5) {
    if (typeof (sq_upgs[app.hover_upg-1].disableInChal5) == "boolean") a = "<del>" + a + "</del>"
  }
  return a
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
        return [1,4,11].includes(player.currentPage)
      },
    },
    sqrt: {
      get inTab() {
        return player.currentPage == 4
      },
      get unlocked() {
        return [1,4,11].includes(player.currentPage)
      },
    },
    offline: {
      get inTab() {
        return player.currentPage == 11
      },
      get unlocked() {
        return [1,4,11].includes(player.currentPage)
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
      return [7,8,9].includes(player.currentPage)
    },
    get unlocked() {
      return player.square.unl
    },
    upgrades: {
      get inTab() {
        return player.currentPage == 7
      },
      get unlocked() {
        return [7,8,9].includes(player.currentPage)
      },
    },
    challenges: {
      get inTab() {
        return player.currentPage == 8
      },
      get unlocked() {
        return [7,8,9].includes(player.currentPage) && hasSqUpg(4)
      },
    },
    pmp: {
      get inTab() {
        return [9].includes(player.currentPage)
      },
      get unlocked() {
        return [7,8,9].includes(player.currentPage) && hasSqChal(5)
      },
      left: {
        get inTab() {
          return player.currentPage == 9
        },
        get unlocked() {
          return [9].includes(player.currentPage)
        }
      },
      multply: {
        get inTab() {
          return player.currentPage == 10
        },
        get unlocked() {
          return [9].includes(player.currentPage)
        }
      },
      right: {
        get inTab() {
          return player.currentPage == 11
        },
        get unlocked() {
          return [9].includes(player.currentPage)
        }
      },
    },
  },
  stats: {
    get inTab() {
      return [6,10].includes(player.currentPage)
    },
    stats: {
      get inTab() {
        return [6].includes(player.currentPage)
      },
      get unlocked() {
        return [6,10].includes(player.currentPage)
      }
    },
    achievement: {
      get inTab() {
        return [10].includes(player.currentPage)
      },
      get unlocked() {
        return [6,10].includes(player.currentPage)
      }
    }
  },
  others: {
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
  get showTheSecondLine() {
    return [1,2,3,4,6,7,8,9,10,11].includes(player.currentPage)
  }
}

function getDimAutoText(dim) {
  return player.autodims[dim-1]? "开" : "关"
}

function newsTickerShownButtonText() {
  if (player.options.showNewsTicker) return "关闭新闻"
  return "开启新闻"
}
function hotkeyShownButtonText() {
  if (player.options.hotkey) return "关闭快捷键"
  return "开启快捷键"
}

function getSqUpgClassName(id) {
  let upgradeClassName = 'sq_upg';
  if(hasSqUpg(id)) {
    upgradeClassName += '_bought';
  }
  if(player.square.points.gte(app.squpgs2[id - 1].cost) && !hasSqUpg(id)) {
    upgradeClassName += '_buyable';
  }
  if (player.chal == 5) {
    if (typeof (sq_upgs[id-1].disableInChal5) == "boolean") upgradeClassName = "sq_upg_disabled"
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
function getSqrtPClass() {
  let a = "sqrtP"
  if (hasSqUpg(3)) a += " sqrtP_lv1"
  if (hasSqUpg(7)) a += " sqrtP_lv2"
  return a
}
function calculateRotationAngle(t = 5) {
  const n = 1e3 * t, a = Date.now() % n / n;
  return 10 * Math.sin(2 * Math.PI * a)
}
function getChalReward() {
  return "奖励："+sq_chal[choosed_chal-1].reward
}
function get_sq_chal_text() {
  if(window.choosed_chal == 0) return ""
  return `<button class="btn" onclick="${player.chal == window.choosed_chal? (player.points.gte(sq_chal[window.choosed_chal-1].goal)? "completeChal()" : "exitChal()") : "enterChal(window.choosed_chal)"}">${player.chal == window.choosed_chal? (player.points.gte(sq_chal[window.choosed_chal-1].goal)? "完成" : "退出") : "进入"}挑战</button><h4>${sq_chal[window.choosed_chal-1].title}</h4><span style="color: red">${sq_chal[window.choosed_chal-1].desc}</span><br>价格：${sq_chal[window.choosed_chal-1].goal.format()}点数<br><span class="green">${sq_chal[window.choosed_chal-1].reward}</span>`
}
function updateTitle() {
  document.title = `点数增量重制版 - ${player.points.format(0)}点数`
  requestAnimationFrame(updateTitle)
}
function getAchClass(ach) {
  let name = "achi tooltipBox"
  ach = parseInt(ach)
  if (hasAch(ach)) name += " unlocked"
  return name
}
function getGalButtonText() {
  return `获得一个星系<br>但重置之前的一切<br>${getGalRewardText()}<br>要求：${format(tmp.sqrt.galCost) }√点数`
}