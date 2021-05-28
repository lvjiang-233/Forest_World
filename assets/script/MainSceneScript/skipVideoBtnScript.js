cc.Class({
    extends: cc.Component,

    properties: {
        video:cc.VideoPlayer,
    },

    videoSkip(){
        console.log("video skip.");
        this.video.node.active=false;
    }
});
