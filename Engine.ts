interface shader_store
{
    [index: string]: WebGLShader;
}

export class Engine
{
    game_element: HTMLElement | null;
    canvas_element: HTMLCanvasElement | null;
    gl: WebGLRenderingContext | null;
    shaders: shader_store;
    title: string;
    constructor(width: number, height: number, title: string)
    {
        let element: HTMLElement | null = document.getElementById("game");
        if (element)
        {
            this.game_element = element;
            let canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.setAttribute("id", "game_canvas");
            canvas.setAttribute("width", ""+width);
            canvas.setAttribute("height", ""+height);
            this.canvas_element = canvas;
            this.game_element.appendChild(this.canvas_element);
            let gl = this.canvas_element.getContext("webgl");
            if (gl)
            {
                this.gl = gl;
            } else{
                console.log("Webgl context creation failed")
                this.gl = null;
            }
        } else
        {
            console.log("Failed to get element. engine.game_element = null.");
            this.game_element = null;
            this.canvas_element = null;
            this.gl = null;
        }
        this.shaders = {};
        this.title = title;
        let title_element = document.createElement("title");
        title_element.text = title;
        document.head.appendChild(title_element);
    }
    add_shader(type: GLenum, source: string, name: string)
    {
        let gl = this.gl;
        let shader = gl?.createShader(type);
        if (shader)
        {
            gl?.shaderSource(shader as WebGLShader, source);
            gl?.compileShader(shader);
            if (gl?.getShaderParameter(shader, gl.COMPILE_STATUS))
            {
                this.shaders[name] = shader;
            }
        }
    }
}

export function create_program(engine: Engine, vertex_shader_name: string, fragment_shader_name: string): WebGLProgram | null | undefined
{
    let gl = engine.gl;
    let program = gl?.createProgram();
    if (program)
    {
        gl?.attachShader(program, engine.shaders[vertex_shader_name]);
        gl?.attachShader(program, engine.shaders[fragment_shader_name]);
        gl?.linkProgram(program);        
    }
    return program;
}