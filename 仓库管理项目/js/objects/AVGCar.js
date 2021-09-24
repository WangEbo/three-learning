class AGVCar{
    constructor(option){
        option = option || {scale: 0.1};
        this.scale = option.scale
    }
    load(cb){
        let mtlLoader = new THREE.MTLLoader();//mtl材质加载器

        mtlLoader.load('./models/AGV.mtl', material=> {//加载.mtl文件，执行处理函数
            var objLoader = new THREE.OBJLoader();//obj模型加载器
            objLoader.setMaterials(material);//给obj模型添加mtl材质
            objLoader.load('./models/AGV.obj', obj3D=>{
                obj3D.scale.set(0.1, 0.1, 0.1)//放大/缩小obj3D对象
                
                obj3D.traverse(child=>{//递归子 模型对象的所有后代
                    if(child instanceof THREE.Mesh){
                        //调整小车初始方向
                        child.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2))
                        child.material.transparent = true;
                    }
                })
                cb && cb(obj3D)
            })
        });

    }


}