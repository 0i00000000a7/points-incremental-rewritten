isGalaxyAnimating = false

function changeTextContent(id, str) {
  $(`#${id}`).text(str)
}

function changeHTML(id, str) {
  $(`#${id}`).html(str)
}

function updateDisplay() {
  formatDims()
  updateTitle()
  format_page(1)
  format_page(2)
  format_page(3)
  format_page(4)
  format_page(5)
  format_subpage('option_subtabs', 2, 3)
  format_subpage('main_subtabs', 1, 4)
  format_page_button('main', 1, 4)
  format_page_button('options', 2, 3)
  format_page_button('dimensions', 1)
  format_page_button('options2', 2)
  format_page_button('about', 3)
  format_page_button('sqrt', 4)
  format_page_button('resets', 5)
  formatEndgame()
  update_sqrt()
  format_cap()
  update_square()
  changeHTML('pts', getPointDisplay())
  changeHTML('hotkeys', getHotkeyText())
  changeHTML('pts-getting', '你正在每秒获取 ' + formatWhole(window[map + 1].player.ptgain) + ' 点数')
}

function getPointDisplay() {
  if(window[map + 1].player.points.lt('ee6')) return '你有<div class="pts-dis">' + formatWhole(window[map + 1].player.points) + '</div>点数'
  else return '<div class="pts-dis">' + formatWhole(window[map + 1].player.points) + '</div>'
}

function formatDim(dim) {
  let amount = 'd' + dim + '-amount'
  let mult = 'd' + dim + '-mult'
  let button = 'd' + dim + '-button'
  let maxbutton = 'd' + dim + '-max-button'
  let autobutton = 'd' + dim + '-auto-button'
  changeTextContent(amount, formatWhole(window[map + 1].player.dims[dim][5]))
  changeTextContent(mult, '×' + format(window[map + 1].player.dims[dim][2]))
  this.costDisplay = (tmp.canBuyDim(dim)) ? '价格：' + formatWhole(window[map + 1].player.dims[dim][1]) : '已达硬上限'
  changeTextContent(button, costDisplay)
  changeTextContent(autobutton, `自动：${window[map+1].player.autodims[dim-1]? "开" : "关"}`)
  if((window[map + 1].player.points.gte(window[map + 1].player.dims[dim][1]) && tmp.canBuyDim(dim)) || window[map + 1].player.sqrt.galaxies.gte(1)) {
    document.getElementById(button).disabled = false
    document.getElementById(maxbutton).disabled = false
  } else {
    document.getElementById(button).disabled = true
    document.getElementById(maxbutton).disabled = true
  }
  if(window[map + 1].player.sqrt.galaxies.lt(1)) {
    document.getElementById(button).style.display = 'inline-block'
  } else {
    document.getElementById(button).style.display = 'none'
    changeTextContent(maxbutton, `购买次数：${format(window[map+1].player.dims[dim][4])} ➜ ${format(tmp.pointsToDims(dim))}`)
  }
  if(window[map + 1].player.canautodim) {
    document.getElementById(autobutton).style.display = 'inline-block'
  } else {
    document.getElementById(autobutton).style.display = 'none'
  }
}

function formatDims() {
  formatDim(1)
  formatDim(2)
  formatDim(3)
  formatDim(4)
  formatDim(5)
  formatDim(6)
  formatDim(7)
  formatDim(8)
}

function updateTitle() {
  document.title = '点数增量重制版：' + formatWhole(window[map + 1].player.points) + ' 点数'
}

function switchpage(page) {
  if(!isGalaxyAnimating) window[map + 1].player.currentPage = page
}

function format_page(page) {
  let pagename = "page" + page
  if(window[map + 1].player.currentPage != page) {
    document.getElementById(pagename).style.display = 'none'
  } else {
    document.getElementById(pagename).style.display = 'block'
  }
}

function format_subpage(elementId, ...pageIds) {
  var element = document.getElementById(elementId);
  if(element) {
    for(let pageId of pageIds) {
      if(window[map + 1].player.currentPage === pageId) {
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
  changeHTML('endgame', endgameText)
}

function update_sqrt() {
  changeTextContent('sqrt_pts', format(window[map + 1].player.sqrt.points))
  changeTextContent('sqrt_eff', format(tmp.sqrt.dim_eff))
  changeTextContent('sqrt_gain', format(tmp.sqrt.replicatePerTick.log10().mul(30)))
  changeTextContent('cap_or_soft', tmp.sqrt.isCapped ? '硬' : '软')
  changeTextContent('galCost', format(tmp.sqrt.galCost))
  changeTextContent('galaxies', formatWhole(window[map + 1].player.sqrt.galaxies))
  changeHTML('gal-eff', getGalRewardText())
  changeTextContent('gal_eff1', tmp.sqrt.galaxyEffect.format(3))
  if(!window[map + 1].player.sqrt.unl) {
    document.getElementById('sqrt_require-tooltip').style.display = 'block'
    document.getElementById('sqrt_full_gain').style.display = 'none'
  } else {
    document.getElementById('sqrt_require-tooltip').style.display = 'none'
    document.getElementById('sqrt_full_gain').style.display = 'block'
  }
}

function format_cap() {
  if(tmp.sqrt.isSofted) document.getElementById('replicant_hardcap').style.display = 'block'
  else document.getElementById('replicant_hardcap').style.display = 'none'
}
// 显示通知框  
function showNotify(str) {
  changeTextContent('notify', str)
  $("#notify").removeClass("hide");
}
// 隐藏通知框  
function hideNotify() {
  $("#notify").addClass("hide");
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
  if(pageIds.includes(window[map + 1].player.currentPage)) {
    document.getElementById(elementId).disabled = true
  } else {
    document.getElementById(elementId).disabled = false
  }
}

function getGalRewardText() {
  const x = window[map + 1].player.sqrt.galaxies
  if(x.gte(galaxy_rewards[galaxy_rewards.length - 1].req)) return ""
  if(x.gte(galaxy_rewards[1].req)) return `在${formatWhole(galaxy_rewards[2].req)}星系，` + galaxy_rewards[2].desc
  if(x.gte(galaxy_rewards[0].req)) return `在${formatWhole(galaxy_rewards[1].req)}星系，` + galaxy_rewards[1].desc
  return `在${formatWhole(galaxy_rewards[0].req)}星系，` + galaxy_rewards[0].desc
}

function update_square() {
  if(window[map + 1].player.square.unl || window[map + 1].player.sqrt.galaxies.gte(3)) document.getElementById('resets').style.display = ''
  else document.getElementById('resets').style.display = 'none'
}

function getHotkeyText() {
  let hotkey = "快捷键："
  hotkey += "按1~8可最大对应的维度"
  hotkey += "按shift+1~8可购买一次对应的维度"
  hotkey += "按m可全部购买最大"
  hotkey += "按g可进行星系重置"
  if(window[map + 1].player.sqrt.galaxies.gte(3) || window[map + 1].player.square.unl) hotkey += "按s可进行平方重置"
  return hotkey
}