import { CustomerController } from "./controller";
import { Router } from "express";

export function createCustomerRouter(controller: CustomerController): Router {
  return Router()
    .post("/customer", (req, res) => controller.create(req, res))
    .get("/customer/:customerId", (req, res) => controller.findById(req, res));
}
