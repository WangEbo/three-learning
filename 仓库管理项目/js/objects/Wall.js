// 墙体对象
function Wall(option){
    let group = new THREE.Group();
    let wallOption = {
        objName: option.objectName,
        objType: 'cube',
        length: option.length,
        width: option.width,
        height: option.height,
        position:{
            x: option.position.x,
            y: option.position.y,
            z: option.position.z
        },
        style: option.style
    }

    let wall = new Cube(wallOption);
    if(!utils.hasObj(option.children)){
        wall.type = 'wall';
        return wall
    }
    for(let i = 0;i < option.children.length;i++){
        let optionChildren = option.children[i];
        //窗户洞 门洞
        if(optionChildren.objType == 'wallhole'){
            let hole = new Cube(optionChildren);
            wall = new ObjectCombine(wall ,hole, 2);
            optionChildren.name = option.objectName
        }else if(optionChildren.objType == 'doorFrame'){    //门边框
            let doorFrame = new Cube(optionChildren);
            doorFrame.type = 'doorFrame';
            group.add(doorFrame);
        }else if(optionChildren.objType == 'windowFrame'){  //窗户边框
            let windowFrame = new Cube(optionChildren);
            windowFrame.type = "windowFrame";
            group.add(windowFrame)
        }
    }
    wall.type = 'wall';
    group.add(wall);

    return group
}