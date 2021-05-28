cc.Class({
    extends: cc.Component,

    properties: {
        introArr:[cc.Node],
    },

    onLoad(){
        this.index=0;
        this.introArr[0].active=true;
        this.introArr[1].active=false;
        this.introArr[2].active=false;
    },

    pageSelect:function(){
        this.index=(this.index+1)%3;
        for(i=0;i<3;i++){
            if(i==this.index){
                this.introArr[i].active=true;
            }
            else{
                this.introArr[i].active=false;
            }
        }
        console.log(this.index);
    }
});
