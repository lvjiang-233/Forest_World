cc.Class({
    extends: cc.Component,

    properties: {
       character:cc.Node,
       enterGameBtn:cc.Node,
       enterSenarioBtn:cc.Node,
    },

    onLoad () {
        this.enterGameBtn.active=false;
        this.enterSenarioBtn.active=false;
    },

    update (dt) {
        if(this.character.x<=365&&this.character.x>=265
            &&this.character.y<=25&&this.character.y>=-75){
                this.enterSenarioBtn.active=true;
        }
        else if(this.character.x<=-355&&this.character.x>=-455
            &&this.character.y<=-20&&this.character.y>=-120){
                this.enterGameBtn.active=true;
        }
        else{
            this.enterGameBtn.active=false;
            this.enterSenarioBtn.active=false;
        }
    }

});
