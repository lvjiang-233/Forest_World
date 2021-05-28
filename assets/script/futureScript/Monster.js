
cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed : {type:cc.Float, default:100, tooltip:"怪物出现运动速度"},
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //控制所在方向
        this.sideType = Math.random() > 0.5 ? 1 : -1;
        this.node.y = this.sideType * this.node.y;
        this.node.scaleY = this.sideType * this.node.scaleY;
    },

    start () {
        
    },

    update (dt) {
        this.node.x -= this.moveSpeed * dt;
        if (this.node.x >= cc.winSize.width/2 + this.node.height/2){
            this.node.removeFromParent();
            console.log("remove!");
        }
    },
});
