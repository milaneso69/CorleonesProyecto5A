const pool = require('../config/db');

class VentasDetail {
  static async create(IdVenta, IdProducto, Cantidad, client = pool) {
    const result = await client.query(
      'INSERT INTO DetalleVentas (IdVenta, IdProducto, Cantidad) VALUES ($1, $2, $3) RETURNING *',
      [IdVenta, IdProducto, Cantidad]
    );
    return result.rows[0];
  }

  static async findByVentasId(IdVenta, client = pool) {
    const result = await client.query(
      'SELECT * FROM DetalleVentas WHERE IdVenta = $1',
      [IdVenta]
    );
    return result.rows;
  }
}

module.exports = VentasDetail;