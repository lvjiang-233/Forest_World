cc.Class({
    extends: cc.Component,

    properties: {
        videoplayer:cc.VideoPlayer,
        address:"",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //判断是否加载完毕，如果加载完毕启动call函数
        this.videoplayer.node.on('ready-to-play', this.callback, this);
        this.videoplayer.node.on('clicked', this.back, this);
    },

    callback: function (event) {

        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 VideoPlayer 组件
        
        var videoplayer = event.detail;
        
               
        
        if (this.videoplayer) {
        
            this.videoplayer._syncVolume();
        
            this.videoplayer.play();//加载完毕后播放
        
        }
        
        //do whatever you want with videoplayer
        
        //另外，注意这种方式注册的事件，也无法传递 customEventData
        
    },

    back(){
        cc.director.loadScene(this.address);
    },

    // update (dt) {},
});
