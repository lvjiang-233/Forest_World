cc.Class({
    extends: cc.Component,

    properties: {
        shootAudio: { type: cc.AudioClip, default: null, tooltip: "" },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.audioEngine.play(this.shootAudio, false, 1);
    },

    start() {

    },

    // 碰撞回调
    onCollisionStay: function (other, self) {
        if (other.node.name == "zombie2") {
            console.log("collide");
            // console.log(other.node);
            this.node.removeFromParent();
        }
    },

    update(dt) {
        this.node.x += 15;
    },
});
