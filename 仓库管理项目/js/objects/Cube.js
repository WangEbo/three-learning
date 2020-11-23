// 立方体类
class Cube{
    constructor(option) {
        this.length = option.length || 1
        this.width = option.width || 1
        this.height = option.height || 1

        this.Name = option.objectName;

        this.positionX = option.position.x || 0
        this.positionY = option.position.y || 0
        this.positionZ = option.position.z || 0

        this.style = option.style || {
            color: 0xff0000
        }

        let curMaterial = utils.createMaterial(this.width, this.height, this.style);
        let cubeGeometry = new THREE.BoxGeometry(this.length, this.height, this.width);
        let cube = new THREE.Mesh(cubeGeometry, curMaterial);

        cube.name = this.Name;

        cube.position.x = this.positionX;
        cube.position.y = this.positionY;
        cube.position.z = this.positionZ;

        return cube
    }
}