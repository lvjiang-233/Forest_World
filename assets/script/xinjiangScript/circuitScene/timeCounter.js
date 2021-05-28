cc.Class({
    extends: cc.Component,

    properties: {
        _timeLeft:cc.integer,
        timer:cc.Label,
        failedSign:cc.Node,
        finalScoreSign:cc.Node,
        funcFlag:cc.bool,
    },

    init_time(ttime){
        this._timeLeft=ttime;
        this.timer.string=this._timeLeft;
    },

    countDown(){
        if(this._timeLeft>=1){
            this._timeLeft--;
            this.timer.string=this._timeLeft;
        }
    },


    timerWork(){
        if(this._timeLeft>=0){
            this.schedule(function(){
                if(this._funcFlag){
                    this.countDown();
                }
                if(this._timeLeft==0&&this._funcFlag){
                    this.failedSign.active=true;
                    this.finalScoreSign.active=true;
                }
            },1);
        }
    },

    timerFunc(){
        this._funcFlag=true;
    },

    timerStop(){
        this._funcFlag=false;
    }


});
