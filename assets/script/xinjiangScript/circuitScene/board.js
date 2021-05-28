import script1 from "./blockFrame"
import script2 from "./timeCounter"
import script3 from "./scoreScript"
cc.Class({
    extends: cc.Component,

    properties: {
        _winningFlag:false,
        grid:[cc.Node],
        frame:[script1],

        lightning:script1,
        connectedSign:cc.Node,
        failedSign:cc.Node,
        finalScoreSign:cc.Node,
        timer:script2,
        score:script3,

        _difficultScale:cc.integer,
        _timerFlag:cc.bool,
    },

    /*---program init---*/ 
    start () {
        this._timerFlag=false;
        this._difficultScale=0;
        this.score.init_score();
        this.init();
    },

    gridFunc(){
        this.connected=false;
        this.type=-1;
        this.interface={
            '0':undefined,//'0'-north
            '1':undefined,//'1'-east
            '2':undefined,//'2'-south
            '3':undefined,//'3'-west
        };
        this.angle=0;
        this.routeType={
            0:false,
            1:false,
        }
        this.routeNum=0;
        this.checked=false;
    },

    rotateFrame(i){
        this.grid[i].runAction(cc.rotateBy(0,this.grid[i].angle));
    },

    type_neighbour(){
        return Math.round(Math.random()*2+1);
    },

    type_opposite(){
        return Math.round(Math.random()*2+3);
    },

    type_random(){
        return Math.round(Math.random()*4+1);
    },

    straight_flag(upPos,downPos,j){
        if(j==upPos||j==downPos)return 'neighbour';
        else if(j>upPos&&j>downPos)return 'random';
        else if(j<upPos&&j<downPos)return 'random';
        else return 'opposite';
    },

    frameInit(i){
        if(i==12)return;
        t=this.grid[i].type;
        if(t==1) this.frame[i].chooseFrame(0);
        else if(t==2)this.frame[i].chooseFrame(6);
        else if(t==3)this.frame[i].chooseFrame(12);
        else if(t==4) this.frame[i].chooseFrame(2);
        else if(t==5) this.frame[i].chooseFrame(10);
    },

    interfaceInit(i){
        t=this.grid[i].type;
        if(t==1){//corner
            this.grid[i].interface[0]=1;
            this.grid[i].interface[1]=0;
        }
        else if(t==2){//dcorner
            this.grid[i].interface[0]=1;
            this.grid[i].interface[1]=0;
            this.grid[i].interface[2]=3;
            this.grid[i].interface[3]=2;
        }
        else if(t==3){//typeT. In this case, 5 means connected while undefined means unconnected
            this.grid[i].interface[0]=5;
            this.grid[i].interface[2]=5;
            this.grid[i].interface[3]=5;
        }
        else if(t==4){//cross
            this.grid[i].interface[0]=2;
            this.grid[i].interface[2]=0;
            this.grid[i].interface[1]=3;
            this.grid[i].interface[3]=1;
        }
        else if(t==5){//straight
            this.grid[i].interface[0]=2;
            this.grid[i].interface[2]=0;
        }
    },

    init () {
        //winning flag init
        this._winningFlag=false;

        //lightning init
        this.lightning.chooseFrame(0);

        //connected sign init
        this.connectedSign.active=false;

        //failed sign init
        this.failedSign.active=false;

        //final score init
        this.finalScoreSign.active=false;

        //grid init
        for(key in this.grid){
           this.gridFunc.call(this.grid[key]);
        }
            //create pos[]
        pos={
            '-1':4,
            '0':Math.round(Math.random()*3),
            '1':Math.round(Math.random()*3),
            '2':Math.round(Math.random()*3)+1,
            '3':0,
        };

        while(pos[0]==pos[1]){
            pos[1]=Math.round(Math.random()*3);
        }
        while(pos[1]==pos[2]||pos[2]==4){
            pos[2]=Math.round(Math.random()*2)+1;
        }

            //create possible route
        for(i=3;i>=0;i--){
            for(j=0;j<4;j++){
                flag=this.straight_flag(pos[i-1],pos[i],j);
                if(flag=='neighbour'){
                    this.grid[4*i+j].type=this.type_neighbour();
                }
                else if(flag=='opposite'){
                    this.grid[4*i+j].type=this.type_opposite();
                }
                else{
                    this.grid[4*i+j].type=this.type_random();
                }
                this.frameInit(4*i+j);
                this.interfaceInit(4*i+j);

                rot_num=Math.round(Math.random()*4);
            }
        }

        //init the start point(3,0)
        this.grid[12].interface={
            '0':undefined,
            '1':1,
            '2':undefined,
            '3':undefined,
        };
        this.grid[12].type=1;

        //dfs

        this.dfs(3,0,1);

        //timer work
        this.timer.timerFunc();
        if(30-this._difficultScale*5>=5){
            this.timer.init_time(30-this._difficultScale*5);
        }
        else{
            this.timer.init_time(5);
        }
        if(!this._timerFlag){
            this._timerFlag=true;
            this.timer.timerWork();
        }
    },



    /*---click event---*/

    winCheck(){
        if(this._winningFlag){
            this.lightning.chooseFrame(1);
            this.connectedSign.active=true;
            this.timer.timerStop();
            this._difficultScale=this.score.scale_Inc();
            this.score.scoreInc(100+this._difficultScale*100);
            this.schedule(function(){
                this.init();
            },0,0,1);
        }
    },

    FramechangeNum(i,entry){
        if(this.grid[i].type==1){   //corner
            return 1;
        }
        else if(this.grid[i].type==2){  //dcorner
            if(this.grid[i].routeNum==2){   //both routes connected
                return 9;
            }
            if(this.grid[i].routeNum==0){   //none route connected
                return 6;
            }
            //only one of the routes is connected
            if(this.grid[i].angle==0||this.grid[i].angle==270||
                -this.grid[i].angle==270){
                if(this.grid[i].routeType[1]){
                    return 7;
                }
                else return 8;
            }
            else{
                if(this.grid[i].routeType[0]){
                    return 7;
                }
                else return 8;
            }
        }
        else if(this.grid[i].type==3){  //typeT
            return 13;
        }
        else if(this.grid[i].type==4){  //cross
            if(this.grid[i].routeNum==2){
               return 5;
            }
            if(this.grid[i].routeNum==0){
                return 0;
            }
            if(entry==0||entry==2){
                if(this.grid[i].angle%180==0){
                    return 4;
                }
                else return 3;
            }
            else {
                if(this.grid[i].angle%180==0){
                    return 3;
                }
                else return 4;
            }
        }
        else {  //straight
            return 11;
        }
    },

    frame_change(key,entry){
        if(key==12)return;
        if(this.grid[key].connected){
            this.frame[key].chooseFrame(this.FramechangeNum(key,entry));
            //Rotation has been done in block::rotate();
        }
        else{
            this.frameInit(key);
        }
    },

    grid_rotate(key){
        if(this.grid[key].angle<0){
            this.grid[key].angle=-this.grid[key].angle;
        }
        this.grid[key].angle=(this.grid[key].angle+90)%360;
            //revise value
        for(k=0;k<4;k++){
            if(this.grid[key].interface[k]==5)continue;
            if(this.grid[key].interface[k]!=undefined){
                this.grid[key].interface[k]=(this.grid[key].interface[k]+1)%4;
            }
        }
            //revise key
        tmp=this.grid[key].interface[3];
        for(k=3;k>0;k--){
            this.grid[key].interface[k]=this.grid[key].interface[k-1];
        }
        this.grid[key].interface[0]=tmp;
    },

    dfs_interface(){
        //init the start point(3,0)
        this.grid[12].interface={
            '0':undefined,
            '1':1,
            '2':undefined,
            '3':undefined,
        };
        this.grid[12].type=1;
        this.grid[12].connected=false;

        //dfs

        this.dfs(3,0,1);
    },

    click_routeNum_change(key){
        if(this.grid[key].type==2){
            if(this.grid[key].routeNum==2&&this.grid[key].routeNum==0)return;
            else{
                this.grid[key].routeNum==0;
                this.grid[key].routeType[0]=false;
                this.grid[key].routeType[1]=false;
            }
        }
        for(key in this.grid){
            this.grid[key].checked=false;
        }
    },

    grid_restore(){
        for(key in this.grid){
            this.grid[key].routeNum=0;
            this.grid[key].routeType[0]=false;
            this.grid[key].routeType[1]=false;
            this.grid[key].connected=false;
            this.frameInit(key);
        }
    },

    rotateFunc(key){
        if(key<0||key>15)return;
        this.grid_rotate(key);
        this.grid_restore();
        this.click_routeNum_change(key);
        this.dfs_interface();
        this.winCheck();
    },



    dfs(cur_x,cur_y,entry){                             
        //wincheck
        if(cur_x==0&&cur_y==4){
            this._winningFlag=true;
            return;
        }

        var index=cur_x*4+cur_y;
        if(cur_x<0||cur_x>3||cur_y<0||cur_y>3){ //cross line judgement
            return;
        }
        else if(this.grid[index].interface[entry]==undefined){  //break judgement

            //grid restore
            this.dfs_restore(cur_x,cur_y,entry);
            return;
        }
        else if(this.grid[index].connected&&this.grid[index].checked){    //connected judgement: If this grid has already been connected, then skip it.
            if(this.grid[index].type!=2&&this.grid[index].type!=4){
                return;
            }
        }


        //routeType&&routeNum change
        if(this.grid[index].type==2||this.grid[index].type==4){   //dcorner and cross
            if(entry==2||this.grid[index].interface[entry]==2){
                this.grid[index].routeType[0]=true;
            }
            else{
                this.grid[index].routeType[1]=true;
            }

            if(this.grid[index].routeType[1]&&this.grid[index].routeType[0])this.grid[index].routeNum=2;
            else this.grid[index].routeNum=1;
        }  

        //set connected flag true
        this.grid[index].connected=true;
        //checked flag
        this.grid[index].checked=true;

        //frame change
        this.frame_change(index,entry);
        
        //dfs
        if(this.grid[index].type==1||this.grid[index].type==5||this.grid[index].type==4){     //corner and straight and cross
            var outlet=this.grid[index].interface[entry];
            var nex_ent=(outlet+2)%4;

            if(outlet==0){
                this.dfs(cur_x-1,cur_y,nex_ent);
            }
            else if(outlet==1){
                this.dfs(cur_x,cur_y+1,nex_ent);
            }
            else if(outlet==2){
                this.dfs(cur_x+1,cur_y,nex_ent);
            }
            else if(outlet==3){
                this.dfs(cur_x,cur_y-1,nex_ent);
            }
        }
        else if(this.grid[index].type==2){  //dcorner
            var outlet=this.grid[index].interface[entry];
            var nex_ent=(outlet+2)%4;

            if(outlet==0){
                this.dfs(cur_x-1,cur_y,nex_ent);
            }
            else if(outlet==1){
                this.dfs(cur_x,cur_y+1,nex_ent);
            }
            else if(outlet==2){
                this.dfs(cur_x+1,cur_y,nex_ent);
            }
            else if(outlet==3){
                this.dfs(cur_x,cur_y-1,nex_ent);
            }

            if(!this.grid[index].routeType[0]){
                this.dfs_restore(cur_x+1,cur_y,0);
                if(this.grid[index].interface[2]==1){
                    this.dfs_restore(cur_x,cur_y+1,3);
                }
                else{
                    this.dfs_restore(cur_x,cur_y-1,1);
                }
            }
            
            if(!this.grid[index].routeType[1]){
                this.dfs_restore(cur_x-1,cur_y,2);
                if(this.grid[index].interface[0]==1){
                    this.dfs_restore(cur_x,cur_y+1,3);
                }
                else{
                    this.dfs_restore(cur_x,cur_y-1,1);
                }
            }

        }
        else if(this.grid[index].type==3){  //typeT
            if(this.grid[index].interface[0]!=undefined&&entry!=0){
                this.dfs(cur_x-1,cur_y,2);
            }

            if(this.grid[index].interface[1]!=undefined&&entry!=1){
                this.dfs(cur_x,cur_y+1,3);
            }

            if(this.grid[index].interface[2]!=undefined&&entry!=2){
                this.dfs(cur_x+1,cur_y,0);
            }

            if(this.grid[index].interface[3]!=undefined&&entry!=3){
                this.dfs(cur_x,cur_y-1,1);
            }
        }
    },

    dfs_restore(cur_x,cur_y,entry){
        var index=cur_x*4+cur_y;
        if(cur_x<0||cur_x>3||cur_y<0||cur_y>3){ //cross line judgement
            return;
        }
        else if(!this.grid[index].connected){   //break judgement
            return;
        }
        else if(this.grid[index].checked&&this.grid[index].connected){      //checked judgement
            if(this.grid[index].type!=2&&this.grid[index].type!=4){         //Well, dcorner and cross can be checked twice 
                 return;
            }
        }

        //routeType&&routeNum change&&set connected flag false
        if(this.grid[index].type==2||this.grid[index].type==4){   //dcorner and cross
            if(entry==2||this.grid[index].interface[entry]==2){
                this.grid[index].routeType[0]=false;
            }
            else{
                this.grid[index].routeType[1]=false;
            }

            if(!this.grid[index].routeType[1]&&!this.grid[index].routeType[0]){
                this.grid[index].routeNum=0;
                this.grid[index].connected=false;
            }
            else this.grid[index].routeNum=1;
        }
        else if(this.grid[index].type==1||this.grid[index].type==5){
            this.grid[index].connected=false;
        }
        
        //dfs_restore
        for(outlet=0;outlet<4;outlet++){
            nex_ent=(outlet+2)%4;
            if(outlet==entry)continue;
            if(this.grid[cur_x*4+cur_y].interface[outlet]==undefined)continue;
            if(outlet==0){
                this.dfs_restore(cur_x-1,cur_y,nex_ent);
            }
            else if(outlet==1){
                this.dfs_restore(cur_x,cur_y+1,nex_ent);
            }
            else if(outlet==2){
                this.dfs_restore(cur_x+1,cur_y,nex_ent);
            }
            else if(outlet==3){
                this.dfs_restore(cur_x,cur_y-1,nex_ent);
            }
        }

    }
});
