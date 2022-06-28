class Vector
{
    protected data: number[];
    constructor()
    constructor(vector: Vector)
    constructor(data: number[])
    constructor(data_or_vector?: Vector | number[])
    {
        if (data_or_vector instanceof Vector)
        {
            this.data = data_or_vector.data;
        } else if (data_or_vector)
        {
            this.data = data_or_vector;
        } else
        {
            this.data = [];
        }
    }
    add_elements(vector: Vector): Vector
    {
        let new_vector = new Vector();
        if (this.data.length === vector.data.length)
        {            
            for (let i = 0; i < this.data.length; i++)
            {
                new_vector.data.push(this.data[i] + vector.data[i]);
            }
        } else
        {
            throw "Cannot add vectors of differing lengths";
        }
        return new_vector;
    }
    scale(factor: number): Vector
    {
        let new_vector = new Vector();
        for (let i = 0; i < this.data.length; i++)
        {
            new_vector.data.push(this.data[i] * factor);
        }
        return new_vector;
    }
}

class Vector2D extends Vector
{            
    constructor()
    constructor(vector: Vector2D)
    constructor(data: number[])
    constructor(data_or_vector?: Vector2D | number[])
    {
        if (data_or_vector)
        {
            super(data_or_vector as Vector);
        } else
        {
            super();
        }
    }
    get x()
    {
        return this.data[0];
    }
    get y()
    {
        return this.data[1];
    }
}

class Vector3D extends Vector
{
    constructor()
    constructor(vector: Vector3D)
    constructor(data: number[])
    constructor(data_or_vector?: Vector3D | number[])
    {
        if (data_or_vector)
        {
            super(data_or_vector as Vector);
        } else
        {
            super();
        }
    }
    get x()
    {
        return this.data[0];
    }
    get y()
    {
        return this.data[1];
    }
    get z()
    {
        return this.data[2];
    }
}

class Vector4D extends Vector
{
    constructor()
    constructor(vector: Vector4D)
    constructor(data: number[])
    constructor(data_or_vector?: Vector4D | number[])
    {
        if (data_or_vector)
        {
            super(data_or_vector as Vector);
        } else
        {
            super();
        }
    }
    get x()
    {
        return this.data[0];
    }
    get y()
    {
        return this.data[1];
    }
    get z()
    {
        return this.data[2];
    }
    get w()
    {
        return this.data[3];
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
    constructor(vector1: Vector2D, vector2: Vector2D)
    constructor(dataOrVec1?: Vector2D[] | Vector2D, vector2?: Vector2D)
    {
        if (typeof dataOrVec1 === "object")
        {
            if (("x" in dataOrVec1) && (vector2 instanceof Vector2D))
            {
                super([dataOrVec1, vector2]);
            } else
            {
                super(dataOrVec1 as Vector2D[]);
            }
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
    multiply_matrix(matrix: Matrix2x2): Matrix2x2
    {
        if ((typeof this.data !== "undefined") && (typeof matrix.data !== "undefined"))
        {
            return new Matrix2x2(this.multiply_vector(matrix.data[0] as Vector2D), this.multiply_vector(matrix.data[1] as Vector2D));
        } else
        {
            console.log("No matrix data on multiply_matrix call, probably unintended");
            return new Matrix2x2();
        }
    }
}

class Matrix3x3 extends Matrix
{
    constructor()
    constructor(data: Vector3D[])
    constructor(vector1: Vector3D, vector2: Vector3D, vector3: Vector3D)
    constructor(dataOrVec1?: Vector3D[] | Vector3D, vector2?: Vector3D, vector3?: Vector3D)
    {
        if (typeof dataOrVec1 === "object")
        {
            if (("x" in dataOrVec1) && (vector2 instanceof Vector3D) && (vector3 instanceof Vector3D))
            {
                super([dataOrVec1, vector2, vector3]);
            } else
            {
                super(dataOrVec1 as Vector3D[]);
            }
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
    multiply_matrix(matrix: Matrix3x3): Matrix3x3
    {
        if ((typeof this.data !== "undefined") && (typeof matrix.data !== "undefined"))
        {
            return new Matrix3x3(this.multiply_vector(matrix.data[0] as Vector3D), this.multiply_vector(matrix.data[1] as Vector3D), this.multiply_vector(matrix.data[2] as Vector3D));
        } else
        {
            console.log("No matrix data on multiply_matrix call, probably unintended");
            return new Matrix3x3();
        }
    }
}

class Matrix4x4 extends Matrix
{
    constructor()
    constructor(data: Vector4D[])
    constructor(vector1: Vector4D, vector2: Vector4D, vector3: Vector4D, vector4: Vector4D)
    constructor(dataOrVec1?: Vector4D[] | Vector4D, vector2?: Vector4D, vector3?: Vector4D, vector4?: Vector4D)
    {
        if (typeof dataOrVec1 === "object")
        {
            if (("x" in dataOrVec1) && (vector2 instanceof Vector4D) && (vector3 instanceof Vector4D) && (vector4 instanceof Vector4D))
            {
                super([dataOrVec1, vector2, vector3, vector4]);
            } else
            {
                super(dataOrVec1 as Vector4D[]);
            }
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
    multiply_matrix(matrix: Matrix4x4): Matrix4x4
    {
        if ((typeof this.data !== "undefined") && (typeof matrix.data !== "undefined"))
        {
            return new Matrix4x4(this.multiply_vector(matrix.data[0] as Vector4D), this.multiply_vector(matrix.data[1] as Vector4D), this.multiply_vector(matrix.data[2] as Vector4D), this.multiply_vector(matrix.data[3] as Vector4D))
        } else
        {
            console.log("No matrix data on multiply_matrix call, probably unintended");
            return new Matrix4x4();
        }
    }
}

export 
{
    Vector, Vector2D, Vector3D, Vector4D,
    Matrix, Matrix2x2, Matrix3x3, Matrix4x4
}