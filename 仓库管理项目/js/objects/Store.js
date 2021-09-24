class Store{
    constructor(option){
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
        let cube = new Cube(optionCube);
        cube.name=option.Name;
        cube.uuid=option.No;
        cube.type="Store";
        return cube;
    }
}