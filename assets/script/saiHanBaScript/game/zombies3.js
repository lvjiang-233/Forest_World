cc.Class({
    extends: cc.Component,

    properties: {
        lbHealth: cc.Label,
        progressBar: cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speedX = 0.5;
        this.setHealth();
        this.bisMoving = true;
    },

    start () {
        console.log("zombie y: " + this.node.y);
    },

    // 设置生命值
    setHealth(){
        this.maxhp = Math.round((Math.random()/2+1)*4);
        this.hp = this.maxhp;
    },

    // 减少生命值
    loseHealth(){
        this.hp -= 1;
        this.progressBar.progress = this.hp/this.maxhp;
    },


    // 碰撞回调
    onCollisionStay: function (other, self) {
        if (other.node.name == "bullet3"){
            this.loseHealth();
            if (this.hp<=0){
                this.node.removeFromParent();
                console.log("You win!");
                cc.director.loadScene("SaiHanBawin"); // 此处切换场景，根据需要修改字符串的值来前往不同的场景
            }
        } else if (other.node.name == "pea3" && self.node.x <= -1100){
            this.bisMoving = false;
            this.schedule(function () {
                other.node.removeFromParent();
                this.bisMoving = true;
            }, 2);
            
        }
    },

    // 僵尸获得公式 
    getFormula(formula){
        console.log(formula)
        this.lbHealth.string = formula;
    },

    update(dt) {
        if (this.bisMoving == true){
            this.node.x -= this.speedX;
        }
        // this.lbHealth.string = "Health: " + String(this.hp);
        if (this.node.x <= -1300){ // 此处直接使用了坐标，需要具体修改
            console.log("Game Over!");
            cc.director.loadScene("SaiHanBaover"); // 此处切换场景，根据需要修改字符串的值来前往不同的场景
        }
    },
});
