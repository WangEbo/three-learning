class RouteLine{
    constructor(curve, option){
        let points = curve.getPoints(100)
        let geometry = new THREE.Geometry();

        geometry.vertices = points //给集合体添加曲线获取的 100个顶点
        var material = new THREE.LineBasicMaterial({    //添加基础线条材质
            color: 0x4488ff
        })
        let line = new THREE.Line(geometry, material)
        line.uuid = option.option
        line.name = option.name
        line.type = 'Route'
        return line
    }
}