// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({

    extends: cc.Component,
    
    properties: {
        scoreLable: cc.Label,
        chanceLable: cc.Label,
        leseNode:{
            default:null,
            type:cc.Node
        },
        bin1Node: cc.Node,
        bin2Node: cc.Node,
        bin3Node: cc.Node,
        bin4Node: cc.Node,
        rightAudio: {
            default:null,
            type:cc.AudioClip
        },
        wrongAudio: {
            default:null,
            type:cc.AudioClip
        },
    },

    onLoad () {
        this.score = 0;
        this.chance = 5;

        this.placeLese();
        this.node.on('touchstart', this.down, this);
    },

    onDestroy() {
        this.node.off('touchstart', this.down, this);
    },

    update (dt) {   
        if (this.i ==1 || this.i == 2){
            if (this.bin1Node.position.sub(this.leseNode.position).mag()<this.bin1Node.width/2 + this.leseNode.width/2){
                cc.audioEngine.play(this.rightAudio,false,0.5);
                this.leseNode.active = false;
    
                this.leseNode.stopAction(this.leseAction);
                this.scoreLable.string = ++ this.score ;
                if(this.score == 10){
                    this.end();
                }
                this.placeLese();
            } 
            else if (this.bin2Node.position.sub(this.leseNode.position).mag()<this.bin2Node.width/2 + this.leseNode.width/2 || this.bin3Node.position.sub(this.leseNode.position).mag()<this.bin3Node.width/2 + this.leseNode.width/2 || this.bin4Node.position.sub(this.leseNode.position).mag()<this.bin4Node.width/2 + this.leseNode.width/2){
                cc.audioEngine.play(this.wrongAudio,false,1);
                this.leseNode.active = false;
               
                this.leseNode.stopAction(this.leseAction);
                this.chanceLable.string = -- this.chance ;
                if(this.chance == 0){
                    this.end();
                }
                this.placeLese();
            }
                
        }else if (this.i ==3 || this.i == 4){
            if (this.bin2Node.position.sub(this.leseNode.position).mag()<this.bin2Node.width/2 + this.leseNode.width/2){
                cc.audioEngine.play(this.rightAudio,false,0.5);
                this.leseNode.active = false;
    
                this.leseNode.stopAction(this.leseAction);
                this.scoreLable.string = ++ this.score ;
                if(this.score == 10){
                    this.end();
                }
                this.placeLese();
            } 
            else if (this.bin1Node.position.sub(this.leseNode.position).mag()<this.bin1Node.width/2 + this.leseNode.width/2 || this.bin3Node.position.sub(this.leseNode.position).mag()<this.bin3Node.width/2 + this.leseNode.width/2 || this.bin4Node.position.sub(this.leseNode.position).mag()<this.bin4Node.width/2 + this.leseNode.width/2){
                cc.audioEngine.play(this.wrongAudio,false,1);
                this.leseNode.active = false;
               
                this.leseNode.stopAction(this.leseAction);
                this.chanceLable.string = -- this.chance ;
                if(this.chance == 0){
                    this.end();
                }
                this.placeLese();
                
            }
           
        }else if (this.i ==5 || this.i == 6){
            if (this.bin3Node.position.sub(this.leseNode.position).mag()<this.bin3Node.width/2 + this.leseNode.width/2){
                cc.audioEngine.play(this.rightAudio,false,0.5);
                this.leseNode.active = false;
    
                this.leseNode.stopAction(this.leseAction);
                
                this.scoreLable.string = ++ this.score ;
                if(this.score == 10){
                    this.end();
                }
                this.placeLese();
            } 
            else if (this.bin2Node.position.sub(this.leseNode.position).mag()<this.bin2Node.width/2 + this.leseNode.width/2 || this.bin1Node.position.sub(this.leseNode.position).mag()<this.bin1Node.width/2 + this.leseNode.width/2 || this.bin4Node.position.sub(this.leseNode.position).mag()<this.bin4Node.width/2 + this.leseNode.width/2){
                cc.audioEngine.play(this.wrongAudio,false,1);
                this.leseNode.active = false;
               
                this.leseNode.stopAction(this.leseAction);
                this.chanceLable.string = -- this.chance ;
                if(this.chance == 0){
                    this.end();
                }
                this.placeLese();
                
            }
        }else{
            if (this.bin4Node.position.sub(this.leseNode.position).mag()<this.bin4Node.width/2 + this.leseNode.width/2){
                cc.audioEngine.play(this.rightAudio,false,0.5);
                this.leseNode.active = false;
    
                this.leseNode.stopAction(this.leseAction);
                this.scoreLable.string = ++ this.score ;
                if(this.score == 10){
                    this.end();
                }
                this.placeLese();
            } 
            else if (this.bin2Node.position.sub(this.leseNode.position).mag()<this.bin2Node.width/2 + this.leseNode.width/2 || this.bin3Node.position.sub(this.leseNode.position).mag()<this.bin3Node.width/2 + this.leseNode.width/2 || this.bin1Node.position.sub(this.leseNode.position).mag()<this.bin1Node.width/2 + this.leseNode.width/2){
                
                cc.audioEngine.play(this.wrongAudio,false,1);
                this.leseNode.active = false;
               
                this.leseNode.stopAction(this.leseAction);
                this.chanceLable.string = -- this.chance ;
                if(this.chance == 0){
                    this.end();
                }
                this.placeLese();
                
            }
        }
       
    },

    //预置
    setlese(){
        this.leseNode.x = 0;
        this.leseNode.y = 280;

        this.i = Math.floor(Math.random()*8)+1;
        if(this.score != 10 && this.chance != 0){
            this.leseNode.active = true;

            var children = this.leseNode.children;
            for(let k = 0;k < children.length;k++){
                if(children[k].name == this.i){
                    children[k].active = true;
                }else{
                   children[k].active = false;
                }
            }
        }
        
    },

    //放置垃圾节点
    placeLese() {
        this.setlese();

        this.isDown = false;
    
        let seq = cc.repeatForever(
            cc.sequence(
                cc.moveTo(2, -500, 280),
                cc.moveTo(2, 500, 280)
            ),
        );

        this.moveAction = this.leseNode.runAction(seq);
    },




    //降落
    down() {
        if(this.isDown) return;
        this.isDown = true;

        this.leseNode.stopAction(this.moveAction);            
        console.log('降落');
        
        let seq1 = cc.sequence(
            cc.moveTo(0.1, this.leseNode.x, -280),
            cc.callFunc(() => {
                this.end();
            })
        );
        this.leseAction = this.leseNode.runAction(seq1);   

    },

    end() {
        if(this.score == 10){
            this.leseNode.active = false;
            
            console.log('结束');
            cc.director.loadScene("win");
            
        }else if(this.chance == 0){
            this.leseNode.active = false;
            console.log('结束');
            cc.director.loadScene("lose");
        }else{
            this.leseNode.active = false;
            this.leseNode.stopAction(this.leseAction);
            this.placeLese();
        }
        
    },


});