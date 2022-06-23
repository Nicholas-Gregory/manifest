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
    angle(vector: Vector): number
    {
        return Math.acos(this.normalize().dot_product(vector.normalize()));
    }
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
    constructor(vector: Vector2D)
    constructor(xOrData?: number | vector_data | number[] | Vector2D, y?: number)
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
            } else if(xOrData instanceof Vector2D)
            {
                this.x = xOrData.x;
                this.y = xOrData.y;
            } 
            else 
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
    constructor(vector: Vector3D)
    constructor(xOrData?: number | vector_data |  number[] | Vector3D, y?:number, z?: number)
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
            } else if (xOrData instanceof Vector3D)
            {
                this.x = xOrData.x;
                this.y = xOrData.y;
                this.z = xOrData.z;
            } 
            else 
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
    constructor(vector: Vector4D)
    constructor(xOrData?: number | vector_data | number[] | Vector4D, y?: number, z?: number, w?: number)
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
            } else if (xOrData instanceof Vector4D)
            {
                this.x = xOrData.x;
                this.y = xOrData.y;
                this.z = xOrData.z;
                this.w = xOrData.w;
            } 
            else
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

class Matrix
{
    data: Vector[] | undefined;
    constructor()
    constructor(data: Vector[])
    constructor(data?: Vector[])
    {
        if (typeof data === "object")
        {
            this.data = data;
        } else 
        {
            this.data = undefined;
        }
    }
    add_elements(matrix: Matrix): Matrix
    {
        if ((typeof this.data !== "undefined") && (typeof matrix.data !== "undefined"))
        {
            if (this.data.length === matrix.data.length)
            {
                let data: Vector[] = [];
                for (let i = 0; i < this.data.length; i++)
                {
                    data.push(this.data[i].add_elements(matrix.data[i]));
                }
                return new Matrix(data);
            } else
            {
                throw "Cannot add two matrices of different order";
            }
        } else
        {
            throw "Undefined matrix data";
        }
    }
    subtract_elements(matrix: Matrix)
    {
        if ((typeof this.data !== "undefined") && (typeof matrix.data !== "undefined"))
        {
            if (this.data.length === matrix.data.length)
            {
                let data: Vector[] = [];
                for (let i = 0; i < this.data.length; i++)
                {
                    data.push(this.data[i].add_elements(matrix.data[i]));
                }
                return new Matrix(data);
            } else
            {
                throw "Cannot add two matrices of different order";
            }
        } else
        {
            throw "Undefined matrix data";
        }
    }
    scale(factor: number): Matrix
    {
        if (typeof this.data !== "undefined")
        {
            let data: Vector[] = []
            for (let i = 0; i < this.data.length; i++)
            {
                data.push(this.data[i].scale(factor));
            }
            return new Matrix(data);
        } else
        {
            throw "Undefined matrix data";
        }
    } 
}

class Matrix2x2 extends Matrix
{
    constructor()
    constructor(data: Vector2D[])
    constructor(data?: Vector2D[])
    {
        if (typeof data === "object")
        {
            super(data);
        } else
        {
            super()            
        }
    }
    multiply_vector(vector: Vector2D): Vector2D
    {
        if (typeof this.data !== "undefined")
        {
            return new Vector2D(this.data[0].scale(vector.x).add_elements(this.data[1].scale(vector.y)) as Vector2D);
        } else
        {
            throw "Undefined matrix data";
        }
    }
}

class Matrix3x3 extends Matrix
{
    constructor()
    constructor(data: Vector3D[])
    constructor(data?: Vector3D[])
    {
        if (typeof data === "object")
        {
            super(data);
        } else
        {
            super();
        }
    }
    multiply_vector(vector: Vector3D): Vector3D
    {
        if (typeof this.data !== "undefined")
        {
            return new Vector3D(this.data[0].scale(vector.x).add_elements(this.data[1].scale(vector.y)).add_elements(this.data[2].scale(vector.z)) as Vector3D);
        } else
        {
            throw "Undefined matrix data";
        }
    }
}

class Matrix4x4 extends Matrix
{
    constructor()
    constructor(data: Vector3D[])
    constructor(data?: Vector3D[])
    {
        if (typeof data === "object")
        {
            super(data);
        } else
        {
            super();
        }
    }
    multiply_vector(vector: Vector4D): Vector4D
    {
        if (typeof this.data !== "undefined")
        {
            return new Vector4D(this.data[0].scale(vector.x).add_elements(this.data[1].scale(vector.y)).add_elements(this.data[2].scale(vector.z)).add_elements(this.data[3].scale(vector.w)) as Vector4D);
        } else
        {
            throw "Undefined matrix data";
        }
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