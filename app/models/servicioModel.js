const pool = require('../config/db');

class Servicio {
  static async findAll() {
    const result = await pool.query('SELECT * FROM SERVICIOS');
    return result.rows;
  }

  static async findById(IdServicio) {
    const result = await pool.query('SELECT * FROM SERVICIOS WHERE IdServicio = $1', [IdServicio]);
    return result.rows[0];
  }

  static async create(data) {
    const { Nombre, Descripcion, Precio } = data;
    const result = await pool.query(
      'INSERT INTO SERVICIOS (Nombre, Descripcion, Precio) VALUES ($1, $2, $3) RETURNING *',
      [Nombre, Descripcion, Precio]
    );
    return result.rows[0];
  }

  // Puedes agregar más métodos como `update` y `delete` aquí

  static async update(IdServicio, data) {
    const { Nombre, Descripcion, Precio } = data;
    const result = await pool.query(
      'UPDATE SERVICIOS SET Nombre = $1, Descripcion = $2, Precio = $3, updated_at = NOW() WHERE IdServicio = $4 AND deleted_at IS NULL RETURNING *',
      [Nombre, Descripcion, Precio, IdServicio]
    );
    return result.rows[0];
  }

  static async delete(IdServicio) {
    await pool.query('DELETE FROM SERVICIOS WHERE IdServicio = $1', [IdServicio]);
    return { message: 'Service deleted successfully' };
  }

}

module.exports = Servicio;
