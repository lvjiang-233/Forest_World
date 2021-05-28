cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        requireComponent: cc.Sprite,     //要求节点必须有cc.Sprite组件
    },  

    properties: {
        spriteFrames:[cc.SpriteFrame],
       _index:0,
    
        index:{
            type:cc.Integer,
            get(){
                return this._index;
            },

            set (value) {
                 if(value<0)return;
                this._index=value % this.spriteFrames.length;
                //获取当前节点上的Sprite组件对象
                let sprite= this.node.getComponent(cc.Sprite);
                //设置Sprite组件的spriteFrame属性，变换图片
                sprite.spriteFrame = this.spriteFrames[this._index];
             }
        },

        direction:"",
    },

    chooseFrame(value){
        this.index=value;
    },

    nextFrame(){
        if(this.index==this.spriteFrames.length-1){
            if(this.direction==null)return;
            else{
                cc.director.loadScene(this.direction);
            }
        }
        this.index++;
    },

    lastFrame(){
        if(this.index==0)return;
        this.index--;
    }
});
