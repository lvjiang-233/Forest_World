cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // 开始游戏
    onBtnClickStart(){
        cc.director.loadScene("SaiHanBagame1");
    },

    // update (dt) {},
});
