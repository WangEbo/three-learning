class Store3D{

    constructor() {
        this.Store3DData = null;//仓库数据源
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];

        this.controls = null//控制器
        this.stats = null//性能插件
        this.axisHelper = null//坐标轴辅助

        this.goodTypes=[];
        this.objectLockPointer=[];

        this.carMoveTime = 0;//小车当前移动点索引
        this.carMovePoints = []//小车移动点数组

        this.objectsRoomRate = []//空间利用率

        this.storeIsShow=1;//是否显示库房
        this.groupIsShow=1;//e是否显示排
        this.shelfIsShow=1;//是否显示架子
        this.roomRateShow=1;//是否显示空间利用率
    }

    // 程序开始函数
    start(){
        this.initMain()
        // 添加调试工具
        this.initHelpers()
        this.animate()
    }

    // 初始化主函数
    initMain(){
        this.initScene()
        this.initCamera()
        this.initRenderer()
        this.initBuilding()
        this.initLight()
        this.initStoreObjects()
        this.initObjectSelect()
        this.initAgvCar()

        this.initResize()
    }

    // 帧动画函数
    animate(){
        requestAnimationFrame(this.animate.bind(this))
        this.stats.update();//更新性能插件
        this.controls.update();//控制器更新
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
        this.moveAgvCar()
    }

    initHelpers(){
        // 添加相机调试器
        this.initOrbitControl()
        // 添加性能监控
        this.initStats()
        this.initAxisHelper();
    }

    initOrbitControl(){
        this.controls = new THREE.OrbitControls(this.camera)
        // 允许阻尼  (是否有惯性)
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.5;//阻尼系数
        this.controls.minDistance = 0;//视角最小距离
        this.controls.maxDistance = 2000;//视角最大距离
        // this.controls.maxPolarAngle = Math.PI / 2.2;//最大角度
    }

    initStats(){
        this.stats = new Stats()
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.lefe = '0';
        this.stats.dom.style.top = '0';
        document.body.appendChild(this.stats.dom)
    }
    initAxisHelper(){
        this.axisHelper  = new THREE.AxisHelper(3000,)
        this.scene.add(this.axisHelper);
    }

    // 声明场景
    initScene(){
        this.scene = new THREE.Scene();
    }

    // 声明相机
    initCamera(){
        // 创建视距投影相机
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1,10000)

        // 设置相机位置
        this.camera.position.x = 0;
        this.camera.position.y = 1600;
        this.camera.position.z = 1000;

        // 设置相机拍摄位置
        this.camera.lookAt(0, 0, 0);
        this.scene.add(this.camera);
    }

    // 声明渲染器
    initRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,//是否开启抗锯齿
            alpha: true,//是否可以设置背景透明
            logarithmicDepthBuffer: true,//模型的重叠部位不听的闪烁起来，这便是Z-filghting问题，采用这种方式解决
        })

        this.renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染尺寸
        this.renderer.setClearColor(0x396098);//设置渲染的背景颜色
        this.renderer.setPixelRatio(window.devicePixelRatio);//设置渲染器分辨率

        //将渲染器的dom元素添加至页面
        document.getElementById('container').appendChild(this.renderer.domElement)
    }

    // 声明灯光
    initLight(){
        //添加环境光
        let ambient = new THREE.AmbientLight(0xffffff, 1)
        ambient.position.set(0, 0, 0);
        this.addObject(ambient);

        // 添加平行光
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);//模拟类似太阳光源
        directionalLight.position.set(0, 200, 0);
        this.addObject(directionalLight);

        // 添加点光源
        let pointLight = new THREE.PointLight(0xffffff, 0.3);
        pointLight.position.set(-500, 200, 0);
        this.addObject(pointLight);
        let pointlight2 = new THREE.PointLight(0xffffff, 0.3);
        pointlight2.position.set(500, 200, 0);
        this.addObject(pointlight2)
    }

    // 声明建筑物
    initBuilding(){
        let buildingData = buildingObjects.objects
        for(let i = 0;i < buildingData.length; i++){
            let objectOpt = buildingData[i]
            switch (objectOpt.objectType){
                case "cube":
                    let cube = new Cube(objectOpt);
                    this.addObject(cube);
                    break
                case "wall":    //墙体
                    let wall = new Wall(objectOpt);
                    this.addObject(wall);
                    break
                case "route":
                    this.curve=new Route(objectOpt);
                    let line=new RouteLine(this.curve, objectOpt);
                    this.addObject(line);
                    this.carMovePoints = this.curve.getPoints(2000);
                    break;
            }
        }
    }
    /**初始化物品 */
    initStoreObjects() {
        //由接口获取库区数据并渲染
        StoreArea.loadData().then(data=> {
            if(data){
                data.Areas.forEach(areaOpt=> {
                    let area = new StoreArea(areaOpt, this)
                    this.addObject(area)
                        //显示仓库
                        for (let j = 0; j < areaOpt.Stores.length; j++)//
                        {
                            let optionStore = areaOpt.Stores[j];
                            optionStore.Position = CommonFunction.transPosition(optionStore.Position, areaOpt.Position);
                            let store = new Store(optionStore);
                            this.addObject(store);
                            let storeSign = new StoreSign(optionStore, this);
                            let storeTemperature=new Temperature(optionStore, this);
                            //显示每行信息
                            for (let k = 0; k < optionStore.Groups.length; k++) {
                                let optionGroup = optionStore.Groups[k];
                                optionGroup.Position = CommonFunction.transPosition(optionGroup.Position, optionStore.Position);
                                let shelf = new StoreShelf(optionGroup);
                                let group=new StoreGroup(optionGroup,1);
                                this.addObject(shelf);
                                this.addObject(group);
                                //显示库位上的货物
                                for (let m = 0; m < optionGroup.Bins.length; m++) {
                                    let optionBin = optionGroup.Bins[m];
                                    let existGoods=this.getExistedGoodType(optionBin.State);
                                    let storeGoods = new StoreGoods(optionGroup, optionBin);
                                    if(existGoods==null) {
                                        let goods=storeGoods.create();
                                        this.addObject(goods);
                                        this.goodTypes.push({type: optionBin.State, object: goods});
                                     }
                                     else
                                     {
                                         let goods= storeGoods.clone(existGoods);
                                         this.addObject(goods);
                                     }
                                }
                            }
    
                        }
                })
            }
        })
    }
    /* 初始化物体选中控件*/
    initObjectSelect() {
        new ObjectSelect(this.scene, this.camera);
    }
    initAgvCar() {
       let AgvCar=new AGVCar();
       AgvCar.load(this.showAgvCar.bind(this))
    }
    showAgvCar(AgvCar){
        AgvCar.name = "AGV小车";
        AgvCar.position.set(-100,40,100);
        this.AgvCar=AgvCar;
        this.addObject(AgvCar);
    }


    initResize(){
        window.addEventListener('resize',()=> {
            this.camera.aspect = window.innerWidth/window.innerHeight
            this.camera.updateProjectionMatrix()//更新相机投影矩阵，一般在修改相机参数后调用
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

    /**
     * 获取是否已经生成同类型的货物
     */
    getExistedGoodType(state) {
        for (let i=0;i<this.goodTypes.length;i++)
        {
            let type=this.goodTypes[i];
            if(type.type===state)
            {
                return type.object;
            }

        }
        return null;

    }

    moveAgvCar(){
        
        if(this.carMoveTime>=2000){
            this.carMoveTime = 0
        }
        if(this.AgvCar && this.curve){
            let point = this.carMovePoints[this.carMoveTime],
                nextTime = this.carMoveTime >= 1999 ? 0 : this.carMoveTime+1,
                pointNext = this.carMovePoints[nextTime];
            this.AgvCar.position.set(point.x, 30, point.z)
            this.AgvCar.lookAt(pointNext.x, 30, pointNext.z)//使小车看想下一个点，保持车头朝向
            this.carMoveTime++
        }
    }
    

    addObject(obj){
        this.scene.add(obj)
        this.objects.push(obj)
    }

    removeObject(nameorid) {
        for (let i = 0; i < this.objects.length; i++) {
            let tmpObject = this.objects[i];
            if (tmpObject.name == nameorid || tmpObject.id == nameorid) {
                this.objects.splice(i, 1);
                this.scene.remove(tmpObject);
            }

        }
    }

    //显示空间利用率
    showRoomRate(){

        let Store3DData = JSON.parse(JSON.stringify(this.Store3DData));
        if (Store3DData !== null) {
            for (let i = 0; i < Store3DData.Areas.length; i++) {

                let optionArea = Store3DData.Areas[i];
                let area = new StoreArea(optionArea);
                for (let j = 0; j < optionArea.Stores.length; j++) {
                    let optionStore = optionArea.Stores[j];
                    optionStore.Position = CommonFunction.transPosition(optionStore.Position, optionArea.Position);
                    for (let k = 0; k < optionStore.Groups.length; k++) {
                        let optionGroup = optionStore.Groups[k];
                        optionGroup.Position = CommonFunction.transPosition(optionGroup.Position, optionStore.Position);
                        let height=optionGroup.Height*(optionGroup.OccurpyBinNum/optionGroup.TotalBinNum); // 根据比例计算高度

                        let group = new StoreGroup(optionGroup);
                        this.addObject(group);
                        this.objectsRoomRate.push(group);
                        optionGroup.Height=1;
                        optionGroup.Position.Y=1;
                        let groupRate = new StoreGroup(optionGroup,2);
                        this.addObject(groupRate);

                        this.objectsRoomRate.push(groupRate);
                        var tween1 = new TWEEN.Tween(groupRate.scale).to({ // 添加TWEEN动画示例
                            y: height 
                        }, 3000).easing(TWEEN.Easing.Quadratic.In).onComplete(function () {
                        });
                        var tween2 = new TWEEN.Tween(groupRate.position).to({
                            y: height/2
                        }, 3000).easing(TWEEN.Easing.Quadratic.In).onComplete(function () {
                        });
                        tween1.start();
                        tween2.start();
                    }
                }
            }
        }
    }

    /* 操作面板 */

    /**
     * 显示或者隐藏性能控件
     */
    changeStats() {
        if (this.stats.domElement.style.display == 'none')
            this.stats.domElement.style.display = 'block';
        else
            this.stats.domElement.style.display = 'none';
    }

    /***********************************************
     * 隐藏或者显示所有的仓库对象
     */
    changeStoreShow() {
        if (this.storeIsShow == 1) {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "Store") {
                    this.scene.remove(tmpObject);
                }
            }
            this.storeIsShow = 0;
        } else {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "Store") {
                    this.scene.add(tmpObject);
                }
            }
            this.storeIsShow = 1;
        }
    }

    changeGroupShow() {
        if (this.groupIsShow == 1) {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreGroup") {
                    this.scene.remove(tmpObject);
                }
            }
            this.groupIsShow =0;
        }
        else {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreGroup") {
                    this.scene.add(tmpObject);
                }
            }
            this.groupIsShow =1;
        }
    }

    changeShelfShow(){
        if(this.shelfIsShow==1)
        {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreShelf") {
                    this.scene.remove(tmpObject);
                }
            }
            this.shelfIsShow =0;
        }
        else
        {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreShelf") {
                    this.scene.add(tmpObject);
                }
            }
            this.shelfIsShow =1;
        }
    }

    changeTemperatureShow(){
        if (this.tmpIsShow == 1) {
            for (let i = 0; i < this.objectLockPointer.length; i++) {
                let tmpObject = this.objectLockPointer[i];
                if (tmpObject.type == "Temperature") {
                    this.removeObject(tmpObject.id);
                }
                else if(tmpObject.type == "StoreSign")
                {
                    this.addObject(tmpObject);
                }
            }
            this.tmpIsShow =0;
        }
        else {
            for (let i = 0; i < this.objectLockPointer.length; i++) {
                let tmpObject = this.objectLockPointer[i];
                if (tmpObject.type == "Temperature") {
                    this.addObject(tmpObject);
                }
                else if(tmpObject.type == "StoreSign")
                {
                    this.removeObject(tmpObject.id);
                }
            }
            this.tmpIsShow =1;
        }
    }

    /**
     * 显示空间利用率
     */
    changeRoomRateShow() {
        //显示空间利用率
        if(this.roomRateShow==1)
        {
            //隐藏架子 和 货物
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreShelf" || tmpObject.type == "StoreGoods") {
                    this.scene.remove(tmpObject);
                }
            }
            this.showRoomRate();
            this.roomRateShow=0;
        }
        //隐藏空间
        else
        {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreShelf"||
                    tmpObject.type == "StoreGoods")  {
                    this.scene.add(tmpObject);
                }
            }
            for(let j=0;j<this.objectsRoomRate.length;j++)
            {
                let tmpObject = this.objectsRoomRate[j];
                this.removeObject(tmpObject.id);
            }
            this.objectsRoomRate=[];
            this.roomRateShow=1;
        }
    }
}