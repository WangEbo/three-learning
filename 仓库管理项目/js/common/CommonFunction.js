function CommonFunction() {
}

/**
 * 判断当前对象是否为空对象
 */
CommonFunction.hasObj = function (obj) {
    if (obj != null && typeof (obj) != "undefined") {
        return true;
    } else {
        return false;
    }
},
/**
 * 创建材质
 * length：材质的长
 * width：材质宽度
 * style:材质特性
 */
CommonFunction.createMaterial = function (length, width, style) {
    var color = 0xFF0000;//材质的颜色
    var image = null;//才是是否有贴图
    var texture = null;
    var allowRepeat = 0;//贴图是否设置重复显示
    var transparent = 0;//材质是否透明
    var opacity = 0;//材质透明度
    var depthTest = 1;//材质深度测试
    if (CommonFunction.hasObj(style)) {
        color = style.color || 0xFF0000;
        image = style.image || null;
        allowRepeat = style.allowRepeat || 0;
        transparent = style.transparent || 0;
        opacity = style.opacity || 0;
        depthTest = style.depthTest;
    }
    let material = new THREE.MeshPhongMaterial({map: texture, color: color});
    if (image != null) {
        texture = new THREE.TextureLoader().load(image);
        if (allowRepeat == 1) {
            texture.repeat.x = length / 128;
            texture.repeat.y = width / 128;
            texture.repeat.y = 5;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
        material = new THREE.MeshBasicMaterial({map: texture});
    }
    if (transparent == 1) {
        material.transparent = true;
    }
    if (depthTest == 0) {
        material.depthTest = false;
    }
    material.opacity = opacity;
    return material;
}
/**
 * 转换坐标
 * positionOri：原始坐标
 * positionTrans:转换坐标
 */

CommonFunction.transPosition=function(positionOri,positionTrans)
{

    positionOri.X = positionOri.X + positionTrans.X;
    positionOri.Y = positionOri.Y + positionTrans.Y;
    positionOri.Z = positionOri.Z + positionTrans.Z;
    return positionOri;
}