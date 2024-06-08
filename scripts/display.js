function getPointDisplay() {
  if(player.points.lt('ee6')) return '你有<div class="pts-dis">' + formatWhole(player.points) + '</div>点数'
  else return '<div class="pts-dis">' + formatWhole(player.points) + '</div>'
}

function getPointGain() {
  return '你正在每秒获取 ' + formatWhole(player.ptgain) + ' 点数'
}


function getDimCostDisplay(dim) {
  return (tmp.canBuyDim(dim)) ? '价格：' + formatWhole(player.dims[dim][1]) : '已达硬上限'
}

function getMaxBtnText(dim) {
  let a
  if (player.autodims[dim-1]) a = `购买次数：${format(player.dims[dim][4])}`
  else if (player.sqrt.galaxies.gte(1)) a = `购买次数：${format(player.dims[dim][4])} ➜ ${format(tmp.pointsToDims(dim))}`
  else a = "最大"
  return a
}

function updateTitle() {
  document.title = '点数增量重制版：' + formatWhole(player.points) + ' 点数'
}

function switchpage(page) {
 player.currentPage = page
}


function format_subpage(elementId, ...pageIds) {
  var element = document.getElementById(elementId);
  if(element) {
    for(let pageId of pageIds) {
      if(player.currentPage === pageId) {
        element.style.display = 'block';
        return;
      }
    }
    element.style.display = 'none';
  } else {
    return
  }
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
  const endgameText = "当前Endgame：" + colorText('h3', x, '1.000e785') + " 点数"
  return endgameText
}

function update_sqrt() {
  changeTextContent('sqrt_pts', format(player.sqrt.points))
  changeTextContent('sqrt_eff', format(tmp.sqrt.dim_eff))
  changeTextContent('sqrt_gain', format(tmp.sqrt.replicatePerTick.log10().mul(30)))
  changeTextContent('cap_or_soft', tmp.sqrt.isCapped ? '硬' : '软')
  changeTextContent('galCost', format(tmp.sqrt.galCost))
  changeTextContent('galaxies', formatWhole(player.sqrt.galaxies))
  changeHTML('gal-eff', getGalRewardText())
  changeTextContent('gal_eff1', tmp.sqrt.galaxyEffect.format(3))
  if(!player.sqrt.unl) {
    document.getElementById('sqrt_require-tooltip').style.display = 'block'
    document.getElementById('sqrt_full_gain').style.display = 'none'
  } else {
    document.getElementById('sqrt_require-tooltip').style.display = 'none'
    document.getElementById('sqrt_full_gain').style.display = 'inline-block'
  }
}

function format_cap() {
  if(tmp.sqrt.isSofted) document.getElementById('replicant_hardcap').style.display = 'block'
  else document.getElementById('replicant_hardcap').style.display = 'none'
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

function format_page_button(elementId, ...pageIds) {
  if(pageIds.includes(player.currentPage)) {
    document.getElementById(elementId).disabled = true
  } else {
    document.getElementById(elementId).disabled = false
  }
}

function getGalRewardText() {
  const x = player.sqrt.galaxies
  if(x.gte(galaxy_rewards[galaxy_rewards.length - 1].req)) return ""
  if(x.gte(galaxy_rewards[1].req)) return `在${formatWhole(galaxy_rewards[2].req)}星系，` + galaxy_rewards[2].desc
  if(x.gte(galaxy_rewards[0].req)) return `在${formatWhole(galaxy_rewards[1].req)}星系，` + galaxy_rewards[1].desc
  return `在${formatWhole(galaxy_rewards[0].req)}星系，` + galaxy_rewards[0].desc
}

function update_square() {
  if(player.square.unl || player.sqrt.galaxies.gte(3)) document.getElementById('resets').style.display = ''
  else document.getElementById('resets').style.display = 'none'
  changeTextContent("sqP_gain", formatWhole(tmp.square.gain))
  changeTextContent("sq_eff", format(tmp.square.effect))
  changeTextContent("current_sqP", formatWhole(player.square.points))
  if (player.square.unl) {
    document.getElementById("sq_display").style.display = ""
    document.getElementById("square").style.display = ""
  } else {
    document.getElementById("sq_display").style.display = "none"
    document.getElementById("square").style.display = "none"
  }
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

function updateStats() {
  changeTextContent("totalpts",formatWhole(player.total))
  changeTextContent("pts_volume", get_pts_volume(player.points))
}

function get_pts_volume(x) {
  const meter_cubed = 2.368725399190357385e104
  if (x.gte("1e785")) return `如果你每秒写3个数字，那么把你的点数写下来需要${formatTime.fromSeconds(x.log10().floor().add(1).div(3))}`
  if (x.gte(Number.MAX_VALUE)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(Number.MAX_VALUE).format()}个无限`
  if (x.gte(meter_cubed*1e113)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1e113).format()}个维度`
  if (x.gte(meter_cubed*3.4e80)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*3.4e80).format()}个可观测宇宙`
  if (x.gte(meter_cubed*1e73)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1e73).format()}个玉夫座空洞`
  if (x.gte(meter_cubed*5e68)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e68).format()}个本星系团`
  if (x.gte(meter_cubed*3.3e61)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*3.3e61).format()}个星系`
  if (x.gte(meter_cubed*3.3e55)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*3.3e55).format()}个本地泡`
  if (x.gte(meter_cubed*1.7e48)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.7e48).format()}个奥尔特云`
  if (x.gte(meter_cubed*1.7e45)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.7e45).format()}个星云`
  if (x.gte(meter_cubed*8e36)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*8e36).format()}个超巨星`
  if (x.gte(meter_cubed*5e32)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e32).format()}个红巨星`
  if (x.gte(meter_cubed*1.41e27)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.41e27).format()}个太阳`
  if (x.gte(meter_cubed*1.53e24)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.53e24).format()}个木星`
  if (x.gte(meter_cubed*1.08e21)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1.08e21).format()}个地球`
  if (x.gte(meter_cubed*4.5e17)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*4.5e17).format()}个矮行星`
  if (x.gte(meter_cubed*5e12)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e12).format()}个大型小行星`
  if (x.gte(meter_cubed*3.3e8)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*3.3e8).format()}座万里长城`
  if (x.gte(meter_cubed*2.6006e6)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*2.6006e6).format()}座吉萨大金字塔`
  if (x.gte(meter_cubed*2.5e3)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*2.5e3).format()}个奥运规模的游泳池`
  if (x.gte(meter_cubed*1)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*1).format()}个冰箱`
  if (x.gte(meter_cubed*7.5e-4)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*7.5e-4).format()}个酒瓶`
  if (x.gte(meter_cubed*3.555e-6)) return `如果你的每个点数占据一个普朗克单位，你的点数足以充满${x.div(meter_cubed*3.555e-6).format()}个茶匙`
  if (x.gte(meter_cubed*5e8)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e8).format()}粒米`
  if (x.gte(meter_cubed*6.2e-11)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*6.2e-11).format()}粒沙子`
  if (x.gte(meter_cubed*9e-17)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*9e-17).format()}个红细胞`
  if (x.gte(meter_cubed*5e-21)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*5e-21).format()}个病毒`
  if (x.gte(meter_cubed*7.23e-30)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*7.23e-30).format()}个氢原子`
  if (x.gte(meter_cubed*1e-42)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*1e-42).format()}个原子核`
  if (x.gte(meter_cubed*2.82e-45)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${x.div(meter_cubed*2.82e-45).format()}个质子`
  if (x.gte(meter_cubed*1e-54)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-54).format()}立方阿米`
  if (x.gte(meter_cubed*1e-63)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-63).format()}立方仄米`
  if (x.gte(meter_cubed*1e-72)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-72).format()}立方幺米`
  if (x.gte(meter_cubed*1e-81)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-81).format()}立方柔米`
  if (x.gte(meter_cubed*1e-90)) return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${x.div(meter_cubed*1e-90).format()}立方亏米`
  return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${formatWhole(x)}个普朗克单位`
}