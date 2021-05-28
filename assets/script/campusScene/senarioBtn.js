cc.Class({
    extends: cc.Component,

    properties: {
        character:cc.Node,
    },
    
    senarioChoose(){
        if(this.character.x<=215&&this.character.x>=115
            &&this.character.y<=170&&this.character.y>=70){
                cc.director.loadScene("campusSenario");
        }
        else if(this.character.x<=160&&this.character.x>=60
            &&this.character.y<=-145&&this.character.y>=-245){
                cc.director.loadScene("goToCSBuilding");
        }
    }
});
