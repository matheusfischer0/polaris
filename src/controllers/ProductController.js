const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("products").count();

    const products = await connection("products")
      .join("companies", "companies.id", "=", "products.company_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "products.*",
        "companies.name",
        "companies.email",
        "companies.whatsapp",
        "companies.city",
        "companies.uf"
      ]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(products);
  },
  async create(request, response) {
    const { name, description, value } = request.body;
    const company_id = request.headers.authorization;
    const [id] = await connection("products").insert({
      name,
      description,
      value,
      company_id
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const company_id = request.headers.authorization;

    const product = await connection("products")
      .where("id", id)
      .select("company_id")
      .first();

    if (product.company_id != company_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("products")
      .where("id", id)
      .delete();

    return response.status(204).send();
  }
};
