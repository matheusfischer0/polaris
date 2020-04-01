const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const company_id = request.headers.authorization;

    const products = await connection("products")
      .where("company_id", company_id)
      .select("*");

    return response.json(products);
  }
};
