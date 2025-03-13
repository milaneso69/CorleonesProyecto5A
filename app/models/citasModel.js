const pool = require('../config/db');

class Citas {
    static async findAll()
    {
        const result = await pool.query('SELECT *FROM CITAS');
        return result.rows;
    }

    static async findById(IdCita) {
      const result = await pool.query('SELECT * FROM CITAS WHERE IdCita = $1', [IdCita]);
      return result.rows[0];
    }

    static async create(data) {
      const { IdCliente, IdServicio, FechaAgendada } = data; 
      const result = await pool.query(
          `INSERT INTO CITAS (IdCliente, IdServicio, FechaAgendada) 
           VALUES ($1, $2, $3) RETURNING *`,
          [IdCliente, IdServicio, FechaAgendada]
      );
      return result.rows[0];
  }
  
  static async update(IdCita, data) {
    const { IdCliente, IdServicio, FechaAgendada } = data;  
    const result = await pool.query(
        `UPDATE CITAS
         SET IdCliente = $1, IdServicio = $2, FechaAgendada = $3 
         WHERE IdCita = $4 RETURNING *`,
        [IdCliente, IdServicio, FechaAgendada, IdCita]  
    );
    return result.rows[0];
}


  static async delete(IdCita) {
    await pool.query('DELETE FROM CITAS WHERE IdCita = $1', [IdCita]);
    return { message: 'Cita deleted successfully' };
  }
}

module.exports = Citas;