/*
仓库标签
*/
class StoreSign {
    constructor(option, store3D){
        let optionCube = {
            length: option.Length,
            width: option.Width,
            height: option.Height,
            position: {
                x: option.Position.X,
                y: option.Position.Y,
                z: option.Position.Z
            },
            style: {
                transparent:1,
                opacity:0.2,
                color: 0x17CEBC,
                depthTest:0
            },
        };
        let div=document.createElement("div");
        div.style.width="400px";
        div.style.height="400px";
    
        this.signChart=echarts.init(div);
        let optionChart = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            title: {
                text: option.Name,
    
                textStyle: {
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold'
                },
                left: 'center',
                bottom: '42%',
    
                itemGap: 60,
            },
            tooltip: {
                show: false,
            },
            legend: {
    
            },
            series: [{
                name: '内圈',
                type: 'pie',
                hoverAnimation: false,
                tooltip: {
    
                },
                radius: [0, "38%"],
                color: ['#55a2f2', '#0065ba', '#35a2ff', '#12cbf6'],
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        color: '#fff',
                        formatter: function(params) {
                            return params.value
                        },
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 0,
                    itemStyle: {
                        normal: {
                            color: "rgba(20,198,249,1)"
                        }
                    }
                }, ]
            },
            ]
        };
    
        this.signChart.setOption(optionChart);
    
        let signFihishchart=this.signChart;
        window.onresize = function(){
            signFihishchart.resize();
        }
        this.signChart.on('finished',function () {
            var spriteMap = new THREE.TextureLoader().load(signFihishchart.getDataURL() );
    
            var spriteMaterial = new THREE.SpriteMaterial({
                transparent: true,
                map: spriteMap,
                side: THREE.DoubleSide
            });
    
            let sprite = new THREE.Sprite( spriteMaterial );
            sprite.type='StoreSign';
            sprite.scale.set(250, 250, 1);
            sprite.uuid=option.No;
            sprite.name=option.Name;
            let y= option.Height+50;
            sprite.position.set(option.Position.X, y, option.Position.Z);
            store3D.addObject(sprite);
            store3D.objectLockPointer.push(sprite);
        })
    }
}