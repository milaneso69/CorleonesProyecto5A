const pool = require('../config/db');

class Ventas {
    
    static async findAll() {
        const result = await pool.query('SELECT * FROM VENTAS');
        return result.rows;
    }

    static async findById(IdVenta) {
        const result = await pool.query('SELECT * FROM VENTAS WHERE IdVenta = $1', [IdVenta]);
        return result.rows[0];
    }

    static async create(data) {
        const { IdCliente, FechaVenta, Total } = data; 
        const result = await pool.query(
            `INSERT INTO VENTAS (IdCliente, FechaVenta, Total) 
             VALUES ($1, $2, $3) RETURNING *`,
            [IdCliente, FechaVenta, Total]
        );
        return result.rows[0];
    }

    static async update(IdVenta, data) {
        const { IdCliente, FechaVenta, Total } = data;  

        const result = await pool.query(
            `UPDATE VENTAS
             SET IdCliente = $1, FechaVenta = $2, Total =$3
             WHERE IdVenta = $4 RETURNING *`,
            [IdCliente, FechaVenta, Total, IdVenta]
        );
        return result.rows[0];
    }

    static async delete(IdVenta) {
        await pool.query('DELETE FROM VENTAS WHERE IdVenta = $1', [IdVenta]);
        return { message: 'Sales deleted successfully' };
    }
}

module.exports = Ventas;
