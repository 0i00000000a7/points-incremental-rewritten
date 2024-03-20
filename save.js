var dims = [null]
function setup_dims() {
  for (let i = 1;i <= 8;i++) {
    let this_dim = [E(10).pow(i),//basecost
    E(10).pow(i),//cost
    E(1),//mult
    E(0),//amount
    E(0),//bought
    E(0),//real
    ]
    dims.push(this_dim)
  }
}
function hard_reset() {
  player = {
    points: E(10),
    currentPage: 1,
    singleDMult: E(2),
    ptgain: E(0),
    lastUpdated: Date.now(),
  }
  setup_dims()
  player.dims = dims
}
function transformToE(object) {
    for (let key in object) {
        if (typeof object[key] === "string" && !new E(object[key]).isNaN()) {
            object[key] = new E(object[key]);
        }
        if (typeof object[key] === "object") {
            transformToE(object[key]);
        }
    }
}

function save() {
	localStorage.setItem("pts-inc-rew", formatsave.encode(player))
}

function load() {
	hard_reset();
	let loadplayer = localStorage.getItem("pts-inc-rew");
	if (loadplayer != null) {
	  let loadplayer = formatsave.decode(localStorage.getItem("pts-inc-rew"));
		transformToE(loadplayer);
		player = Object.assign(player, loadplayer)
		console.clear()
	}
}

function hasSqUpg(upg) {
  if (player.square.upgrades[upg]) {
    return true
  } else {
    return false
  }
}
function hasP1_5Upg(upg) {
  if (player.P1_5.upgrades[upg]) {
    return true
  } else {
    return false
  }
}

function export_copy() {
  return navigator.clipboard.writeText(formatsave.encode(player))
}
function export_file() {
  let str = formatsave.encode(player)
  let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Points Incremental Save - "+getCurrentBeijingTime()+".txt"
    a.click()
}

function getCurrentBeijingTime() {  
    const now = new Date();  
    const utcYear = now.getUTCFullYear();  
    const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');  
    const utcDate = String(now.getUTCDate()).padStart(2, '0');  
    const utcHours = now.getUTCHours();  
    const utcMinutes = now.getUTCMinutes();  
    const utcSeconds = now.getUTCSeconds();  
    const utcMilliseconds = now.getUTCMilliseconds();  
    let beijingHours = (utcHours + 8) % 24;
    if (beijingHours < 0) {  
        now.setUTCDate(now.getUTCDate() + 1);
        beijingHours += 24;  
    }  
      
    const beijingTime = `${utcYear}-${utcMonth}-${utcDate} ${beijingHours.toString().padStart(2, '0')}:${utcMinutes.toString().padStart(2, '0')}:${utcSeconds.toString().padStart(2, '0')}.${utcMilliseconds.toString().padStart(3, '0')}`;  
    return beijingTime;  
}

function import_save() {
  save = prompt('请输入您的存档');
  importing_player = formatsave.decode(save)
  transformToE(importing_player);
  Object.assign(player, importing_player)
  console.clear()
}

function formated_hard_reset() {
  prompt_text = `您确定要硬重置吗？输入1进行第一次确认，此操作无法取消!`
  let promption = prompt(prompt_text);
  if(promption === "1") {
    prompt_text = `您确定要硬重置吗？输入2进行第二次确认，此操作无法取消!`
    let promption = prompt(prompt_text);
    if(promption === "2") {
      prompt_text = `您确定要硬重置吗？输入3进行最后一次确认，此操作无法取消!`
      let promption = prompt(prompt_text);
      if(promption === "3") {
        hard_reset()
      }
    }
  }
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
      Object.assign(player, importing_player)
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
  steps: [
    { encode: JSON.stringify, decode: JSON.parse },
    { encode: x => formatsave.encoder.encode(x), decode: x => formatsave.decoder.decode(x) },
    { encode: x => pako.deflate(x), decode: x => pako.inflate(x) },
    {
      encode: x => Array.from(x).map(i => String.fromCharCode(i)).join(""),
      decode: x => Uint8Array.from(Array.from(x).map(i => i.charCodeAt(0)))
    },
    { encode: x => btoa(x), decode: x => atob(x) },
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

function uncheat() {
	if (Math.random() > 0.618033988749894848) console.error('检测到您正在作弊，请立即停止该行为!')
	if (Math.random() > 0.5) console.warn('检测到您正在作弊，请立即停止该行为!')
	if (Math.random() > Math.random()) console.count('检测到您正在作弊，请立即停止该行为!')
	if (Math.random() > 0.707106781186547524) console.log('检测到您正在作弊，请立即停止该行为!')
	if (Math.random() > 0.4704470831553269) console.debug('检测到您正在作弊，请立即停止该行为!')
	if (Math.random() > 1/3) console.info('检测到您正在作弊，请立即停止该行为!')
}

setInterval(save, 10)
setInterval(uncheat)
