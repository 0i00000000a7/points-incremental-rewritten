function loadVue() {
  window.app = new Vue({
    el: "#app",
    data: {
      player: player,
      hasLoaded: hasLoaded,
      dimensions: [
        { id: 1, label: '第一维度' },
        { id: 2, label: '第二维度' },
        { id: 3, label: '第三维度' },
        { id: 4, label: '第四维度' },
        { id: 5, label: '第五维度' },
        { id: 6, label: '第六维度' },
        { id: 7, label: '第七维度' },
        { id: 8, label: '第八维度' },
      ],
      currentPopupText: ``,
      isShowingPopup: 0,
      save: "",
      hover_upg: 0,
      choosed_chal: 0,
      sq_upgs: chunkArrayIntoGroupsOfTen(sq_upgs),
      squpgs2: sq_upgs,
      limitBuy: player.limitBuyDimNumber.toString(),
    },
    computed: {
      
    },  
    methods: {  
    
    },
    watch: {
      limitBuy(num) {
        try {
          let test = E(num)
          if (!test.isNaN()) player.limitBuyDimNumber = test
        } catch (e) {
          
        }
      }
    }
  })
}
openPopup = function (option) {
    app.isShowingPopup = option
}