Vue.component("achievements",{
  template: `<div>
    <table>
      <tr v-for="achRow in achievements">
        <td v-for="achievement in achRow">
          <div :class="getAchClass(String(achRow.id)+achievement.id)" align="center">
            <span style="height: 70px;" v-html="achievement.title"></span>
            <div class="tooltip" v-html="achievement.tooltip()"></div>
          </div>
        </td>
      </tr>
    </table>
  </div>`,
})
function hasAch(id) {
  return player.achievements.includes(id)
}
function getAch(id) {
  if (hasAch(id)) return
  player.achievements.push(id)
}
const achievements = [
  [
    {title: "双倍给下一个人", goal: "通过购买最大一次性购买2次第一维度", reward: "第一维度生产+2%" },
    {title: "暴涨期?", goal: "让点数生产超过你的点数12秒" },
    {title: "暴跌期......", get goal() { return (player.sqrt.galaxies.gte(1))? "让某个维度至少13秒购买维度后所获得的数量<10" : "让某个维度至少13秒买不起" } },
    {title: "8项维度测试总评：A+", goal: "所有维度的倍率>100", reward: "所有维度获得一个<u><i><b>超高</b></i></u>的加成" },
    {title: "半条命：维度破坏", goal: "得到100√点数" },
    {title: "<span style='font-size: 10px'>普通百分比，对数百分比，双对数百分比:)</span>", goal: "得到<del>5e99</del> <del>1e50</del>1e10√点数", reward: "达到1e10,1e50,5e99点数时，√点数复制速度分别×1.06" },
    {title: "星系偏差", goal: "在一次√星系重置后至少购买1~8维各一个", reward: "每个√星系使所有维度倍率+17%" },
    {title: "散装无限<sup>1.5</sup>", goal: "获得1.8e308点数和1.8e308√点数" },
  ],
  [
    {title: "2<sup>2</sup>点数<sup>2</sup>", goal: "达到4点数<sup>2</sup>", reward: "第一维度生产+40%" },
    {title: "悖论202：点数<sup>2</sup><点数<sup>2</sup>", goal: "让你的点数数量的平方小于点数<sup>2</sup>" },
    {title: "模拟真实", goal: "在10秒内通关SC1"},
    {title: "See you again", goal: "获得824个第八维度"},
    {title: "停滞不前", goal: "在SC5中获得3个√星系"},
    {title: "组成方式多样", goal: "分别进行一次因式分解、同底相乘、四次乘方"},
    {title: "大数据错了!", goal: "5秒内点数增长至原来的1.0e27,272倍，且点数不能为0"},
    {title: "您可以完成3.5次?!?!", goal: "在SC4中，同时让点数，√点数，点数<sup>2</sup>达到目标"},
  ],
]
let totalachievements = 0
for (let i in achievements) {
  achievements[i].id = parseInt(i)+1
  for (let ii in achievements[i]) {
    achievements[i][ii].id = parseInt(ii)+1
    achievements[i][ii].tooltip = function () {
      let tooltip = `要求：${this.goal}`
      if (this.reward) tooltip += `<br>奖励：${this.reward}`
      if (this.effectDisplay) tooltip += `<br>当前：${this.effectDisplay}`
      return tooltip
    }
  }
  totalachievements += achievements[i].length
}
let achData = {
  ach13timer: Array(8).fill(0)
}
function updateAch() {
  if (tmp.ptgain.gt(player.points)) player.ach12time += 1/30
  else player.ach12time = 0
  if (player.ach12time >= 12) getAch(12)
  let ach14cancomplete = true
  let ach17cancomplete = true
  for (let i = 1;i <= 8;i++) {
    if (tmp.pointsToDims(i).sub(player.dims[i][4]).lt(1)) {
      achData.ach13timer[i-1] += 1/30
      if (achData.ach13timer[i-1] > 13) getAch(13)
    } else {
      achData.ach13timer[i-1] = 0
    }
    if (player.dims[i][2].gte(100) && ach14cancomplete) ach14cancomplete = true
    else ach14cancomplete = false
    if (player.dims[i][4].gte(1) && ach17cancomplete && player.sqrt.galaxies.gte(1)) ach14cancomplete = true
    else ach17cancomplete = false
  }
  if (ach14cancomplete) getAch(14)
  if (player.sqrt.points.gte(100)) getAch(15)
  if (player.sqrt.points.gte(1e10)) getAch(16)
  if (ach17cancomplete) getAch(17)
  if (player.sqrt.points.gte(Number.MAX_VALUE) && player.points.gte(Number.MAX_VALUE)) getAch(18)
  if (player.square.points.gte(4)) getAch(21)
  if (player.points.pow(2).lt(player.square.points)) getAch(22)
  if (player.dims[8][5].gte(824)) getAch(24)
  if (player.points.neq(0)) {
    (function() {
      let a = player.points
      setTimeout(function() {
        if (player.points.div(a).gte("e27272")) getAch(27)
      },5000)
    })()
  }
  if (player.pmp.fromsquare.gte(1) && player.pmp.fromsqrt.gte(1) && player.pmp.frompoints.gte(1)) getAch(26)
  if (player.chal == 5 && player.sqrt.galaxies.gte(3)) getAch(25)
  if (player.chal == 4 && player.sqrt.points.gte(E(2).pow(1024*4)) && player.square.points.gte(E(2).pow(1024*4)) && player.points.gte(E(2).pow(1024*4))) getAch(28)
}