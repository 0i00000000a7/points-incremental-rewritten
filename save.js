function generateRandomString() {
  const characters = 'BCDFGHIJKMNOQSTUVWXZbcdfghijkmnoqstuvwxz';
  let result = '';
  const charactersLength = characters.length;
  for(let i = 0; i < 100; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function wordShift(len) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅĀÆÇÈÉÊËĒÌÍÎÏĪÐÑÒÓÔÕÖŌØŒŠÙÚÛÜŪÝŸÞàáâãäåæçèéêëēìíǐîïīðñòóǒôõöōøœšùúǔûüūýÿþŋ';
  let result = '';
  const charactersLength = characters.length;
  for(let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class cheatError extends Error {  
  constructor(message) {  
    super(message);  
    this.name = 'CheatError';  
  }  
}

var dims = [null]

function setup_dims() {
  for(let i = 1; i <= 8; i++) {
    let this_dim = [E(10).pow(i), //basecost
      E(10).pow(i), //cost
      E(1), //mult
      E(0), //amount
      E(0), //bought
      E(0), //real
    ]
    dims.push(this_dim)
  }
}

function hard_reset() {
  window[map + 1] = {
    player: {
      points: E(10),
      currentPage: 1,
      singleDMult: E(2),
      ptgain: E(0),
      lastUpdated: Date.now(),
      sqrt: {
        unl: false,
        points: E(1),
        galaxies: E(0),
      }
    }
  }
  setup_dims()
  window[map + 1].player.dims = dims
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
  localStorage.setItem("pts-inc-rew", formatsave.encode(window[map + 1].player))
  //debugger
}

function load() {
  window.map = generateRandomString()
  hard_reset();
  let loadplayer = localStorage.getItem("pts-inc-rew");
  if(loadplayer != null) {
    let loadplayer = formatsave.decode(localStorage.getItem("pts-inc-rew"));
    transformToE(loadplayer);
    window[map + 1].player = Object.assign(window[map + 1].player, loadplayer)
    fixOldSave()
  }
  setInterval(save, 10)
  //deleted: setInterval(uncheat,30)
  setInterval(loop, 1000 / 30)
  setInterval(updateDisplay, 30)
  document.getElementById('loader-overlay').style.display = 'none'
  document.getElementById('game').style.display = 'block'
  console.clear()
  throw new cheatError('Cheater\'s mother is not defined')
}

function export_copy() {
  return navigator.clipboard.writeText(formatsave.encode(window[map + 1].player))
}

function export_file() {
  let str = formatsave.encode(window[map + 1].player)
  let file = new Blob([str], {
    type: "text/plain"
  })
  window.URL = window.URL || window.webkitURL;
  let a = document.createElement("a")
  a.href = window.URL.createObjectURL(file)
  a.download = "Points Incremental Save - " + getCurrentBeijingTime() + ".txt"
  a.click()
}

function getCurrentBeijingTime(){const t=new Date,e=t.getUTCFullYear(),r=String(t.getUTCMonth()+1).padStart(2,"0"),a=String(t.getUTCDate()).padStart(2,"0"),n=t.getUTCHours(),g=t.getUTCMinutes(),i=t.getUTCSeconds(),S=t.getUTCMilliseconds();let o=(n+8)%24;return o<0&&(t.setUTCDate(t.getUTCDate()+1),o+=24),`${e}-${r}-${a} ${o.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}.${S.toString().padStart(3,"0")}`}

function import_save() {
  save = prompt('请输入您的存档');
  importing_player = formatsave.decode(save)
  transformToE(importing_player);
  Object.assign(window[map + 1].player, importing_player)
  console.clear()
}

function formated_hard_reset() {
  confirms = 10
  for(let i = 1; i < 3; i++) {
    let promption = prompt(`请输入${i}以进行第${i}/${confirms}次确认，此操作无法还原!`)
    if(promption != String(i)) return
  }
  let promption = prompt(`请输入${confirms}以进行最后一次确认，此操作无法还原!`)
  if(promption != String(confirms)) return
  hard_reset()
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
      Object.assign(window[map + 1].player, importing_player)
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
  //nothing here......
}
document.addEventListener('DOMContentLoaded', function() {
  load()
});