
/*
option参数含义
Length:长
Width:宽
positionX：x轴位置
positionY：y轴位置
color:创建的默认6个面的颜色值
 */

class StoreArea{
    constructor(option, store){
        this.store = store;
        var LineMat = new THREE.MeshLambertMaterial({color:0xDFCE19,NeedsUpdate: 1});

        this.BorderWidth = 8;
        this.PositionY = 2.5;
        this.Length = option.Length || 1;
        this.Width = option.Width || 1;

        this.positionX = option.Position.X||0;
        this.positionZ = option.Position.Z||0;
        //水平线
        var horizonalLineGeometry=new THREE.PlaneGeometry(this.BorderWidth, this.Length);
        //垂直线
        var verticalLineGeometry=new THREE.PlaneGeometry(this.BorderWidth ,this.Width + this.BorderWidth * 2);

        //根据库区中心 计算出 线条的中心
        var topLine = new THREE.Mesh( horizonalLineGeometry, LineMat );
        var topLineZ = this.positionZ - this.Width / 2 - this.BorderWidth / 2;
        topLine.position.set(this.positionX, this.PositionY, topLineZ);
        topLine.rotation.x = -Math.PI / 2.0;
        topLine.rotation.z = -Math.PI / 2.0;
        //下线条
        var downLine = topLine.clone();
        downLine.position.z= -topLineZ;

        //左线条
        var leftLine=new THREE.Mesh( verticalLineGeometry, LineMat );
        leftLine.position.set(this.positionX - this.Length/2 - this.BorderWidth/2, this.PositionY, this.positionZ);
        leftLine.rotation.x = -Math.PI / 2.0;
        //右线条
        var rightLine=leftLine.clone();
        rightLine.position.x = rightLine.position.x + this.Length + this.BorderWidth;

        var positionY= this.PositionY;
        var positionX= this.positionX;
        var positionZ= this.positionZ;
        var group=new THREE.Group();
        group.add(topLine);
        group.add(downLine);
        group.add(leftLine);
        group.add(rightLine);

        new THREE.FontLoader().load('/仓库管理项目/fonts/FZYaoTi_Regular.json',function(font){
            ////加入立体文字
            var text= new THREE.TextGeometry(option.Title.Text,{
                // 设定文字字体
                font:font,
                //尺寸
                size:option.Title.FontSize,
                //厚度
                height:0.1
            });
            text.computeBoundingBox();
            //3D文字材质
            var m = new THREE.MeshStandardMaterial({color:"#" + option.Title.TextColor});
            var mesh = new THREE.Mesh(text,m);

            mesh.position.y = positionY;
            mesh.position.z = option.Title.Position.Z+positionZ;
            mesh.position.x = option.Title.Position.X+positionX;
            mesh.rotation.x = -Math.PI / 2.0;
            mesh.name=option.Name;
            // mesh.id=option.No;
            group.add(mesh);
        });

        return group;
    }

    static loadData(){ //ajax请求返回一个 包含库区数据的 promise
        return new Promise((resolve, reject)=> {
            $.ajax({
                url: "http://47.104.67.107:8082//api/Store",
                type: 'GET',
                dataType: 'JSON',
                data: {},
                success: function (data) {
                    // window.localStorage.setItem('Store3DData',data);
                    let obj = JSON.parse(data)
                    window.store.Store3DData = JSON.parse(JSON.stringify(obj));
                    
                    resolve(obj)
                },
                error(err){
                    reject(err)
                }
            });
        }).catch(err=> {
            alert(err)
        })
    }
}