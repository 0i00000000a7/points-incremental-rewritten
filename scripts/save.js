hasLoaded = {
  status: false
}
//不是抄AD word-shift.js的
function predictableRandom(x) {
  let start = Math.pow(x % 97, 4.3) * 232344573;
  const a = 15485863;
  const b = 521791;
  start = (start * a) % b;
  for (let i = 0; i < (x * x) % 90 + 90; i++) {
    start = (start * a) % b;
  }
  return start / b;
}

function randomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 50) + 192);
}

const wordShift = {
  wordCycle(list, noBuffer = false) {
    const len = list.length;
    const tick = Math.floor(Date.now() / 250) % (len * 5);
    const mod5 = ((Date.now() / 250) % (len * 5)) % 5;
    const largeTick = Math.floor(tick / 5);
    let v = list[largeTick].text;
    if (mod5 < 0.6) {
      v = this.blendWords(list[(largeTick + list.length - 1) % list.length].text, list[largeTick].text, (mod5 + 0.6) / 1.2);
    } else if (mod5 > 4.4) {
      v = this.blendWords(list[largeTick].text, list[(largeTick + 1) % list.length].text, (mod5 - 4.4) / 1.2);
    }

    v = this.randomCrossWords(v, 0.1 * Math.pow(mod5 - 2.5, 4) - 0.6);
    if (noBuffer) return v;
    const maxWordLen = Math.max(...list.map(x => x.text.length));
    const bufferSpace = (maxWordLen - v.length) / 2;
    return {
      text: v,
      color: mergeColor(list[(largeTick + len - 1) % len].color, list[largeTick].color, mod5)
    }
  },
  randomCrossWords(str, frac = 0.7) {
    if (frac <= 0) return str;
    const x = str.split("");
    for (let i = 0; i < x.length * frac; i++) {
      const randomIndex = Math.floor(predictableRandom(Math.floor(Date.now() / 500) % 964372 + 1.618 * i) * x.length);
      x[randomIndex] = randomSymbol();
    }
    return x.join("");
  },
  blendWords(first, second, param) {
    if (param <= 0) return first;
    if (param >= 1) return second;
    return first.substring(0, first.length * (1 - param)) +
      second.substring(second.length * (1 - param), second.length);
  }
};
// 非抄袭部分结束
class cheatError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CheatError';
  }
}

//[basecost,cost,mult,amount,bought,real]


function hard_reset() {
  player = {
      points: E(10),
      total: E(10),
      best: E(10),
      currentPage: 1,
      singleDMult: E(2),
      dims: [null,
        [E(10),E(10),E(1),E(0),E(0),E(0)],
        [E(100),E(100),E(1),E(0),E(0),E(0)],
        [E(1e3),E(1e3),E(1),E(0),E(0),E(0)],
        [E(1e4),E(1e4),E(1),E(0),E(0),E(0)],
        [E(1e5),E(1e5),E(1),E(0),E(0),E(0)],
        [E(1e6),E(1e6),E(1),E(0),E(0),E(0)],
        [E(1e7),E(1e7),E(1),E(0),E(0),E(0)],
        [E(1e8),E(1e8),E(1),E(0),E(0),E(0)],
      ],
      sqrt: {
        unl: false,
        points: E(1),
        galaxies: E(0),
      },
      square: {
        points: E(0),
        unl: false,
        total: E(0),
        times: E(0),
        best: E(0),
        upgrades: [],
        chals: [],
        resetTime: E(0),
      },
      autodims: Array(8).fill(false),
      canautodim: false,
      chal: 0,
      options: {
        showNewsTicker: true,
        hotkey: true
      },
      limitBuyDimNumber: E(Infinity),
      isSetCappedDim: false,
      autogalaxy: false,
      pmp: {
        fromsquare: E(0), //因式分解
        frompoints: E(0), //同底相乘
        fromsqrt:   E(0), //四次乘方
        transPoint: E(0),
        transCrystal: E(0),
        buyables: [null,E(0),E(0),E(0)],
      },
      achievements: [],
      ach12time: 0,
    }
}

function transformToE(object) {
  for(let key in object) {
    if(typeof object[key] === "string" && !new E(object[key]).isNaN()) {
      object[key] = new E(object[key]);
    }
    if(typeof object[key] === "object") {
      transformToE(object[key]);
    }
  }
}

function save() {
  localStorage.setItem("pts-inc-rew", formatsave.encode(player))
  //debugger
}

function deepCopyProps(source,target) {
  for (let key in source) {  
        if (source.hasOwnProperty(key)) {  
            // 如果源对象的属性是对象或数组，则递归复制  
            if ((typeof source[key] === 'object' && !(source[key] instanceof ExpantaNum)) && source[key] !== null) {  
                // 如果目标对象没有这个属性，或者属性是null，则创建一个新的  
                if (!target.hasOwnProperty(key) || target[key] == null || Array.isArray(source[key]) !== Array.isArray(target[key])) {  
                    target[key] = Array.isArray(source[key]) ? [] : {};  
                }  
                // 递归复制属性  
                deepCopyProps(source[key], target[key]);  
            } else {  
                // 如果属性不是对象或数组，则直接复制  
                target[key] = source[key];  
            }  
        }  
    }  
}

function load() {
  hard_reset();
  let loadplayer = localStorage.getItem("pts-inc-rew");
  if(loadplayer != null) {
    let loadplayer = formatsave.decode(localStorage.getItem("pts-inc-rew"));
    transformToE(loadplayer);
    deepCopyProps(loadplayer, player)
    fixOldSave()
  }
  saveVal = setInterval(save, 1000 / 30)
  //removed: setInterval(uncheat,30)
  console.error(new cheatError('Cheater\'s mother is not defined'))
  loadVue()
  hasLoaded.status = true
  updateTitle()
}

function export_copy() {
  return copyToClipboard(formatsave.encode(player))
}

function export_file() {
  let str = formatsave.encode(player)
  let file = new Blob([str], {
    type: "text/plain"
  })
  window.URL = window.URL || window.webkitURL;
  let a = document.createElement("a")
  a.href = window.URL.createObjectURL(file)
  a.download = "Points Incremental Save - " + getCurrentBeijingTime() + ".txt"
  a.click()
}

function getCurrentBeijingTime() {
  const t = new Date,
    e = t.getUTCFullYear(),
    r = String(t.getUTCMonth() + 1).padStart(2, "0"),
    a = String(t.getUTCDate()).padStart(2, "0"),
    n = t.getUTCHours(),
    g = t.getUTCMinutes(),
    i = t.getUTCSeconds(),
    S = t.getUTCMilliseconds();
  let o = (n + 8) % 24;
  return o < 0 && (t.setUTCDate(t.getUTCDate() + 1), o += 24), `${e}-${r}-${a} ${o.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}.${S.toString().padStart(3,"0")}`
}

function import_save() {
  openPopup(1)
}

function importFromApp() {
  try {
    importing_player = formatsave.decode(app.save)
    transformToE(importing_player);
    deepCopyProps(importing_player, player)
    console.clear()
  } catch(e) {
    addNotify("导入失败")
  } finally {
    app.isShowingPopup = 0
    app.save = ""
  }
}

function formatted_hard_reset() {
  confirms = 3
  for(let i = 1; i < 3; i++) {
    let promption = prompt(`请输入${i}以进行第${i}/${confirms}次确认，此操作无法还原!`)
    if(promption != String(i)) return
  }
  let promption = prompt(`请输入${confirms}以进行最后一次确认，此操作无法还原!`)
  if(promption != String(confirms)) return
  hard_reset()
  save()
  location.reload()
}

function import_file() {
  let a = document.createElement("input")
  a.setAttribute("type", "file")
  a.click()
  a.onchange = () => {
    let fr = new FileReader();
    fr.onload = () => {
      let save = fr.result
      importing_player = formatsave.decode(save)
      transformToE(importing_player);
      deepCopyProps(importing_player, player)
      console.clear()
    }
    fr.readAsText(a.files[0]);
  }
}
var formatsave = {
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  startString: 'PointsIncrementalRewrittenSaveFormat',
  endString: 'EndOfSaveFile',
  steps: [{
      encode: JSON.stringify,
      decode: JSON.parse
    },
    {
      encode: x => formatsave.encoder.encode(x),
      decode: x => formatsave.decoder.decode(x)
    },
    {
      encode: x => pako.deflate(x),
      decode: x => pako.inflate(x)
    },
    {
      encode: x => Array.from(x).map(i => String.fromCharCode(i)).join(""),
      decode: x => Uint8Array.from(Array.from(x).map(i => i.charCodeAt(0)))
    },
    {
      encode: x => btoa(x),
      decode: x => atob(x)
    },
    {
      encode: x => x.replace(/=+$/g, "").replace(/0/g, "0a").replace(/\+/g, "0b").replace(/\//g, "0c"),
      decode: x => x.replace(/0b/g, "+").replace(/0c/g, "/").replace(/0a/g, "0")
    },
    {
      encode: x => formatsave.startString + x + formatsave.endString,
      decode: x => x.slice(formatsave.startString.length, -formatsave.endString.length),
    }
  ],
  encode(s) {
    return this.steps.reduce((x, f) => f.encode(x), s);
  },
  decode(s) {
    return this.steps.reduceRight((x, f) => f.decode(x), s);
  },
}


function fixOldSave() {
  if (player.square.upgrades == void 0) player.square.upgrades = []
  if (player.square.chals == void 0) player.square.chals = []
  if (player.square.resetTime == void 0) player.square.resetTime = E(0)
  if (player.options.hotkey == void 0) player.options.hotkey = true
  if (player.ptgain != void 0) delete player.ptgain
}
document.addEventListener('DOMContentLoaded', () => {
    load();
});

// 复制文本内容方法
function copyToClipboard(textToCopy) {
  if(document.execCommand('copy')) {
    // 创建textarea
    var textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // 使textarea不在viewport，同时设置不可见
    textArea.style.position = "fixed";
    textArea.style.opacity = 0;
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  } else if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    // navigator clipboard 向剪贴板写文本
    return navigator.clipboard.writeText(textToCopy);
  }
  addNotify("复制失败")
}
function copyToFile(str,name) {
  let file = new Blob([str], {
    type: "text/plain"
  })
  window.URL = window.URL || window.webkitURL;
  let a = document.createElement("a")
  a.href = window.URL.createObjectURL(file)
  a.download = name + ".txt"
  a.click()
}