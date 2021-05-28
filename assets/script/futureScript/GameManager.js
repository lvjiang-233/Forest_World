// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player : {type:cc.Node, default:null, tooltip:"玩家节点"},
        
    },


    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this.isJumping = false;     //判断是否在跳跃
        this.PlayerPos = this.player.getPosition();     //玩家开始的坐标，便于计算
        this.jumpMaxY = Math.abs(this.player.y) * 2;       //玩家最大跳跃值
        this.jumpMinY = 320;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onPlayerJump.bind(this), this);
    },

    onPlayerJump(e){
        if(this.isJumping === true){
            return;
        }
        this.isJumping = true;
        //判断到底是同侧跳跃还是异侧跳跃
        let touchPos = e.getLocation();
        touchPos = this.node.convertToNodeSpaceAR(touchPos);
        this.playerPos = this.player.getPosition();

        let offSet = touchPos.sub(this.playerPos);
        //跳跃方向
        let jumpDir = offSet.y > 0 ? 1 : -1;
        //同侧跳跃与异侧跳跃
        
        if (Math.abs(offSet.y) >= this.node.height/2){
            this.PlayerJumpToAnotherSide(jumpDir);
        }else{
            this.playerJumpOnSide(jumpDir);
        }
        
    },

    PlayerJumpToAnotherSide(jumpDir){
        console.log("2");
        let jumpY = jumpDir * this.jumpMaxY;
        let jump = cc.moveBy(1.0, cc.v2(0, jumpY), 0.1);
        let rot = cc.rotateBy(0.8, 180);
        
        let endFunc = cc.callFunc(function(){
            this.isJumping = false;
        }.bind(this),0.6);
        let action = cc.spawn(jump, rot);
        let seq = cc.sequence([action, endFunc]);
        this.player.runAction(seq);
        
    },
    playerJumpOnSide(jumpDir){
        console.log("1");
        let jumpY = jumpDir * this.jumpMinY;
        let jump = cc.moveBy(1.5, cc.v2(0, jumpY, 0), 0.1);
        
        let back = cc.moveBy(1.5, cc.v2(0, -jumpY, 0), 0);
        let endFunc = cc.callFunc(function(){
            this.isJumping = false;
        }.bind(this),0.6);
        let seq = cc.sequence([jump,back,endFunc]);

        this.player.runAction(seq);
        
    },

    start () {

    },

    // update (dt) {},
});
