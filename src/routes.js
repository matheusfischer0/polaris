const express = require("express");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/companies", CompanyController.index);
routes.post("/companies", CompanyController.create);

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.create);
routes.delete("/products/:id", ProductController.delete);

routes.get("/profile", ProfileController.index);

module.exports = routes;
