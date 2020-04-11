import { CustomerResponse, Customer } from "./types";

export interface CustomerService {
  create(customer: Customer): Promise<CustomerResponse>;
  findById(id: string): Promise<CustomerResponse>;
}

export class CustomerServiceDefault implements CustomerService {
  public constructor(private database: CustomerResponse[]) {}

  async create(customer: Customer): Promise<CustomerResponse> {
    if (!customer.name) {
      throw Error("Missing customer name");
    }

    if (customer.age < 0) {
      throw Error("Invalid customer age");
    }

    const customerResponse: CustomerResponse = {
      ...customer,
      id: "",
    };

    this.database.push(customerResponse);

    return customerResponse;
  }

  async findById(id: string): Promise<CustomerResponse> {
    const customerResponse = this.database.find((customer) => {
      return customer.id === id;
    });

    if (!customerResponse) {
      throw Error("Customer not found with id " + id);
    }

    return customerResponse;
  }
}
