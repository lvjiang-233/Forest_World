cc.Class({
    extends: cc.Component,

    properties: {
        joyStickBtn:cc.Node,
        character:cc.Node,
        maxSpeed:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // hide FPS info
        cc.debug.setDisplayStats(false);

        // Player's move direction
        this.dir = cc.v2(0, 0);

        //touch event
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
    },

    onDestroy(){
        //touch event
        this.node.off('touchstart',this.onTouchStart,this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event){
        //when touch starts, set joyStickBtn's position
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.joyStickBtn.setPosition(pos);
    },

    onTouchMove(event){
        // constantly change joyStickBtn's position
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));

        //get direction
        this.dir=this.joyStickBtn.position.normalize();
    },

    onTouchEnd(event){
        //reset
        this.joyStickBtn.setPosition(cc.v2(0,0));
    },

    onTouchCancel(event){
        //reset
        this.joyStickBtn.setPosition(cc.v2(0,0));
    },

    update(dt){
        if(this.joyStickBtn!=null&&this.character!=null&&this.joyStickBtn!=undefined&&this.character!=undefined){
            //get ratio
            let len=this.joyStickBtn.position.mag();
            let maxLen=this.node.width/2;
            let ratio=len/maxLen;

            //restrict joyStickBtn inside the joyStickPanel
            if (ratio > 1) {
                this.joyStickBtn.setPosition(this.joyStickBtn.position.div(ratio));
            }

            //move character
            let dis=this.dir.mul(this.maxSpeed*ratio);
            this.character.setPosition(this.character.position.add(dis));

            // restrict character inside the Canvas
            if (this.character.x > this.character.parent.width / 2)
                this.character.x = this.character.parent.width / 2;
            else if (this.character.x < -this.character.parent.width / 2)
                this.character.x = -this.character.parent.width /2;

            if (this.character.y > this.character.parent.height / 2)
                this.character.y = this.character.parent.height / 2;
            else if (this.character.y < -this.character.parent.height / 2)
                this.character.y = -this.character.parent.height / 2;
        }
    }
});
