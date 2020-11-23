class Store3D{

    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];

        this.controls = null
        this.stats = null
        this.axisHelper = null
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
    }

    // 帧动画函数
    animate(){
        requestAnimationFrame(this.animate.bind(this))
        this.stats.update();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
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
            let object = buildingData[i]
            switch (object.objectType){
                case "cube":
                    let cube = new Cube(object);
                    this.addObject(cube);
                    break
                case "wall":
                    let wall = new Wall(object);
                    this.addObject(wall);
            }
        }
    }

    addObject(obj){
        this.scene.add(obj)
        this.objects.push(obj)
    }
}