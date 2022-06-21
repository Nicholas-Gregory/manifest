abstract class Vector
{
    abstract get_length(): number;
    abstract normalize(): Vector;
    abstract add_elements(vector: Vector): Vector;
    abstract subtract_elements(vector: Vector): Vector;
    abstract scale(factor: number): Vector;
    abstract negate(): Vector;
    abstract dot_product(vector: Vector): number;
    abstract equals(vector: Vector): boolean;
    constructor()
    {

    }
}

interface vector_data
{
    x: number;
    y: number;
    z?: number;
    w?: number;
}

class Vector2D extends Vector
{
    x: number = 0;
    y: number = 0;
    constructor()
    constructor(x: number, y: number)
    constructor(data: vector_data)
    constructor(data: number[])
    constructor(xOrData?: number | vector_data | number[], y?: number)
    {
        super();
        if ((typeof xOrData === "number") && (typeof y === "number")) {
            this.x = xOrData;
            this.y = y;
        } else if (typeof xOrData === "object")
        {
            if ("x" in xOrData)
            {
                this.x = xOrData.x;
                this.y = xOrData.y;
            } else 
            {
                this.x = xOrData[0];
                this.y = xOrData[1];
            }
        }
    }
    get_length(): number 
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    normalize(): Vector2D 
    {
        let mag = this.get_length();
        return new Vector2D(this.x / mag, this.y / mag);
    }
    add_elements(vector: Vector2D): Vector2D 
    {
        let result = new Vector2D(this.x + vector.x, this.y + vector.y);
        return result;
    }
    subtract_elements(vector: Vector2D): Vector2D 
    {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }
    scale(factor: number): Vector2D 
    {
        return new Vector2D(this.x * factor, this.y * factor);
    }
    negate(): Vector2D 
    {
        return this.scale(-1);
    }
    dot_product(vector: Vector2D): number 
    {
        return this.x * vector.x + this.y * vector.y;
    }
    equals(vector: Vector2D): boolean 
    {
        return (this.x === vector.x) && (this.y === vector.y);
    }
}

class Vector3D extends Vector
{
    x: number = 0;
    y: number = 0;
    z: number = 0;
    constructor()
    constructor(data: vector_data)
    constructor(data: number[])
    constructor(x: number, y: number, z: number)
    constructor(xOrData?: number | vector_data |  number[], y?:number, z?: number)
    {
        super();
        if ((typeof xOrData === "number") && (typeof y === "number") && (typeof z === "number"))
        {
            this.x = xOrData;
            this.y = y;
            this.z = z;
        } else if (typeof xOrData === "object")
        {
            if ("x" in xOrData)
            {
                if (typeof xOrData.z !== "undefined")
                {
                    this.x = xOrData.x;
                    this.y = xOrData.y;
                    this.z = xOrData.z;
                } else
                {
                    throw "3D vectors require a z component";
                }
            } else 
            {
                if (xOrData.length === 3)
                {
                    this.x = xOrData[0];
                    this.y = xOrData[1];
                    this.z = xOrData[2];
                } else
                {
                    throw "3D vectors require 3 components";
                }
            }
        }
    }
    get_length(): number 
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.x * this.x));
    }
    normalize(): Vector3D 
    {
        let mag = this.get_length();
        return new Vector3D(this.x / mag, this.y / mag, this.z / mag);
    }
    add_elements(vector: Vector3D): Vector3D 
    {
        let result = new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
        return result;
    }
    subtract_elements(vector: Vector3D): Vector3D 
    {
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
    scale(factor: number): Vector3D 
    {
        return new Vector3D(this.x * factor, this.y * factor, this.z * factor);
    }
    negate(): Vector3D 
    {
        return this.scale(-1);
    }
    cross_product(vector: Vector3D): Vector3D
    {
        return new Vector3D(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
    }
    dot_product(vector: Vector3D): number 
    {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    equals(vector: Vector3D): boolean 
    {
        return (this.x === vector.x) && (this.y === vector.y) && (this.z === vector.z);
    }
}

class Vector4D extends Vector
{
    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 0;
    constructor()
    constructor(data: vector_data)
    constructor(data: number[])
    constructor(x: number, y: number, z: number, w: number)
    constructor(xOrData?: number | vector_data | number[], y?: number, z?: number, w?: number)
    {
        super();
        if ((typeof xOrData === "number") && (typeof y === "number") && (typeof z === "number") && (typeof w === "number"))
        {
            this.x = xOrData;
            this.y = y;
            this.z = z;
            this.w = w;
        } else if (typeof xOrData === "object")
        {
            if ("x" in xOrData)
            {
                if ((typeof xOrData.z !== "undefined") && (typeof xOrData.w !== "undefined"))
                {
                    this.x = xOrData.x;
                    this.y = xOrData.y;
                    this.z = xOrData.z;
                    this.w = xOrData.w;
                } else
                {
                    throw "4D vectors require a z and w component";
                }
            } else
            {
                if (xOrData.length === 4)
                {
                    this.x = xOrData[0];
                    this.y = xOrData[1];
                    this.z = xOrData[2];
                    this.w = xOrData[3];
                } else
                {
                    throw "4D vectors require 4 components";
                }
            }
        }
    }
    get_length(): number 
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w)); 
    }
    normalize(): Vector4D 
    {
        let mag = this.get_length();
        return new Vector4D(this.x / mag, this.y / mag, this.z / mag, this.w / mag);
    }
    add_elements(vector: Vector4D): Vector4D 
    {
        let result = new Vector4D(this.x + vector.x, this.y + vector.y, this.z + vector.z, this.w + vector.w);
        return result;
    }
    subtract_elements(vector: Vector4D): Vector4D 
    {
        return new Vector4D(this.x - vector.x, this.y - vector.y, this.z - vector.z, this.w - vector.w);    
    }
    scale(factor: number): Vector4D 
    {
        return new Vector4D(this.x * factor, this.y * factor, this.z * factor, this.w * factor);
    }
    negate(): Vector4D 
    {
        return this.scale(-1);
    }
    dot_product(vector: Vector4D): number 
    {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;    
    }
    equals(vector: Vector4D): boolean 
    {
        return (this.x === vector.x) && (this.y === vector.y) && (this.z === vector.z) && (this.w === vector.w);
    }
}

//tests
let vec2 = new Vector2D(2, 3);
console.log("Initialized via values in constructor: x: " + vec2.x + " y: " + vec2.y);
vec2 = new Vector2D();
vec2.x = 4; 
vec2.y = 5;
console.log("Initialized after constructor call: x: " + vec2.x + " y: " + vec2.y);
vec2 = new Vector2D([1, 2]);
console.log("Initialized with array: x: " + vec2.x + " y: " + vec2.y);
vec2 = new Vector2D({x: 5, y: 6});
console.log("Initialized with object: x: " + vec2.x + " y: " + vec2.y);