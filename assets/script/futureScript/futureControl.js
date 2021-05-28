cc.Class({
    extends: cc.Component,

    properties: {
       enterGame:cc.Node,
       enterSenario:cc.Node,
       character:cc.Node,
    },

    onLoad(){
        this.enterGame.active=false;
        this.enterSenario.active=false;
    },

    update (dt) {
        if(this.character.x<=-380&&this.character.x>=-480
            &&this.character.y<=50&&this.character.y>=-50){
                this.enterGame.active=true;
        }
        else if(this.character.x<=50&&this.character.x>=-50
            &&this.character.y<=50&&this.character.y>=-50){
                this.enterSenario.active=true;
        }
        else{
            this.enterGame.active=false;
            this.enterSenario.active=false;
        }
    },
});
