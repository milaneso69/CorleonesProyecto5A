const pool = require('../config/db');

class Empleado {
  static async findAll() {
    const result = await pool.query('SELECT * FROM EMPLEADOS');
    return result.rows;
  }

  static async findById(IdEmpleado) {
    const result = await pool.query('SELECT * FROM EMPLEADOS WHERE IdEmpleado = $1', [IdEmpleado]);
    return result.rows[0];
  }

  static async create(data) {
    const { IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC } = data;

    const result = await pool.query(
      'INSERT INTO EMPLEADOS (IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
      [IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC]
    );
    return result.rows[0];
  }

  static async update(IdEmpleado, data) {
    const { IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC } = data;

    const result = await pool.query(
      'UPDATE EMPLEADOS SET IdUsuario = $1, Nombre = $2, ApPaterno = $3, ApMaterno = $4, Telefono = $5, NSS = $6, RFC = $7, updated_at = CURRENT_TIMESTAMP WHERE IdEmpleado = $8 RETURNING *',
      [IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC, IdEmpleado]
    );
    return result.rows[0];
  }

  static async delete(IdEmpleado) {
    await pool.query('DELETE FROM EMPLEADOS WHERE IdEmpleado = $1', [IdEmpleado]);
    return { message: 'Employees deleted successfully' };
  }
}

module.exports = Empleado;
