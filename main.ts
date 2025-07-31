import * as pc from 'playcanvas';

// create an application
const canvas = document.getElementById('application') as HTMLCanvasElement;
const app = new pc.Application(canvas, {
    // graphicsDeviceOptions: {
    //     deviceTypes: ['webgpu'] // Use WebGPU
    // }
});

const gfxOptions = {
    deviceTypes: [pc.DEVICETYPE_WEBGPU],
    glslangUrl: 'static/js/glslang.min.js',
    //twgslUrl: 'static/js/twgsl.min.js',
    antialias: false
};
pc.createGraphicsDevice(canvas, gfxOptions).then((device: pc.GraphicsDevice) => {
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.graphicsDevice.initOptions = gfxOptions;
    app.start();
    console.log('Graphics Device:', device);
}).catch((error: Error) => {
    console.error('Failed to create graphics device:', error);
});

// create a camera
const camera = new pc.Entity();
camera.addComponent('camera', {
    clearColor: new pc.Color(0.3, 0.3, 0.7)
});
camera.setPosition(0, 0, 3);
app.root.addChild(camera);

// create a light
const light = new pc.Entity();
light.addComponent('light');
light.setEulerAngles(45, 45, 0);
app.root.addChild(light);

// create a box
const box = new pc.Entity();
box.addComponent('model', {
    type: 'box'
});
app.root.addChild(box);

// rotate the box
app.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));

// log the graphics device type and WebGPU support
console.log('Graphics Device Type:', app.graphicsDevice.deviceType);
if ('gpu' in navigator) {
    console.log('WebGPU is supported in this browser.');
} else {
    console.log('WebGPU is NOT supported in this browser.');
}