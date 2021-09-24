
/**
 * 获取类
 * @param optionGroup
 * @param optionBin
 * @constructor
 */
function StoreGoods(optionGroup,optionBin) {

    if(!CommonFunction.hasObj(optionGroup)||!CommonFunction.hasObj(optionBin))
        return;
    let col=optionBin.Col;
    let layer=optionBin.Layer;
    /*
        支架的高=最底层的高度+(库位数-1)*库位的高度
     */
    let shelfHeight=optionGroup.BottomHeight+(optionGroup.BinYNum)*optionGroup.BinHeight;
    /*
     支架的宽=库位数乘以库位的宽度
     */
    let shelfWidth=optionGroup.BinZNum*optionGroup.BinWidth;

    this.positionX=optionGroup.Position.X;
    this.positionY=optionGroup.Position.Y-shelfHeight/2+optionGroup.BinHeight/2+(layer-1)*optionGroup.BinHeight+optionGroup.BottomHeight;
    this.positionZ=optionGroup.Position.Z+shelfWidth/2-optionGroup.BinWidth/2-(col-1)*optionGroup.BinWidth;

    this.no=optionBin.No;
    this.name=optionBin.Name;

    this.length=optionGroup.BinLength-6;
    this.width=optionGroup.BinWidth-6;
    this.height=optionGroup.BinHeight-6;

    if(optionBin.IsLoad=="0")
    {
        this.color=0x46C191;
        this.opacity=0.1;
    }

    else if(optionBin.State=="1")
    {
        this.color=0x46C191;
        this.opacity=0.8;
    }
    else if(optionBin.State=="2")
    {
        this.color=0xF0CD3F;
        this.opacity=0.8;
    }
    else if(optionBin.State=="3")
    {
        this.color=0xF55E35;
        this.opacity=0.8;
    }
    else
    {
        this.color=0x46C191;
        this.opacity=0.1;
    }

}
StoreGoods.prototype.create=function () {
    let optionCube = {
        length: this.length,
        width: this.width,
        height: this.height,
        position: {
            x: this.positionX,
            y: this.positionY,
            z: this.positionZ
        },
        style: {
            transparent:1,
            opacity:this.opacity,
            color: this.color,
            depthTest:1
        },
    };
    let cube = new Cube(optionCube);
    cube.uuid=this.no;
    cube.name=this.name;
    cube.type="StoreGoods";
    return cube;
}
StoreGoods.prototype.clone=function (object) {
   let goods=object.clone();
   goods.position.set(this.positionX,this.positionY,this.positionZ);
   goods.uuid=this.no;
   goods.name=this.name;
   goods.type="StoreGoods";
   return goods;
}