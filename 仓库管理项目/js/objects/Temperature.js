function Temperature(option,store3D) {
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
    let div=document.createElement("divTemperature");
    div.style.width="400px";
    div.style.height="400px";

    var TP_value = 40;
    var kd = [];
    var Gradient = [];
    var leftColor = '';
    var showValue = '';
    var boxPosition = [65, 0];
    var TP_txt = ''
    // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
    for(var i = 0, len = 135; i <= len; i++) {
        if(i < 10 || i > 130) {
            kd.push('')
        } else {
            if((i - 10) % 20 === 0) {
                kd.push('-3');
            } else if((i - 10) % 4 === 0) {
                kd.push('-1');
            } else {
                kd.push('');
            }
        }

    }
    //中间线的渐变色和文本内容
    if(TP_value > 20) {
        TP_txt = '温度偏高';
        Gradient.push({
            offset: 0,
            color: '#93FE94'
        }, {
            offset: 0.5,
            color: '#E4D225'
        }, {
            offset: 1,
            color: '#E01F28'
        })
    } else if(TP_value > -20) {
        TP_txt = '温度正常';
        Gradient.push({
            offset: 0,
            color: '#93FE94'
        }, {
            offset: 1,
            color: '#E4D225'
        })
    } else {
        TP_txt = '温度偏低';
        Gradient.push({
            offset: 1,
            color: '#93FE94'
        })
    }
    if(TP_value > 62) {
        showValue = 62
    } else {
        if(TP_value < -60) {
            showValue = -60
        } else {
            showValue = TP_value
        }
    }
    if(TP_value < -10) {
        boxPosition = [65, -120];
    }
    leftColor = Gradient[Gradient.length - 1].color;
    // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
    var optionChart = {
        backgroundColor: 'rgba(84, 173, 155, 0.2)',
        title: {
            text: '温度计',
            show: false
        },
        yAxis: [{
            show: false,
            data: [],
            min: 0,
            max: 135,
            axisLine: {
                show: false
            }
        }, {
            show: false,
            min: 0,
            max: 50,
        }, {
            type: 'category',
            data: ['', '', '', '', '', '', '', '', '', '', '°C'],
            position: 'left',
            offset: -80,
            axisLabel: {
                fontSize: 10,
                color: 'white'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
        }],
        xAxis: [{
            show: false,
            min: -10,
            max: 80,
            data: []
        }, {
            show: false,
            min: -10,
            max: 80,
            data: []
        }, {
            show: false,
            min: -10,
            max: 80,
            data: []
        }, {
            show: false,
            min: -5,
            max: 80,

        }],
        series: [{
            name: '条',
            type: 'bar',
            // 对应上面XAxis的第一个对)象配置
            xAxisIndex: 0,
            data: [{
                value: (showValue + 70),
                label: {
                    normal: {
                        show: true,
                        position: boxPosition,

                        width: 200,
                        height: 100,
                        formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}',
                        rich: {
                            back: {
                                align: 'center',
                                lineHeight: 50,
                                fontSize: 100,
                                fontFamily: 'digifacewide',
                                color: leftColor
                            },
                            unit: {
                                fontFamily: '微软雅黑',
                                fontSize: 60,
                                lineHeight: 50,
                                color: leftColor
                            },
                            downTxt: {
                                lineHeight: 100,
                                fontSize: 60,
                                align: 'center',
                                color: '#E01F28'
                            }
                        }
                    }
                }
            }],

            barWidth: 18,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
                }
            },
            z: 2
        }, {
            name: '白框',
            type: 'bar',
            xAxisIndex: 1,
            barGap: '-100%',
            data: [134],
            barWidth: 28,
            itemStyle: {
                normal: {
                    color: '#0C2E6D',
                    barBorderRadius: 50,
                }
            },
            z: 1
        }, {
            name: '外框',
            type: 'bar',
            xAxisIndex: 2,
            barGap: '-100%',
            data: [135],
            barWidth: 38,
            itemStyle: {
                normal: {
                    color: '#4577BA',
                    barBorderRadius: 50,
                }
            },
            z: 0
        }, {
            name: '圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 0,
            symbolSize: 48,
            itemStyle: {
                normal: {
                    color: '#93FE94',
                    opacity: 1,
                }
            },
            z: 2
        }, {
            name: '白圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 1,
            symbolSize: 60,
            itemStyle: {
                normal: {
                    color: '#0C2E6D',
                    opacity: 1,
                }
            },
            z: 1
        }, {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 2,
            symbolSize: 70,
            itemStyle: {
                normal: {
                    color: '#4577BA',
                    opacity: 1,
                }
            },
            z: 0
        }, {
            name: '刻度',
            type: 'bar',
            yAxisIndex: 0,
            xAxisIndex: 3,
            label: {
                normal: {
                    show: true,
                    position: 'left',
                    distance: 10,
                    color: 'white',
                    fontSize: 14,
                    formatter: function(params) {
                        if(params.dataIndex > 130 || params.dataIndex < 10) {
                            return '';
                        } else {
                            if((params.dataIndex - 10) % 20 === 0) {
                                return params.dataIndex - 70;
                            } else {
                                return '';
                            }
                        }
                    }
                }
            },
            barGap: '-100%',
            data: kd,
            barWidth: 1,
            itemStyle: {
                normal: {
                    color: 'white',
                    barBorderRadius: 120,
                }
            },
            z: 0
        }]
    };


    this.signChart=echarts.init(div);

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

        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.type='Temperature';
        sprite.scale.set(250, 250, 1)
        let y= option.Height+200;
        sprite.position.set(option.Position.X, y, option.Position.Z);
        //store3D.addObject(sprite);
        store3D.objectLockPointer.push(sprite);
    })
}
Temperature.prototype.refresh=function (value) {
    let option=this.signChart.getOption();
    let TP_value = value;
    let Gradient = [];
    let leftColor = '';
    let showValue = '';
    let boxPosition = [65, 0];
    let TP_txt = '';
    //中间线的渐变色和文本内容
    if(TP_value > 20) {
        TP_txt = '温度偏高';
        Gradient.push({
            offset: 0,
            color: '#93FE94'
        }, {
            offset: 0.5,
            color: '#E4D225'
        }, {
            offset: 1,
            color: '#E01F28'
        })
    } else if(TP_value > -20) {
        TP_txt = '温度正常';
        Gradient.push({
            offset: 0,
            color: '#93FE94'
        }, {
            offset: 1,
            color: '#E4D225'
        })
    } else {
        TP_txt = '温度偏低';
        Gradient.push({
            offset: 1,
            color: '#93FE94'
        })
    }
    if(TP_value > 62) {
        showValue = 62
    } else {
        if(TP_value < -60) {
            showValue = -60
        } else {
            showValue = TP_value
        }
    }
    if(TP_value < -10) {
        boxPosition = [65, -120];
    }
    leftColor = Gradient[Gradient.length - 1].color;
    option.series[0].data[0].label.formatter='{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}';
    option.series[0].itemStyle.color=new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient);
    option.series[0].data[0].label.rich.back.color=leftColor;
    option.series[0].data[0].label.rich.unit.color=leftColor;
    option.series[0].data[0].value=(showValue + 70);
    option.series[0].data[0].label.position=boxPosition;
    this.signChart.setOption(option);
}
