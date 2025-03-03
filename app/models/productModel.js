const pool = require('../config/db');

class Product {
    static async findAll() {
        const result = await pool.query('SELECT * FROM PRODUCTOS');
        return result.rows;
    }

    static async findById(IdProducto) {
        const result = await pool.query('SELECT * FROM PRODUCTOS WHERE IdProducto = $1', [IdProducto]);
        return result.rows[0];
    }

    static async create(data) {
        const { Nombre, Precio, Descripcion, Stock } = data; // Asegúrate de que aquí sea 'Stock'
        
        if (Stock === undefined || Stock === null) {
            throw new Error("El campo 'Stock' es obligatorio y no puede ser nulo.");
        }

        const result = await pool.query(
            `INSERT INTO PRODUCTOS (Nombre, Precio, Descripcion, Stock) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [Nombre, Precio, Descripcion, Stock]
        );
        return result.rows[0];
    }

    static async update(IdProducto, data) {
        const { Nombre, Precio, Descripcion, Stock } = data;  // Aquí 'Stock' en mayúscula

        // Validación para asegurar que Stock no sea nulo
        if (Stock === undefined || Stock === null) {
            throw new Error("El campo 'Stock' es obligatorio y no puede ser nulo.");
        }

        const result = await pool.query(
            `UPDATE PRODUCTOS
             SET Nombre = $1, Precio = $2, Descripcion = $3, Stock = $4 
             WHERE IdProducto = $5 RETURNING *`,
            [Nombre, Precio, Descripcion, Stock, IdProducto]  // Asegúrate de usar 'Stock'
        );
        return result.rows[0];
    }

    static async delete(IdProducto) {
        await pool.query('DELETE FROM PRODUCTOS WHERE IdProducto = $1', [IdProducto]);
        return { message: 'Products deleted successfully' };
    }
}

module.exports = Product;
