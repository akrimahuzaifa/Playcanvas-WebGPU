# WebGPU PlayCanvas Experiment

This project explores switching PlayCanvas from WebGL2 to WebGPU for rendering.

# Status

**WebGPU is now working!**  
The project successfully initializes PlayCanvas with WebGPU as the graphics backend.

---


## What Has Been Tried

### 1. Hardware & Environment
- **Laptop:** Windows 11, Intel i7-13700HX, 16GB RAM, NVIDIA RTX 4060 Laptop GPU
- **GPU Driver:** Version 32.0.15.7680 (dated 12/06/2025)
- **Browser:** Latest Chrome with WebGPU enabled (`chrome://flags/#enable-unsafe-webgpu`)
- **PlayCanvas Version:** 2.10.3 (from `package.json`)
- **Bundler:** Vite 7.0.6

### 2. [Code Changes](main.ts)
- Attempted to initialize PlayCanvas with WebGPU:
  ```typescript
  const gfxOptions = {
      deviceTypes: [pc.DEVICETYPE_WEBGPU],
      glslangUrl: 'static/js/glslang.min.js', //[downloaded from](https://www.jsdelivr.com/package/npm/glsl-canvas-js)
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
  ```

  - Also tried this as well 
  ```typescript
  const app = new pc.Application(canvas, {
     graphicsDeviceOptions: {
         deviceTypes: ['webgpu'] // or deviceTypes: [pc.DEVICETYPE_WEBGPU]
     }
    });
  ```
- Checked device type in console:
  ```typescript
  console.log('Graphics Device Type:', app.graphicsDevice.deviceType);
  ```
- Checked browser WebGPU support:
  ```typescript
  if ('gpu' in navigator) {
      console.log('WebGPU is supported in this browser.');
  } else {
      console.log('WebGPU is NOT supported in this browser.');
  }
  ```

### 3. Results
- Console output shows:  
  `Graphics Device Type: webgl2`  
  `WebGPU is supported in this browser.`
- Indicates PlayCanvas is falling back to WebGL2, even though browser supports WebGPU.

### 4. Troubleshooting Steps
- Restarted computer and browser.
- [Verified browser flags for WebGPU (ENABLED)](chrome://flags/#enable-unsafe-webgpu).
    - Unsafe WebGPU Support (enabled)
    - Force High Performance GPU (enabled)
    - WebGPU Developer Features (enabled)

- Confirmed hardware and driver compatibility.
- Checked for errors in browser console (none related to WebGPU initialization).

### 5. Next Steps
- Upgrade PlayCanvas to the latest version refer to [package.json](package.json) (`npm install playcanvas@latest`) as WebGPU support after 1.6 .
- Re-test initialization after upgrade.

---

## References to forum i already explored and tested
- [PlayCanvas WebGPU](https://forum.playcanvas.com/t/how-can-i-use-webgpu-in-playcanvas/32656/5)
- [Renderer settings in engine-only project?](https://forum.playcanvas.com/t/solved-renderer-settings-in-engine-only-project/32245)