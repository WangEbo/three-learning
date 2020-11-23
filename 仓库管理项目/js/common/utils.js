const utils = {};

let MeshCombineType = {
    intersect: 0,   //交集
    union: 1,   //并集
    subtract: 2,   //差集
}

function ObjectCombine(originObject, combineObject, meshCombineType){
    let resultBsp = null;
    let originalBsp = new ThreeBSP(originObject);
    let combineBsp = new ThreeBSP(combineObject);

    if(meshCombineType == MeshCombineType.union){
        resultBsp = originalBsp.union(combineBsp)
    }else if(meshCombineType == MeshCombineType.intersect){
        resultBsp = originalBsp.intersect(combineBsp)
    }else if(meshCombineType == MeshCombineType.subtract){
        resultBsp = originalBsp.subtract(combineBsp)
    }

    let material = originObject.material;
    let result = resultBsp.toMesh(material);
    result.castShadow = true;
    return result
}

utils.hasObj = function (obj){
    return (obj != null && typeof obj != "undefined")
}

utils.createMaterial = function (lenght, width, style){
    var color = 0xff0000;//材质的颜色
    var image = null;//材质的贴图
    var texture = null;
    var allowReapeat = 0;//是否允许重复显示
    var transparent = 0;//是否允许透明
    var opacity = 1;//材质透明度
    var depthTest = 1;//材质深度测试

    if(utils.hasObj(style)){
        color = style.color || 0xff0000;
        image = style.image || null;
        allowRepeat = style.allowRepeat || 0;
        transparent = style.transparent || 0;
        opacity = style.opacity || 0;
        depthTest = style.depthTest;
    }

    let material = new THREE.MeshPhongMaterial({
        map: texture,
        color: color
    })
    if(image != null){
        texture = new THREE.TextureLoader().load(image);
        if(allowRepeat == 1){
            texture.repeat.x = lenght / 120;
            texture.repeat.y = width / 120;
            texture.repeat.y = 5;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
        material = new THREE.MeshBasicMaterial({map: texture})
    }
    if(transparent == 1){
        material.transparent = true
    }
    if(depthTest == 0){
        material.depthTest = false
    }
    material.opacity = opacity
    return material
}