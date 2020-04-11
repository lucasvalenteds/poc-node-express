import { Request, Response } from "express";
import { CustomerService } from "./service";
import { Customer } from "./types";

export interface CustomerController {
  create(request: Request, response: Response): Promise<unknown>;
  findById(request: Request, response: Response): Promise<unknown>;
}

export class CustomerControllerDefault implements CustomerController {
  public constructor(private service: CustomerService) {}

  async create(request: Request, response: Response): Promise<unknown> {
    const customer: Customer = request.body;

    try {
      const customerResponse = await this.service.create({
        name: customer.name,
        age: customer.age,
      });

      return response.status(200).json(customerResponse);
    } catch (error) {
      return response.status(400).send();
    }
  }
  async findById(request: Request, response: Response): Promise<unknown> {
    try {
      const customerResponse = await this.service.findById(
        request.params.customerId
      );

      return response.status(200).json(customerResponse);
    } catch (error) {
      return response.status(404).send();
    }
  }
}
