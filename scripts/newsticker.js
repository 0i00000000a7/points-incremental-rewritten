var textslength
var texts = [
  {
    text: '为什么没有第九维度?',
  },
  {
    text: '距离下一次更新只有5小时了！',
  },
  {
    get text() {
      return `你有${(1/textslength*100).toFixed(2)}%的概率看到这条新闻`
    }
  },
  {
    get text() {
      return `本游戏共有${textslength}条滚动新闻`
    }
  },
  {
    text: '什么?你问我维度提升在哪里?在历史的垃圾堆里'
  },
  {
    text: '你制造了一个点数！你知道这意味着什么吗?'
  },
  {
    text: "| '0'''''1'''''2'''''2.7'''''3.1'''''3.4'''''3.6'''''3.75'''''3.85'''''3.95'''''4 | 是的，这是一把尺子，但<span class='soft'>(受软上限限制)</span>"
  },
  {
    text: "到底要不要购买最大，这是一个问题"
  },
  {
    text: `玩序数增量玩的 ————eferygrt`
  },
  {
    text: `不会还有人认为${BigInt(2)**BigInt(1024)}是无限吧`
  },
  {
    text: `新闻播放顺序完全随机，你可能会一次看到两个一样的新闻`
  },
  {
    text: `这条新闻是由第一新闻维度生产的`
  },
  {
    text: `如何评价 ————eferygrt`
  },
  {
    text: `这个游戏没有任何错误，它们是另类的成功`
  },
  {
    text: `<a href="https://b23.tv/BV1GJ411x7h7" target="_blank">点我立即到达Endgame</a>`
  },
  {
    text: `大型纪录片《质量增量重制版 0.8天价虫洞卖出了1024 archverses》给他一个时间速度加成，他敢把价格卖到<del>114514 lodeverses</del>114514 archs-metaverse. 近日有网友表示，在某增量游戏新闻播放器上看到一则重要到有时间旅行者提醒的新闻，由于虫洞质量不断扩大，粒子物理学研究员Pollux和粒子超理学研究员天才俱乐部#83黑塔通过虫洞在反物质宇宙相遇，物理学家建议创造更大的虫洞。某一数学家兼物理学家利用伽罗瓦理论庞加莱猜想的庞加莱回归定理和伽马函数算出了天价虫洞已经来到了1024 archverses，不过我们还是不知道他们两个是怎么掉进这么大的虫洞的，可能是被自动幽灵一脚踢进虫洞。据研究员Pollux报告，他先前由于某个由于机密不能披露的异常影响导致视觉能力严重下降，来到反物质宇宙后因为反物质的时间效应迅速恢复，他表示以后天体物理学研究要加紧研究虫洞。为此五星上将麦克阿瑟表示，要是我有这么大的虫洞，我当年的军衔一定不止五星，至少也得有50星，就连SCP-CN-1630都表示，这43年来，我天天被人注射记忆删除药剂，没得睡过一次好觉，要是我有这么大的虫洞一定得进去放个C类通道，然后在里面睡一觉，不仅可以体验相对论时间膨胀，还可以带薪休假。大型纪录片之《质量增量重制版 0.8天价虫洞卖出了1024 archverses》持续为您播放`
  },
  {
    text: `0+0是宇宙万法的那个源头`
  },
  {
    text: `削一下维度提升，谢谢`
  },
  {
    text: `点击此新闻后什么也不会发生`
  },
  {
    get text() {
      return `${format(player.points)}点数?弱爆了`
    }
  },
  {
    text: '你看到这条新闻的概率是其它新闻的概率的1%',
    get unlocked() {
      return (Math.random() < 0.01)
    }
  },
  {
    text: 'Uncaught CheatError: Cheater\'s mother is not defined'
  },
  {
    text: '点此获取1点数(仅点数获取高于1e25时可用)'
  },
  {
    text: '更新进度：4.99999999小时/5小时'
  },
  {
    text: '错误404：未找到新闻'
  },
  {
    text: '当你看这条新闻时，你就看过这条新闻了'
  },
  {
    text: '这是一条无意义的新闻'
  },
  {
    get text() {
      return `大数据分析显示，您现在拥有${format(player.points)}点数`
    }
  },
  {
    get text() {
      window.clicks = 0
      return `<button onclick='addClicks()' class=\'transparent-button\'>测手速时间到！你能点击此新闻多少次?当前：<span id="sp_new_clicks">${clicks}</span>次</button>`
    }
  },
  {
    text: '请添加这一条新闻'
  },
  {
    text: '什么bug? 这不是特性吗'
  },
  {
    text: '本游戏中的数字全部采用科学计数法，如果有任何问题请拨打电话1.893e10'
  },
  {
    text: '增量的反义词是减魖'
  },
  {
    text: '1+1=3'
  },
  {
    text: "<span style='background: yellow;color: black'>要警惕新黄色新闻</span>"
  },
  {
    text: "16-9，6-9不够，借一当十，16-9"
  },
  {
    text: "最新的break_reality.js已在f<sub>Ω<sub>0</sub></sub>(114514)年发行，可以表示大小为BB(1.798e308)那么大的数字"
  },
  {
    text: "这不是一条非滚动新闻"
  },
  {
    text: "谁问你了?"
  },
  {
    text: "这是本游戏的第40条新闻"
  },
  {
    text: "这一切有什么意义？没有什么意义？没有没什么意义？"
  },
  {
    text: "汉化版打开游戏就能找到句号。"
  },
  {
    text: "你可能注意到，本游戏的表示法在H之后直接跳到了J，这是因为I很容易会被和1混淆"
  },
  {
    text: '游戏有bug怎么办?只有我们把代码删完，就没有bug了'
  },
  {
    text: '可以搞个bug增量'
  },
  {
    text: 'ExpantaNum最大支持10{{1}}9e15那么大的数，本游戏使用了ExpantaNum，那么本游戏的数值上限为10{{1}}1e40也很正常吧'
  },
  {
    text: '这游戏到底还有多少bug'
  },
  {
    text: '如果你翻了代码，你就会发现新闻和提示都没有被vue重写，原因可以首先排除我不会'
  },
  {
    text: '这个超级折算也太离谱了',
    get unlocked() {return player.total.gte(Number.MAX_VALUE)}
  },
  {
    text: `| '0'''''1'''''2'''''3'''''4'''''4'''''4'''''4'''''4'''''4'''''4 | 是的，这也是一把尺子，但<span class="soft">(受硬上限限制)</soft>`
  },
  {
    text: '史上平衡最差的游戏是什么? IMR ————seanxlx',
  },
  {
    text: '反物质是一个谎言',
  },
  {
    text: '1, 2, 3, 4, 跳过一些, NaN!',
  },
  {
    text: '如果你看不了滚动新闻，就说明你把滚动新闻关了',
  },
]
textslength = texts.length
console.log(textslength)
updatenews = function(first=false) {
  if (first) window.e = document.getElementById('newsText');
  do {
    rand = Math.floor(Math.random() * textslength)
  } while(checkRand(rand))
  //rand = 1
  let msg = texts[rand].text;
  e.innerHTML = msg;
  let textWidth = e.clientWidth;
  let parentWidth = e.parentElement.clientWidth;
  e.style.transition = '';
  e.style.transform = 'translateX(' + (parentWidth + 10) + 'px)';
  let dist = parentWidth + e.clientWidth
  let rate = 100;
  let transformDuration = dist / rate;
  e.style.transition = 'transform ' + transformDuration + 's linear';
  e.style.transform = 'translateX(-' + (textWidth) + 'px)';
  setTimeout(updatenews, Math.ceil(transformDuration) * 1000);
}

function addClicks() {
  window.clicks++
  sp_new_clicks.innerHTML = clicks
}

 document.addEventListener('DOMContentLoaded', (event) => {  
    // 你的代码或函数调用  
    setTimeout("updatenews(true)",100);  
});  



function checkRand(rand) {
  if(texts[rand].unlocked === undefined) return false
  else if(texts[rand].unlocked) return false
  else return true
}