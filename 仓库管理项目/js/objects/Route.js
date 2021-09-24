class Route{
    constructor(option){
        let curvePoints = new Array();
        for(let i=0;i<option.points.length;i++){
            let point = option.points[i]
            curvePoints.push(new THREE.Vector3(point.x, point.y, point.z))//将顶点坐标添加至曲线数组
        }
        //创建三维样条曲线 ， 可以通过getPonits 获得更多的顶点
        let curve = new THREE.CatmullRomCurve3(
            curvePoints,
            false,/*是否闭合，默认闭合false*/ 
            'catmullrom'/*曲线类型，默认centripetal*/,
            0.01/*曲线的张力*/)
        return curve
    }
}