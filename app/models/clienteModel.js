const pool = require('../config/db');

class Cliente {
    // Obtener todos los clientes
    static async findAll() {
        const result = await pool.query('SELECT * FROM CLIENTES');
        return result.rows;
    }

    // Obtener un cliente por su ID
    static async findById(IdCliente) {
        const result = await pool.query('SELECT * FROM CLIENTES WHERE IdCliente = $1', [IdCliente]);
        return result.rows[0];
    }

    // Crear un nuevo cliente
    static async create(data) {
        const { IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono } = data; 
        const result = await pool.query(
            `INSERT INTO CLIENTES (IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono]
        );
        return result.rows[0];
    }

    // Actualizar un cliente
    static async update(IdCliente, data) {
        const { IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono } = data;  

        const result = await pool.query(
            `UPDATE CLIENTES
             SET IdUsuario = $1, Nombre = $2, ApPaterno = $3, ApMaterno = $4, Telefono = $5, updated_at = CURRENT_TIMESTAMP
             WHERE IdCliente = $6 RETURNING *`,
            [IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, IdCliente]
        );
        return result.rows[0];
    }

    // Eliminar un cliente
    static async delete(IdCliente) {
        await pool.query('DELETE FROM CLIENTES WHERE IdCliente = $1', [IdCliente]);
        return { message: 'Clients deleted successfully' };
    }
}

module.exports = Cliente;
