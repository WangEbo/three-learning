
/*
type:  1：正常每排
       2：动画利用率
 */
function StoreGroup(option,type) {
    let optionOpacity=0.3;
    let optionColor=0xF5B8B8;
    let optionType='StoreGroup';
    if(type==2)
    {
        optionOpacity=0.6;
        optionColor=0x13CD6A;
        optionType="StoreRoomRate";
    }

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
                opacity:optionOpacity,
                color: optionColor,
                depthTest:0
        },
    };
    let cube = new Cube(optionCube);
    cube.uuid=option.No;
    cube.name=option.Name;
    cube.type=optionType;
    return cube;
}