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

abstract class Matrix
{
    abstract add_elements(matrix: Matrix): Matrix;
    abstract subtract_elements(matrix: Matrix): Matrix;
    abstract scale(factor: number): Matrix;
    abstract multiply_by_vector(vector: Vector): Vector;
    abstract multiply_by_matrix(matrix: Matrix): Matrix;    
    constructor()
    {

    }
}

interface matrix_data
{
    xa: number;
    ya: number;
    za?: number;
    wa?: number;
    xb: number;
    yb: number;
    zb?: number;
    wb?: number;
    xc?: number;
    yc?: number;
    zc?: number;
    wc?: number;
    xd?: number;
    yd?: number;
    zd?: number;
    wd?: number;
}

class Matrix2x2 extends Matrix
{
    xa: number = 0;
    ya: number = 0;
    xb: number = 0;
    yb: number = 0;

    constructor()
    constructor(xa: number, ya: number, xb: number, yb: number)
    constructor(vector_a: Vector2D, vector_b: Vector2D)
    constructor(data: number[])
    constructor(data: matrix_data)
    constructor(matrix: Matrix2x2)
    constructor(xaOrVec1OrData?: number | Vector2D | number[] | matrix_data | Matrix2x2, yaOrVec2?: number | Vector2D, xb?: number, yb?: number)
    {
        super();
        if ((typeof xaOrVec1OrData === "number") && (typeof yaOrVec2 === "number") && (typeof xb === "number") && (typeof yb === "number"))
        {
            this.xa = xaOrVec1OrData;
            this.ya = yaOrVec2;
            this.xb = xb;
            this.yb = yb;
        } else if (typeof xaOrVec1OrData === "object")
        { 
            if ("x" in xaOrVec1OrData)
            {
                if (typeof yaOrVec2 === "object")
                {
                    this.xa = xaOrVec1OrData.x;
                    this.ya = xaOrVec1OrData.y;
                    this.xb = yaOrVec2.x;
                    this.yb = yaOrVec2.y;
                }
            } else if ("xa" in xaOrVec1OrData)
            {
                this.xa = xaOrVec1OrData.xa;
                this.ya = xaOrVec1OrData.ya;
                this.xb = xaOrVec1OrData.xb;
                this.yb = xaOrVec1OrData.yb;
            } else if (xaOrVec1OrData instanceof Matrix2x2)
            {
                this.xa = xaOrVec1OrData.xa;
                this.ya = xaOrVec1OrData.ya;
                this.xb = xaOrVec1OrData.xb;
                this.yb = xaOrVec1OrData.yb;
            } 
            else
            {
                this.xa = xaOrVec1OrData[0];
                this.ya = xaOrVec1OrData[1];
                this.xb = xaOrVec1OrData[2];
                this.yb = xaOrVec1OrData[3];
            }
        }
    }

    add_elements(matrix: Matrix2x2): Matrix2x2 
    {
        return new Matrix2x2(this.xa + matrix.xa, this.ya + matrix.ya, this.xb + matrix.xb, this.yb + matrix.yb);
    }
    subtract_elements(matrix: Matrix2x2): Matrix2x2 
    {
        return new Matrix2x2(this.xa - matrix.xa, this.ya - matrix.ya, this.xb - matrix.xb, this.yb - matrix.yb);
    }
    scale(factor: number): Matrix2x2 
    {
        return new Matrix2x2(this.xa * factor, this.ya * factor, this.xb * factor, this.yb * factor);
    }
    multiply_by_vector(vector: Vector2D): Vector2D 
    {
        return new Vector2D(this.xa * vector.x + this.xb * vector.y,
            this.ya * vector.x + this.yb * vector.y);
    }
    multiply_by_matrix(matrix: Matrix2x2): Matrix2x2 
    {
        return new Matrix2x2(this.xa * matrix.xa + this.xb * matrix.ya, 
            this.ya * matrix.xa + this.yb * matrix.ya, this.xa * matrix.xb + this.xb * matrix.yb, this.ya * matrix.xb + this.yb * matrix.yb);
    }
}

class Matrix3x3 extends Matrix
{
    xa = 0;
    ya = 0;
    za = 0;
    xb = 0;
    yb = 0;
    zb = 0;
    xc = 0;
    yc = 0;
    zc = 0;
    constructor()
    constructor(xa: number, ya: number, za: number,
        xb: number, yb: number, zb: number,
        xc: number, yc: number, zc: number)
    constructor(vector_a: Vector3D, vector_b: Vector3D, vector_c: Vector3D)
    constructor(data: number[])
    constructor(data: matrix_data)
    constructor(matrix: Matrix3x3)
    constructor(xaOrVec1OrData?: number | Vector3D | number[] | matrix_data | Matrix3x3, yaOrVec2?: number | Vector3D, zaOrVec3?: number | Vector3D,
        xb?: number, yb?: number, zb?: number,
        xc?: number, yc?: number, zc?: number)
    {
        super();
        if ((typeof xaOrVec1OrData === "number") && (typeof yaOrVec2 === "number") && (typeof zaOrVec3 === "number") &&
            (typeof xb === "number") && (typeof yb === "number") && (typeof zb === "number") &&
            (typeof xc === "number") && (typeof yc === "number") && (typeof zc === "number"))
        {            
            this.xa = xaOrVec1OrData;
            this.ya = yaOrVec2;
            this.za = zaOrVec3;
            this.xb = xb;
            this.yb = yb;
            this.zb = zb;
            this.xc = xc;
            this.yc = yc;
            this.zc = zc;
        } else if (typeof xaOrVec1OrData === "object")
        {
            if ("x" in xaOrVec1OrData)
            {
                if ((typeof yaOrVec2 === "object") && (typeof zaOrVec3 === "object"))
                {
                    this.xa = xaOrVec1OrData.x;
                    this.ya = xaOrVec1OrData.y;
                    this.za = xaOrVec1OrData.z;
                    this.xb = yaOrVec2.x;
                    this.yb = yaOrVec2.y;
                    this.zb = yaOrVec2.z;
                    this.xc = zaOrVec3.x;
                    this.yc = zaOrVec3.y;
                    this.zc = zaOrVec3.z;
                }
            } else if ("xa" in xaOrVec1OrData)
            {
                if ((typeof xaOrVec1OrData.za !== "undefined") && (typeof xaOrVec1OrData.zb !== "undefined") && (typeof xaOrVec1OrData.xc !== "undefined") &&
                    (typeof xaOrVec1OrData.yc !== "undefined") && (typeof xaOrVec1OrData.zc !== "undefined"))
                {
                    this.xa = xaOrVec1OrData.xa;
                    this.ya = xaOrVec1OrData.ya;
                    this.za = xaOrVec1OrData.za;
                    this.xb = xaOrVec1OrData.xb;
                    this.yb = xaOrVec1OrData.yb;
                    this.zb = xaOrVec1OrData.zb;
                    this.xc = xaOrVec1OrData.xc;
                    this.yc = xaOrVec1OrData.yc;
                    this.zc = xaOrVec1OrData.zc;
                }
            } else if (xaOrVec1OrData instanceof Matrix3x3)
            {
                this.xa = xaOrVec1OrData.xa;
                this.ya = xaOrVec1OrData.ya;
                this.za = xaOrVec1OrData.za;
                this.xb = xaOrVec1OrData.xb;
                this.yb = xaOrVec1OrData.yb;
                this.zb = xaOrVec1OrData.zb;
                this.xc = xaOrVec1OrData.xc;
                this.yc = xaOrVec1OrData.yc;
                this.zc = xaOrVec1OrData.zc;
            }
            else
            {
                this.xa = xaOrVec1OrData[0];
                this.ya = xaOrVec1OrData[1];
                this.za = xaOrVec1OrData[2];
                this.xb = xaOrVec1OrData[3];
                this.yb = xaOrVec1OrData[4];
                this.zb = xaOrVec1OrData[5];
                this.xc = xaOrVec1OrData[6];
                this.yc = xaOrVec1OrData[7];
                this.zc = xaOrVec1OrData[8];
            }
        }
    }
    add_elements(matrix: Matrix3x3): Matrix3x3 
    {
        return new Matrix3x3(this.xa + matrix.xa, this.ya + matrix.ya, this.za + matrix.za, this.xb + matrix.xb, this.yb + matrix.yb, this.zb + matrix.zb,
            this.xc + matrix.xc, this.yc + matrix.yc, this.zc + matrix.zc);
    }
    subtract_elements(matrix: Matrix3x3): Matrix3x3 
    {
        return new Matrix3x3(this.xa - matrix.xa, this.ya - matrix.ya, this.za - matrix.za, this.xb - matrix.xb, this.yb - matrix.yb, this.zb - matrix.zb,
            this.xc - matrix.xc, this.yc - matrix.yc, this.zc - matrix.zc);
    }
    scale(factor: number): Matrix3x3 
    {
        return new Matrix3x3(this.xa * factor, this.ya * factor, this.za * factor, this.xb * factor, this.yb * factor, this.zb * factor,
            this.xc * factor, this.yc * factor, this.zc * factor);
    }
    multiply_by_vector(vector: Vector3D): Vector3D 
    {
        return new Vector3D(this.xa * vector.x + this.xb * vector.y + this.xc * vector.z,
            this.ya * vector.x + this.yb * vector.y + this.yc * vector.z,
            this.za * vector.x + this.zb * vector.y + this.zc * vector.z);
    }
    multiply_by_matrix(matrix: Matrix3x3): Matrix3x3 
    {
        return new Matrix3x3();
    }
}

class Matrix4x4 extends Matrix
{
    xa = 0;
    ya = 0
    za = 0;
    wa = 0;
    xb = 0;
    yb = 0;
    zb = 0;
    wb = 0;
    xc = 0;
    yc = 0;
    zc = 0;
    wc = 0;
    xd = 0;
    yd = 0;
    zd = 0;
    wd = 0;
    constructor()
    constructor(xa: number, ya: number, za: number, wa: number,
        xb: number, yb: number, zb: number, wb: number,
        xc: number, yc: number, zc: number, wc: number,
        xd: number, yd: number, zd: number, wd: number)
    constructor(vector_a: Vector4D, vector_b: Vector4D, vector_c: Vector4D, vector_d: Vector4D)
    constructor(data: number[])
    constructor(data: matrix_data)
    constructor(matrix: Matrix4x4)
    constructor(xaOrVec1OrData?: number | Vector4D | number[] | matrix_data | Matrix4x4, yaOrVec2?: number | Vector4D, zaOrVec3?: number | Vector4D, waOrVec3?: number | Vector4D,
        xb?: number, yb?: number, zb?: number, wb?: number,
        xc?: number, yc?: number, zc?: number, wc?: number,
        xd?: number, yd?: number, zd?: number, wd?: number)
    {
        super();
        if ((typeof xaOrVec1OrData === "number") && (typeof yaOrVec2 === "number") && (typeof zaOrVec3 === "number") && (typeof waOrVec3 === "number") &&
        (typeof xb === "number") && (typeof yb === "number") && (typeof zb === "number") && (typeof wb === "number") &&
        (typeof xc === "number") && (typeof yc === "number") && (typeof zc === "number") && (typeof wc === "number") &&
        (typeof xd === "number") && (typeof yd === "number") && (typeof zd === "number") && (typeof wd === "number"))
        {
            this.xa = xaOrVec1OrData;
            this.ya = yaOrVec2;
            this.za = zaOrVec3;
            this.wa = waOrVec3;
            this.xb = xb;
            this.yb = yb;
            this.zb = zb;
            this.wb = wb;
            this.xc = xc;
            this.yc = yc;
            this.zc = zc;
            this.wc = wc;
            this.xd = xd;
            this.yd = yd;
            this.zd = zd;
            this.wd = wd;
        } else if (typeof xaOrVec1OrData === "object")
        {
            if ("x" in xaOrVec1OrData)
            {
                if ((typeof yaOrVec2 == "object") && (typeof zaOrVec3 === "object") && (typeof waOrVec3 === "object"))
                {
                    this.xa = xaOrVec1OrData.x;
                    this.ya = xaOrVec1OrData.y;
                    this.za = xaOrVec1OrData.z;
                    this.wa = xaOrVec1OrData.w;
                    this.xb = yaOrVec2.x;
                    this.yb = yaOrVec2.y;
                    this.zb = yaOrVec2.z;
                    this.wb = yaOrVec2.w;
                    this.xc = zaOrVec3.x;
                    this.yc = zaOrVec3.y;
                    this.zc = zaOrVec3.z;
                    this.wc = zaOrVec3.w;
                    this.xd = waOrVec3.x;
                    this.yd = waOrVec3.y;
                    this.zd = waOrVec3.z;
                    this.wd = waOrVec3.w;
                }
            } else if ("xa" in xaOrVec1OrData)
            {
                if ((typeof xaOrVec1OrData.za !== "undefined") && (typeof xaOrVec1OrData.wa !== "undefined") && (typeof xaOrVec1OrData.zb !== "undefined") && 
                (typeof xaOrVec1OrData.wb !== "undefined") && (typeof xaOrVec1OrData.xc !== "undefined") && (typeof xaOrVec1OrData.wc !== "undefined") &&
                (typeof xaOrVec1OrData.yc !== "undefined") && (typeof xaOrVec1OrData.zc !== "undefined") && (typeof xaOrVec1OrData.xd !== "undefined") &&
                (typeof xaOrVec1OrData.yd !== "undefined") && (typeof xaOrVec1OrData.zd !== "undefined") && (typeof xaOrVec1OrData.wd !== "undefined"))
                {
                    this.xa = xaOrVec1OrData.xa;
                    this.ya = xaOrVec1OrData.ya;
                    this.za = xaOrVec1OrData.za;
                    this.wa = xaOrVec1OrData.wa;
                    this.xb = xaOrVec1OrData.xb;
                    this.yb = xaOrVec1OrData.yb;
                    this.zb = xaOrVec1OrData.zb;
                    this.wb = xaOrVec1OrData.wb;
                    this.xc = xaOrVec1OrData.xc;
                    this.yc = xaOrVec1OrData.yc;
                    this.zc = xaOrVec1OrData.zc;
                    this.wc = xaOrVec1OrData.wc;
                    this.xd = xaOrVec1OrData.xd;
                    this.yd = xaOrVec1OrData.yd;
                    this.zd = xaOrVec1OrData.zd;
                    this.wd = xaOrVec1OrData.wd;
                }
            } else if (xaOrVec1OrData instanceof Matrix4x4)
            {
                this.xa = xaOrVec1OrData.xa;
                this.ya = xaOrVec1OrData.ya;
                this.za = xaOrVec1OrData.za;
                this.wa = xaOrVec1OrData.wa;
                this.xb = xaOrVec1OrData.xb;
                this.yb = xaOrVec1OrData.yb;
                this.zb = xaOrVec1OrData.zb;
                this.wb = xaOrVec1OrData.wb;
                this.xc = xaOrVec1OrData.xc;
                this.yc = xaOrVec1OrData.yc;
                this.zc = xaOrVec1OrData.zc;
                this.wc = xaOrVec1OrData.wc;
                this.xd = xaOrVec1OrData.xd;
                this.yd = xaOrVec1OrData.yd;
                this.zd = xaOrVec1OrData.zd;
                this.wd = xaOrVec1OrData.wd;    
            } 
            else
            {
                this.xa = xaOrVec1OrData[0];
                this.ya = xaOrVec1OrData[1];
                this.za = xaOrVec1OrData[2];
                this.wa = xaOrVec1OrData[3];
                this.xb = xaOrVec1OrData[4];
                this.yb = xaOrVec1OrData[5];
                this.zb = xaOrVec1OrData[6];
                this.wb = xaOrVec1OrData[7];
                this.xc = xaOrVec1OrData[8];
                this.yc = xaOrVec1OrData[9];
                this.zc = xaOrVec1OrData[10];
                this.wc = xaOrVec1OrData[11];
                this.xd = xaOrVec1OrData[12];
                this.yd = xaOrVec1OrData[13];
                this.zd = xaOrVec1OrData[14];
                this.wd = xaOrVec1OrData[15];
            }
        }

    }
    add_elements(matrix: Matrix4x4): Matrix4x4 
    {
        return new Matrix4x4(this.xa + matrix.xa, this.ya + matrix.ya, this.za + matrix.za, this.wa + matrix.wa,
            this.xb + matrix.xb, this.yb + matrix.yb, this.zb + matrix.zb, this.wb + matrix.wb, 
            this.xc + matrix.xc, this.yc + matrix.yc, this.zc + matrix.zc, this.wc + matrix.wc,
            this.xd + matrix.xd, this.yd + matrix.yd, this.zd + matrix.zd, this.wd + matrix.wd);
    }
    subtract_elements(matrix: Matrix4x4): Matrix4x4 
    {
        return new Matrix4x4(this.xa - matrix.xa, this.ya - matrix.ya, this.za - matrix.za, this.wa - matrix.wa,
            this.xb - matrix.xb, this.yb - matrix.yb, this.zb - matrix.zb, this.wb - matrix.wb, 
            this.xc - matrix.xc, this.yc - matrix.yc, this.zc - matrix.zc, this.wc - matrix.wc,
            this.xd - matrix.xd, this.yd - matrix.yd, this.zd - matrix.zd, this.wd - matrix.wd);
    }
    scale(factor: number): Matrix4x4 
    {
        return new Matrix4x4(this.xa * factor, this.ya * factor, this.za * factor, this.wa * factor,
            this.xb * factor, this.yb * factor, this.zb * factor, this.wb * factor,
            this.xc * factor, this.yc * factor, this.zc * factor, this.wc * factor,
            this.xd * factor, this.yd * factor, this.zd * factor, this.wd * factor);
    }
    multiply_by_vector(vector: Vector4D): Vector4D 
    {
        return new Vector4D(this.xa * vector.x + this.xb + vector.y + this.xc * vector.z + this.xd * vector.w,
            this.ya * vector.x + this.yb * vector.y + this.yc * vector.z + this.yd * vector.w,
            this.za * vector.x + this.zb * vector.y + this.zc * vector.z + this.zd * vector.w,
            this.wa * vector.x + this.wb * vector.y + this.wc * vector.z + this.wd * vector.w);
    }
    multiply_by_matrix(matrix: Matrix4x4): Matrix4x4 
    {
        return new Matrix4x4();
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