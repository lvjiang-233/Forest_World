cc.Class({
    extends: cc.Component,

    properties: {
        pZombies: cc.Prefab,
        bornZombies: cc.Node,
        pPeas: cc.Prefab,
        bornPeas: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.zombiesPosY = [-190, 75, 40, 165, 270]; // 僵尸生成位置需要根据具体场景修改
        cc.director.getCollisionManager().enabled = true;
    },

    start() {
        this.formula = this.setFormula();
        this.createZombies(this.formula[0]);
    },

    // 生成随机公式
    setFormula() {
        var choose = Math.round(Math.random());
        if (choose == 0) {
            var temp1 = Math.round(Math.random() * 49);
            var temp2 = Math.round(Math.random() * 19);
            return [String(temp1) + '+' + String(temp2), temp1 + temp2];
        }
        else if (choose == 1){
            var temp1 = Math.round(Math.random() * 10);
            var temp2 = Math.round(Math.random() * 10);
            return [String(temp1) + '*' + String(temp2), temp1 * temp2];
        }
    },

    // 创建僵尸
    createZombies(formula) {
        // 在固定的生成点创建僵尸
        let zombies = cc.instantiate(this.pZombies);
        zombies.parent = this.bornZombies;

        // 随机选择僵尸的生成列
        let rand = Math.round(Math.random() * 4);
        console.log(rand);
        zombies.y = this.zombiesPosY[rand];
        console.log(zombies.y);

        // 为僵尸设置一个计算公式
        zombies.getComponent("zombies1").getFormula(formula); // 子节点字符串名称需要修改

        // 在创建僵尸后创建植物
        this.createPeas(rand);
    },

    // 创建豌豆
    createPeas(posY) {
        var peasPosX = [-255, 0, 255]; // 植物生成位置需要修改

        var rand = Math.round(Math.random()*2);
        for (var i = 0; i < 3; i++) {
            let peas = cc.instantiate(this.pPeas);
            if (rand == i){
                console.log("yes");
                peas.getComponent("peas1").getAnswer(this.formula[1],true,posY);
            }
            else{
                let temp = Math.round(Math.random() * 99)
                while (temp == this.formula[1]) {
                    temp = Math.round(Math.random() * 99);
                }
                peas.getComponent("peas1").getAnswer(temp, false, posY);
            }
            peas.parent = this.bornPeas;
            peas.x = peasPosX.shift();
        }
    },

    update(dt) {

    },
});
