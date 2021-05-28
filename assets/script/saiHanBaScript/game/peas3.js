cc.Class({
    extends: cc.Component,

    properties: {
        lbAttack: cc.Label,
        pBullet: cc.Prefab,
        plantAudio: { type: cc.AudioClip, default: null, tooltip: "" },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.atk = 2;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.bMoving = true;
        this.oldpos = null;
        this.bisCollision = false;
        // this.init_location = [this.node.x,this.node.y];
        // console.log(this.init_location)
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    start() {
        this.oldpos = this.node.position;
    },


    // 豌豆获得答案
    getAnswer(answer,bool,posY) {
        // console.log("answer: " + String(answer));
        this.bisAnswer = bool;
        this.nAnswerPosY = posY;
        console.log("pea position: " + this.nAnswerPosY);
        this.lbAttack.string = String(answer);
    },

    onTouchStart(touch, event) {
        this.bMoving = true;
    },

    onTouchMove(touch, event) {
        let location = touch.getLocation();
        this.node.position = this.node.parent.convertToNodeSpaceAR(location); // 确定位置

        // let delta = touch.getDelta();
        // console.log("Prev",this.node.x,this.node.y);
        // console.log("delta",delta);
        // this.node.x += delta.x;
        // this.node.y += delta.y;
        // console.log("Now",this.node.x,this.node.y);

        // let winSize = cc.view.getCanvasSize();
        // this.node.x = touch.getLocation().x - winSize.width/2;
        // this.node.y = touch.getLocation().y;
        // console.log(this.node.x,this.node.y);
    },

    onTouchEnd(touch, event) {
        // console.log("Touch end");
        this.bMoving = false;
        this.backOldPos();
    },

    onTouchCancel(touch, event) {
        // console.log("Touch cancel");
        this.bMoving = false;
        this.backOldPos();
    },

    // 碰撞开始回调
    onCollisionStay: function (other, self) {
        this.bisCollision = true;
        if (other.node.name == "flowerpot") {
            // console.log("Collide");
            other.node.getChildByName("pea1_").active = true;
            // other.node.getChildByName("pea1_").opacity = 130;

            // console.log(this.bMoving);
            if (this.bMoving == false) {
                // console.log(this.nAnswerPosY.toString());
                // console.log(other.node.getChildByName(this.nAnswerPosY.toString()));
                if (this.bisAnswer == true){
                    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
                    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

                    this.node.parent = other.node;

                    this.node.x = other.node.getChildByName("pea1_").x;
                    this.node.y = other.node.getChildByName("pea1_").y;
                    cc.audioEngine.play(this.plantAudio, false, 1);
                    other.node.getChildByName("pea1_").active = false;
                    console.log("visible: " + other.node.getChildByName("pea1_").active);

                    console.log("fire");
                    other.node.getComponent(cc.BoxCollider).enabled = false;
                    this.schedule(function () {
                        this.createBullet();
                        // 这里的 this 指向 component
                    }, 2);
                } else {
                    this.node.position = this.oldpos;
                }
                
            }
        }

    },

    // 碰撞结束
    onCollisionExit: function (other, self) {
        this.bisCollision = false;
        if (other.node.name == "flowerpot") {
            // console.log("Not Collide");
            other.node.getChildByName("pea1_").active = false;
            console.log("visible: " + other.node.getChildByName("pea1_").active);
        }
    },

    // 创建子弹
    createBullet() {
        let bullet = cc.instantiate(this.pBullet);
        bullet.parent = this.node;
        bullet.x = 52; // 直接使用了坐标，需要具体修改
        bullet.y = 7; // 直接使用了坐标，需要具体修改
    },

    // 未放置在合适位置时回到初始位置
    backOldPos(){
        if (this.bisCollision == false){
            this.node.position = this.oldpos;
        }
    },

    // update (dt) {},
});
