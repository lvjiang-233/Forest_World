cc.Class({
    extends: cc.Component,

    properties: {
        scene:"",
    },

    toSenario(){
        cc.director.loadScene(this.scene);
    }
});
