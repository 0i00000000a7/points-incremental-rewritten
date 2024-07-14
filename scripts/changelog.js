const changelog = [
  {
    version: "0.2.8",
    changes: [
      "添加离线进度"
    ]
  },
  {
    version: "0.2.7.2",
    changes: [
      "修复了新闻中的Incremental Data Rewritten缩写可能引发歧义的bug",
      "修复了<spoiler>√星系</spoiler>奖励未正确隐藏的bug",
      "修复了<spoiler>√星系</spoiler>提示显示不正常的bug",
      "添加了点击查看剧透内容的提示",
    ]
  },
  {
    version: "0.2.7.1",
    changes: [
      "削弱<spoiler>√星系</spoiler>阶段的时间墙",
    ]
  },
  {
    version: "0.2.7",
    changes: [
      "添加16个<spoiler>成就</spoiler>",
    ]
  },
  {
    version: "0.2.6.1",
    changes: [
      "修改一些显示",
    ]
  },
  {
    version: "0.2.6",
    changes: [
      "添加5个<spoiler>平方升级</spoiler>",
    ]
  },
  {
    version: "0.2.5",
    changes: [
      "添加<spoiler>点数×点数</spoiler>",
      "添加<spoiler>超越点数</spoiler>",
      "添加<spoiler>超越之晶</spoiler>",
      "添加1个<spoiler>平方升级</spoiler>",
    ]
  },
  {
    version: "0.2.4.7",
    changes: [
      "完善<spoiler>平方升级9</spoiler>",
    ]
  },
  {
    version: "0.2.4.6",
    changes: [
      "修改一些样式",
    ]
  },
  {
    version: "0.2.4.5",
    changes: [
      "修改<spoiler>平方挑战5</spoiler>奖励",
    ]
  },
  {
    version: "0.2.4.4",
    changes: [
      "修复一个<spoiler>平方挑战</spoiler>bug",
    ]
  },
  {
    version: "0.2.4.3",
    changes: [
      "修复硬重置bug",
    ]
  },
  {
    version: "0.2.4.2",
    changes: [
      "添加关闭快捷键的功能",
    ]
  },
  {
    version: "0.2.4.1",
    changes: [
      "修复bug",
    ]
  },
  {
    version: "0.2.4",
    changes: [
      "添加一个<spoiler>平方挑战</spoiler>",
      "添加一个<spoiler>平方升级</spoiler>",
    ]
  },
  {
    version: "0.2.3.4",
    changes: [
      "修改一些数值",
    ]
  },
  {
    version: "0.2.3.3",
    changes: [
      "修复手机双击后会放大的bug",
    ]
  },
  {
    version: "0.2.3.2",
    changes: [
      "修复<spoiler>平方升级</spoiler>和新闻的显示bug",
    ]
  },
  {
    version: "0.2.3.1",
    changes: [
      "修复<spoiler>点数</spoiler>获取显示的bug",
    ]
  },
  {
    version: "0.2.3",
    changes: [
      "添加一个<spoiler>平方挑战</spoiler>",
      "添加三个<spoiler>平方升级</spoiler>",
    ]
  },
  {
    version: "0.2.2",
    changes: [
      "添加一个<spoiler>平方挑战</spoiler>",
    ]
  },
  {
    version: "0.2.1.1",
    changes: [
      "重新平衡<spoiler>平方挑战1</spoiler>",
    ]
  },
  {
    version: "0.2.1",
    changes: [
      "添加<spoiler>一个平方挑战</spoiler>",
    ]
  },
  {
    version: "0.2.0.2",
    changes: [
      "修复查看<spoiler>平方</spoiler>升级内容时升级会偏移的bug",
    ]
  },
  {
    version: "0.2.0.1",
    changes: [
      "修复电脑无法查看<spoiler>平方</spoiler>升级内容的bug",
    ]
  },
  {
    version: "0.2",
    changes: [
      "添加<spoiler>平方</spoiler>重置",
      "添加4个升级",
    ]
  },
  {
    version: "0.1.5",
    changes: [
      "使用vue.js重构游戏界面",
    ]
  },
  {
    version: "0.1.4.1",
    changes: [
      "修复部分三叠纪时期的手机无法导出至剪贴板的bug",
      "修改部分样式",
    ]
  },
  {
    version: "0.1.4",
    changes: [
      "添加<spoiler>快捷键</spoiler>",
    ]
  },
  {
    version: "0.1.3.1",
    changes: [
      "修复<spoiler>星系</spoiler>不重置维度的bug",
    ]
  },
  {
    version: "0.1.3",
    changes: [
      "修改<spoiler>星系</spoiler>增益公式",
    ]
  },
  {
    version: "0.1.2.1",
    changes: [
      "完善<spoiler>自动购买维度</spoiler>逻辑",
    ]
  },
  {
    version: "0.1.2",
    changes: [
      "添加<spoiler>星系</spoiler>重置",
    ]
  },
  {
    version: "0.1.1",
    changes: [
      "添加<spoiler>维度</spoiler>的最大购买按钮",
      "添加<spoiler>√点数</spoiler>软上限",
      "修改<spoiler>星系</spoiler>重置按钮",
      "添加游戏加载提示",
      "修复了计时器掌控者等恶意脚本可以干扰游戏运行的bug",
    ]
  },
  {
    version: "0.1",
    changes: [
      "添加<spoiler>√点数</spoiler>",
    ]
  },
  {
    version: "0.0",
    changes: [
      "添加<spoiler>维度1~8</spoiler>",
    ]
  },
]
Vue.component("changelog", {
  template: `
    <div>
      <div v-for="(log, index) in changelog" :key="index">
        <h3>v{{ log.version }}</h3>
          <li v-for="(change, changeIndex) in log.changes" :key="changeIndex" v-html="change"></li>
      </div>
    </div>
  `
})