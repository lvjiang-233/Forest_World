cc.Class({
    extends: cc.Component,

    properties: {
       character:cc.Node,
       xinjiangBtn:cc.Node,
       saihanbaBtn:cc.Node,
       futureBtn:cc.Node,
    },

    onLoad () {
        this.xinjiangBtn.active=false;
        this.saihanbaBtn.active=false;
        this.futureBtn.active=false;
    },

    update (dt) {
        if(this.character.x<=-295&&this.character.x>=-414
            &&this.character.y<=60&&this.character.y>=-160){
                this.xinjiangBtn.active=true;
        }
        else if(this.character.x<=427&&this.character.x>=95
            &&this.character.y<=260&&this.character.y>=160){
                this.saihanbaBtn.active=true;
        }
        else if(this.character.x<=560&&this.character.x>=175
            &&this.character.y<=-199&&this.character.y>=-313){
                this.futureBtn.active=true;
        }
        else{
            this.xinjiangBtn.active=false;
            this.saihanbaBtn.active=false;
            this.futureBtn.active=false;
        }
    },
});
