const pool = require('../config/db');

class SaleDetail {
  static async create(saleId, productName, quantity, price, client = pool) {
    const result = await client.query(
      'INSERT INTO sale_details (sale_id, product_name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [saleId, productName, quantity, price]
    );
    return result.rows[0];
  }

  static async findBySaleId(saleId, client = pool) {
    const result = await client.query('SELECT * FROM sale_details WHERE sale_id = $1', [saleId]);
    return result.rows;
  }
}

module.exports = SaleDetail;