function changeTextContent(id, str) {
  document.getElementById(id).textContent = str
}

function changeHTML(id, str) {
  document.getElementById(id).innerHTML = str
}

function updateDisplay() {
  changeHTML('pts', getPointDisplay())
  formatDims()
  updateTitle()
  format_page(1)
  format_page(2)
  format_page(3)
  format_subpage('option_subtabs', 2, 3)
  formatEndgame()
}

function getPointDisplay() {
  if(player.points.lt('ee6')) return '你有<div class="pts-dis">' + formatWhole(player.points) + '</div>点数'
  else return '<div class="pts-dis">' + formatWhole(player.points) + '</div>'
}

function formatDim(dim) {
  amount = 'd' + dim + '-amount'
  mult = 'd' + dim + '-mult'
  button = 'd' + dim + '-button'
  changeTextContent(amount, formatWhole(player.dims[dim].real))
  changeTextContent(mult, '×' + format(player.dims[dim].mult))
  changeTextContent(button, '价格：' + formatWhole(player.dims[dim].cost))
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
  document.title = '点数增量重制版：' + formatWhole(player.points) + ' 点数'
}

function switchpage(page) {
  player.currentPage = page
}

function format_page(page) {
  let pagename = "page" + page
  if(player.currentPage != page) {
    document.getElementById(pagename).style.display = 'none'
  } else {
    document.getElementById(pagename).style.display = 'block'
  }
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
  const endgameText = "当前Endgame：" + colorText('h3', x, '1.000e80') + " 点数"
  changeHTML('endgame', endgameText)
}

setInterval(updateDisplay, 30)