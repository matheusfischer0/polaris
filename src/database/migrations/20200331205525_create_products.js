exports.up = function(knex) {
  return knex.schema.createTable("products", function(table) {
    table.increments("id");

    table.string("name").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();

    table.string("company_id").notNullable();

    table
      .foreign("company_id")
      .references("id")
      .inTable("companies");
  });
};

exports.down = function(knex) {
  return knex.schema.createTable("products");
};
