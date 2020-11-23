const buildingObjects = {
    objects :[
        {
            objectName:'floor',
            objectType:'cube',
            length:3400,
            width:1200,
            height:1,
            position:{
                x:0,
                y:0,
                z:0
            },
            style:{
                color:0x5f7480,
                image:'img/floor.jpg',
                allowRepeat:1
            }
        },
        {
            objectName: 'backWall',
            objectType: 'cube',
            length: 3400,
            width: 20,
            height: 400,
            position: {
                x: 0,
                y: 200,
                z: -600
            },
            style:{
                color: 0x5f7480
            }
        },
        {
            objectName: 'frontWall',
            objectType: 'wall',
            length: 3400,
            width: 20,
            height: 400,
            position: {
                x: 0,
                y: 200,
                z: 600
            },
            style:{
                color: 0x5f7480
            },
            children: [
                //门洞
                {
                    objectName: 'doorHole',
                    objType: 'wallhole',
                    length: 300,
                    width:20,
                    height:300,
                    position:{
                        x: 0,
                        y: 150,
                        z: 600
                    },
                    style:{
                        image:'img/door_left.png',
                    }
                },
                {
                    objectName: 'leftDoorFrame',
                    objType: 'doorFrame',
                    length: 150,
                    width:10,
                    height:300,
                    position:{
                        x: -75.5,
                        y: 150,
                        z: 600
                    },
                    style:{
                        image:'img/door_left.png',
                        opacity: 0.8,
                        transparent:1
                    }
                },
                {
                    objectName: 'rightDoorFrame',
                    objType: 'doorFrame',
                    length: 150,
                    width:10,
                    height:300,
                    position:{
                        x: 75.5,
                        y: 150,
                        z: 600
                    },
                    style:{
                        image:'img/door_right.png',
                        opacity: 0.8,
                        transparent:1
                    }
                },
                {
                    objectName: 'windowHole',
                    objType: 'wallhole',
                    length: 240,
                    width:20,
                    height:240,
                    position:{
                        x: -800,
                        y: 200,
                        z: 600
                    }
                },
                {
                    objectName: 'leftWindowFrame',
                    objType: 'windowFrame',
                    length: 240,
                    width:20,
                    height:240,
                    position:{
                        x: -800,
                        y: 200,
                        z: 600
                    },
                    style:{
                        image:'img/window.png',
                        opacity: 0.6,
                        transparent: 1
                    }
                },
                {
                    objectName: 'windowHole',
                    objType: 'wallhole',
                    length: 240,
                    width:20,
                    height:240,
                    position:{
                        x: 800,
                        y: 200,
                        z: 600
                    }
                },
                {
                    objectName: 'rightWindowFrame',
                    objType: 'windowFrame',
                    length: 240,
                    width:20,
                    height:240,
                    position:{
                        x: 800,
                        y: 200,
                        z: 600
                    },
                    style:{
                        image:'img/window.png',
                        opacity: 0.6,
                        transparent: 1
                    }
                },
            ]
        },
        {
            objectName: 'leftWall',
            objectType: 'cube',
            length: 20,
            width: 1200,
            height: 400,
            position: {
                x: -1700,
                y: 200,
                z: 0
            },
            style:{
                color: 0x5f7480
            }
        },
        {
            objectName: 'wall',
            objectType: 'cube',
            length: 20,
            width: 1200,
            height: 400,
            position: {
                x: 1700,
                y: 200,
                z: 0
            },
            style:{
                color: 0x5f7480
            }
        },
    ]
}