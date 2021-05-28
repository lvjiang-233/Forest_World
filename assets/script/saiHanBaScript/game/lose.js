cc.Class({
    extends: cc.Component,

    properties: {
        loseAudio: { type: cc.AudioClip, default: null },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.audioEngine.play(this.loseAudio, false, 1);
    },

    // update (dt) {},
});
