
cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed : {type:cc.Float, default:500, tooltip:"怪物出现运动速度"},
        mininterval : {type:cc.Float, default:2.5, tooltip:"生成怪物的最小时间间隔"},
        maxinterval : {type:cc.Float, default:6.5, tooltip:"生成怪物的最大时间间隔"},
    },
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.originX = this.node.x;
        this.intervalLen = this.maxinterval - this.mininterval;
        this.intervalTime = Math.random()*this.intervalLen + this.mininterval;
        this.passTime = this.intervalTime;
    },

    start (){

    },
    

    update (dt) {
        this.node.x -= this.moveSpeed * dt;
        if (this.node.x >= cc.winSize.width/2 + this.node.width/2){
            this.passTime += dt;
            if (this.passTime >= this.intervalTime){
                this.node.x = this.originX;
                this.passTime = 0;
                this.intervalTime = Math.random()*this.intervalLen + this.mininterval;
            }
        }
    },
});
