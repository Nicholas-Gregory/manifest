import { Engine } from "./Engine.js"

let engine = new Engine(640, 480, "game");
let gl = engine.gl;

gl?.clearColor(1, 0, 0, 1);
gl?.clear(gl.COLOR_BUFFER_BIT);