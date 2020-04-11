import { CustomerService, CustomerServiceDefault } from "./";
import { Customer, CustomerResponse } from "./types";

describe("create", () => {
  const service: CustomerService = new CustomerServiceDefault([]);

  test("Missing name throws error", async () => {
    expect.assertions(1);

    try {
      await service.create({
        name: "",
        age: 35,
      });
    } catch (error) {
      expect(error.message).toStrictEqual("Missing customer name");
    }
  });
  test("Invalid age throws error", async () => {
    expect.assertions(1);

    try {
      await service.create({
        name: "John Smith",
        age: -1,
      });
    } catch (error) {
      expect(error.message).toStrictEqual("Invalid customer age");
    }
  });
  test("Customer with ID", async () => {
    const customer: Customer = {
      name: "John Smith",
      age: 35,
    };

    const customerResponse = await service.create(customer);

    expect(customerResponse).toStrictEqual({
      ...customer,
      id: expect.any(String),
    });
  });
});

describe("findById", () => {
  const database: CustomerResponse[] = [];

  const service: CustomerService = new CustomerServiceDefault(database);

  beforeEach(() => {
    database.push({
      id: "123",
      name: "John Smith",
      age: 35,
    });
  });

  afterEach(() => {
    while (database.length) {
      database.pop();
    }
  });

  test("Customer not found throws error", async () => {
    expect.assertions(1);

    try {
      await service.findById("unknown");
    } catch (error) {
      expect(error.message).toStrictEqual("Customer not found with id unknown");
    }
  });
  test("Customer found", async () => {
    const customerResponse = await service.findById("123");

    expect(customerResponse.id).toStrictEqual("123");
  });
});
