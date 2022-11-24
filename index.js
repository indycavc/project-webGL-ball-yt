import * as THREE from './three.js-master/build/three.module.js'

var scene, camera, renderer

const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(20, 7, 11)
    camera.lookAt(0,0,0)
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true
}

const useTexture = (image) => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(image)

    return texture
}

const createBoxGeometry = () => {
    const boxGeometry = new THREE.BoxGeometry(
        6, 5, 3
    )
    const boxMaterial = new THREE.MeshPhongMaterial({
        color: "#FF0000"
    })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)

    boxMesh.castShadow = true
    return boxMesh
}

const createCircleGeometry = () => {
    const circleGeometry = new THREE.CircleGeometry(
        1.4, 3
    )
    const circleMaterial = new THREE.MeshBasicMaterial({
        color: "#FFFFFF"
    })
    const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial)

    circleMesh.castShadow = true
    return circleMesh
}

const createPlaneGeometry = () => {
    const planeGeometry = new THREE.PlaneGeometry(
        50, 50
    )
    const texture = useTexture('./assets/sapphire.jpg')
    const planeMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture
    })
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

    planeMesh.receiveShadow = true
    return planeMesh
}

const createSphereGeometry = () => {
    const sphereGeometry = new THREE.SphereGeometry(2)
    const textureMap = useTexture('./assets/MetalScifi/Metal_Sci-fi_003_basecolor.jpg')
    const textureNormal = useTexture('./assets/MetalScifi/Metal_Sci-fi_003_normal.jpg')
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: "#778899",
        shininess: 7,
        specular: "#FFFFFF",
        map: textureMap,
        normalMap: textureNormal
    })
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

    sphereMesh.castShadow = true
    return sphereMesh
}

const createSpotLight = () => {
    const spotLight = new THREE.SpotLight(
        "#FFFFFF", 0.8, 1000, 
        Math.PI/6
    )
    spotLight.castShadow = true
    
    return spotLight
}

const createDirectionalLight = () => {
    const directionalLight = new THREE.DirectionalLight(
        "#FFFFFF", 0.5
    )
    directionalLight.castShadow = true

    return directionalLight
}

window.onload = () => {
    init()

    let boxGeometry = createBoxGeometry()
    boxGeometry.position.x = 7.5
    boxGeometry.position.y = 3.5
    boxGeometry.rotateY(Math.PI/5)

    let circleGeometry = createCircleGeometry()
    circleGeometry.position.x = 8.5
    circleGeometry.position.y = 3.6
    circleGeometry.position.z = 1.5
    circleGeometry.rotateY(Math.PI/5)

    let planeGeometry = createPlaneGeometry()
    planeGeometry.position.x = 1
    planeGeometry.position.y = 1
    planeGeometry.position.z = 2
    planeGeometry.rotateX(Math.PI/2)
    planeGeometry.rotateZ(Math.PI/3)

    let sphereGeometry = createSphereGeometry()
    sphereGeometry.position.x = 6
    sphereGeometry.position.y = 3
    sphereGeometry.position.z = 9

    let spotLight = createSpotLight()
    spotLight.position.x = 10
    spotLight.position.y = 40
    spotLight.position.z = 5
    spotLight.shadow.mapSize.width = 2048
    spotLight.shadow.mapSize.height = 2048
    spotLight.target = boxGeometry

    let directionalLight = createDirectionalLight()
    directionalLight.position.x = 7
    directionalLight.position.y = 2
    directionalLight.position.z = 5
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.target = boxGeometry

    scene.add(boxGeometry)
    scene.add(circleGeometry)
    scene.add(planeGeometry)
    scene.add(sphereGeometry)
    scene.add(spotLight)
    scene.add(directionalLight)

    const render = () => {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()
}

