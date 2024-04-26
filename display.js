function changeTextContent(id, str) {
  document.getElementById(id).textContent = str
}

function changeHTML(id, str) {
  document.getElementById(id).innerHTML = str
}

function updateDisplay() {
  formatDims()
  updateTitle()
  format_page(1)
  format_page(2)
  format_page(3)
  format_page(4)
  format_subpage('option_subtabs', 2, 3)
  format_subpage('main_subtabs', 1, 4)
  formatEndgame()
  formatAuthorProgress()
  update_sqrt()
  format_cap()
  
  
  changeHTML('pts', getPointDisplay())
  changeTextContent('coming_soon', wordShift(8))
  changeHTML('pts-getting', '你正在每秒获取 '+formatWhole(window[map+1].player.ptgain)+' 点数')
}

function getPointDisplay() {
  if(window[map+1].player.points.lt('ee6')) return '你有<div class="pts-dis">' + formatWhole(window[map+1].player.points) + '</div>点数'
  else return '<div class="pts-dis">' + formatWhole(window[map+1].player.points) + '</div>'
}

function formatDim(dim) {
  amount = 'd' + dim + '-amount'
  mult = 'd' + dim + '-mult'
  button = 'd' + dim + '-button'
  maxbutton = 'd' + dim + '-max-button'
  changeTextContent(amount, formatWhole(window[map+1].player.dims[dim][5]))
  changeTextContent(mult, '×' + format(window[map+1].player.dims[dim][2]))
  this.costDisplay = (tmp.canBuyDim(dim))? '价格：' + formatWhole(window[map+1].player.dims[dim][1]) : '已达硬上限'
  changeTextContent(button, costDisplay)
  if (window[map+1].player.points.gte(window[map+1].player.dims[dim][1]) && tmp.canBuyDim(dim)) {
      document.getElementById(button).disabled = false
      document.getElementById(maxbutton).disabled = false
  }
  else {
    document.getElementById(button).disabled = true
    document.getElementById(maxbutton).disabled = true
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
  document.title = '点数增量重制版：' + formatWhole(window[map+1].player.points) + ' 点数'
}

function switchpage(page) {
  window[map+1].player.currentPage = page
}

function format_page(page) {
  let pagename = "page" + page
  if(window[map+1].player.currentPage != page) {
    document.getElementById(pagename).style.display = 'none'
  } else {
    document.getElementById(pagename).style.display = 'block'
  }
}

function format_subpage(elementId, ...pageIds) {
  var element = document.getElementById(elementId);
  if(element) {
    for(let pageId of pageIds) {
      if(window[map+1].player.currentPage === pageId) {
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
  let codes = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
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
  const endgameText = "当前Endgame：" + colorText('h3', x, '1.000e225') + " 点数"
  changeHTML('endgame', endgameText)
}
function formatAuthorProgress() {
  const x = getUndulatingColor()
  const endgameText = "作者进度：" + colorText('h3', x, '1.798e308') + " 点数，你能超过作者吗?"
  changeHTML('author-progress', endgameText)
}

function update_sqrt() {
  changeHTML('sqrt_pts', format(window[map+1].player.sqrt.points))
  changeHTML('sqrt_eff', format(tmp.sqrt.dim_eff))
  changeHTML('galCost', format(tmp.sqrt.galCost))
  if (!window[map+1].player.sqrt.unl) document.getElementById('sqrt_require-tooltip').style.display = 'block'
  else document.getElementById('sqrt_require-tooltip').style.display = 'none'
}

function format_cap() {
  if (tmp.sqrt.isCapped) document.getElementById('replicant_hardcap').style.display = 'block'
  else document.getElementById('replicant_hardcap').style.display = 'none'
}
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
  setTimeout(function(){
    hideNotify()
  },1000)
}