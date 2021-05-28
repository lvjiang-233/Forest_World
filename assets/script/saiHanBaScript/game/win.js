cc.Class({
    extends: cc.Component,

    properties: {
        winAudio: { type: cc.AudioClip, default: null, tooltip: "" },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.audioEngine.play(this.winAudio, false, 1);
    },

    // update (dt) {},
});
