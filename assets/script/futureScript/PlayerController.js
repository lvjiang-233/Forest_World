
cc.Class({
    extends: cc.Component,

    properties: {
        resetBtn:cc.Node,
    },

    
    onCollisionEnter(other, self){
        if(other.node.group === "Monster"){
            console.log("contact Monster");
            this.node.destroy();
            this.resetBtn.active=true;

        }else if (other.node.group === "Bubble"){
            console.log("contact Bubble");
            this.node.destroy();
            this.resetBtn.active=true;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad(){
        this.resetBtn.active=false;;
    },

    start () {
    },

    /*update (dt) {
        if(this._flag){
            this.resetBtn.active=true;
        }
        else{
            this.resetBtn.active=false;
        }
    },*/
});
