import script from "./board"
cc.Class({
    extends: cc.Component,

    properties:{
        _x:0,
        _y:0,
        pos_x:{
            x:cc.integer,
            get(){
                return this._x;
            },
            set (value){
                if(value<0||value>3)return;
                this._x=value;
            }
        },
        pos_y:{
            y:cc.integer,
            get(){
                return this._y;
            },
            set (value){
                if(value<0||value>3)return;
                this._y=value;
            }
        },
        block:cc.Node,
        board:script,
    },

    rotate:function(){
        this.block.runAction(cc.rotateBy(0,90));
        this.board.rotateFunc(this.pos_x*4+this.pos_y);
    },
});
