import script from "./senarioBtn"
cc.Class({
    extends: cc.Component,

    properties: {
        enterBtn:cc.Node,
        character:cc.Node,
        btnScript:script,
    },

    onLoad () {
        this.enterBtn.active=false;
    },

    update (dt) {
        if(this.character.x<=215&&this.character.x>=115
            &&this.character.y<=170&&this.character.y>=70){
                this.enterBtn.active=true;
        }
        else if(this.character.x<=160&&this.character.x>=60
            &&this.character.y<=-145&&this.character.y>=-245){
                this.enterBtn.active=true;
        }
        else{
            this.enterBtn.active=false;
        }
    },
});
