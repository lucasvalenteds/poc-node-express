import { Router } from "express";
import {
  createCustomerRouter,
  CustomerControllerDefault,
  CustomerServiceDefault,
} from "../customer";

export function createExpressRouter(): Router {
  return Router().use(
    createCustomerRouter(
      new CustomerControllerDefault(new CustomerServiceDefault([]))
    )
  );
}
