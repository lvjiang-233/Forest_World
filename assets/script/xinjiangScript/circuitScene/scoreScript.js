cc.Class({
    extends: cc.Component,

    properties: {
       scoreLabel:cc.Label,
       finalScoreLabel:cc.Label,
       _score:cc.integer,
    },

    init_score(){
        this._score=0;
        this.scoreLabel.string=this._score;
    },

    scoreInc(sscore){
        this._score+=sscore;
        this.scoreLabel.string=this._score;
        this.finalScoreLabel.string=this._score;
    },

    scale_Inc(){
        return Math.floor(this._score/300);
    }
});
