function ObjectSelect(_scene, _camera) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var selectedObjects = [];
    /****************************************************************************************************************************
     * 外包围处理*
     * @type {THREE.OutlinePass}
     */

    window.addEventListener( 'click', onMouseClick);
    window.addEventListener('dblclick', onMouseDbClick);

    function onMouseClick(event) {
        var x, y;
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        mouse.x = (x/ window.innerWidth) * 2 - 1;
        mouse.y = -(y/ window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, _camera);
        var intersects = raycaster.intersectObjects([_scene], true);

        if (intersects.length == 0) {
            $("#label").attr("style", "display:none;");//隐藏说明性标签
            return;
        }
        if (intersects[0].object.name == "地面" || (intersects[0].object.name == "") || (intersects[0].object.name == "墙面")) {
            $("#label").attr("style", "display:none;");//隐藏说明性标签
            selectedObjects.pop();
        } else if (intersects[0].object.type == "StoreSign" ||intersects[0].object.type == "Store" || intersects[0].object.type == "StoreGroup"||intersects[0].object.type=='StoreGoods') {
            $("#label").attr("style", "display:block;");// 显示说明性标签
            $("#label").css({left: x, top: y - 40});// 修改标签的位置
            let type=intersects[0].object.type;
            let no=intersects[0].object.uuid;
            let dataShow=new DataShow(type,no);
            selectedObjects.pop();
            selectedObjects.push(intersects[0].object);
            $("#label").html(dataShow.showHint());// 显示模型信
        } else {
            $("#label").attr("style", "display:none;");//隐藏说明性标签


        }
    }

    function onMouseDbClick(event) {
        var x, y;
        x = event.clientX;
        y = event.clientY;
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, _camera);
        var intersects = raycaster.intersectObjects([_scene], true);

        if (intersects.length == 0) {
            $("#label").attr("style", "display:none;");//隐藏说明性标签
            return;
        }
        if (intersects[0].object.name == "地面" || (intersects[0].object.name == "") || (intersects[0].object.name == "墙面")) {
            $("#label").attr("style", "display:none;");//隐藏说明性标签
            selectedObjects.pop();
        } else if (intersects[0].object.type == "Store" || intersects[0].object.type == "StoreGroup") {
            let params = "type=" + intersects[0].object.type + "&no=" + intersects[0].object.uuid;

        } else {
            $("#label").attr("style", "display:block;");// 显示说明性标签
            $("#label").css({left: x, top: y - 40});// 修改标签的位置
            $("#label").text(intersects[0].object.name);// 显示模型信息

            selectedObjects.pop();
            selectedObjects.push(intersects[0].object);
        }
    }
}