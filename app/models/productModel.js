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
        const { Nombre, Precio, Descripcion, STOCK } = data; // Asegúrate de que aquí sea 'STOCK'
        
        if (STOCK === undefined || STOCK === null) {
            throw new Error("El campo 'STOCK' es obligatorio y no puede ser nulo.");
        }

        const result = await pool.query(
            `INSERT INTO PRODUCTOS (Nombre, Precio, Descripcion, STOCK) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [Nombre, Precio, Descripcion, STOCK]
        );
        return result.rows[0];
    }

    static async update(IdProducto, data) {
        const { Nombre, Precio, Descripcion, STOCK } = data;  // Aquí 'STOCK' en mayúscula

        // Validación para asegurar que STOCK no sea nulo
        if (STOCK === undefined || STOCK === null) {
            throw new Error("El campo 'STOCK' es obligatorio y no puede ser nulo.");
        }

        const result = await pool.query(
            `UPDATE PRODUCTOS
             SET Nombre = $1, Precio = $2, Descripcion = $3, STOCK = $4 
             WHERE IdProducto = $5 RETURNING *`,
            [Nombre, Precio, Descripcion, STOCK, IdProducto]  // Asegúrate de usar 'STOCK'
        );
        return result.rows[0];
    }

    static async delete(IdProducto) {
        await pool.query('DELETE FROM PRODUCTOS WHERE IdProducto = $1', [IdProducto]);
        return { message: 'Products deleted successfully' };
    }
}

module.exports = Product;
