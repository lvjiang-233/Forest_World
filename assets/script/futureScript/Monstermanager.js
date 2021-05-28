// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        monsterPrefab : {type:cc.Prefab, default:null, tooltip:"怪物预制体"},
        mininterval : {type:cc.Float, default:2.5, tooltip:"生成怪物的最小时间间隔"},
        maxinterval : {type:cc.Float, default:6.5, tooltip:"生成怪物的最大时间间隔"},
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.isGameOver = false;
        this.intervalLen = this.maxinterval - this.mininterval;
        this.intervalTime = Math.random() * this.intervalLen + this.mininterval;
        this.passTime = this.intervalTime;
    },

    update (dt) {
        if (this.isGameOver === true){
            return;
        }
        this.passTime += dt;
        if(this.passTime >= this.intervalTime){
            this.genmonster();
            this.passTime = 0;
            this.intervalTime = Math.random()*this.intervalLen + this.mininterval;
        }
    },

    genmonster(){
        let monsterNode = cc.instantiate(this.monsterPrefab);
        this.node.addChild(monsterNode);
    }
});
