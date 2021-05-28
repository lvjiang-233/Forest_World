cc.Class({
    extends: cc.Component,

    properties: {
       character:cc.Node,
       enterSenario1:cc.Node,
       enterSenario2:cc.Node,
    },

    onLoad () {
        this.enterSenario1.active=false;
        this.enterSenario2.active=false;
    },

    update (dt) {
        if(this.character.x<=100&&this.character.x>=-200
            &&this.character.y<=-90&&this.character.y>=-190){
                this.enterSenario1.active=true;
        }
        else if(this.character.x<=-225&&this.character.x>=-325
            &&this.character.y<=160&&this.character.y>=60){
                this.enterSenario2.active=true;
        }
        else{
            this.enterSenario1.active=false;
            this.enterSenario2.active=false;
        }
    },
});
