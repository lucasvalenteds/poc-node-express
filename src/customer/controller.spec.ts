import SuperTest from "supertest";
import { createExpressServer } from "../api";
import {
  Customer,
  CustomerResponse,
  CustomerService,
  CustomerControllerDefault,
  createCustomerRouter,
} from "./";

const customer: Customer = {
  name: "John Smith",
  age: 35,
};

const customerResponse: CustomerResponse = {
  ...customer,
  id: "123",
};

const service: CustomerService = {
  create: jest.fn(),
  findById: jest.fn(),
};

describe("POST /customer", () => {
  test("200 - Customer created", async () => {
    const mockCreate = jest.fn().mockResolvedValue(customerResponse);
    const app = createExpressServer(
      createCustomerRouter(
        new CustomerControllerDefault({
          ...service,
          create: mockCreate,
        })
      )
    );

    const response = await SuperTest(app)
      .post("/customer")
      .send(customer);

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual(customerResponse);
    expect(mockCreate).toHaveReturned();
  });

  test("400 - Could not create customer", async () => {
    const mockCreate = jest.fn(() => {
      throw Error("");
    });
    const app = createExpressServer(
      createCustomerRouter(
        new CustomerControllerDefault({
          ...service,
          create: mockCreate,
        })
      )
    );

    const response = await SuperTest(app)
      .post("/customer")
      .send(customer);

    expect(response.status).toStrictEqual(400);
    expect(response.body).toStrictEqual({});
    expect(mockCreate).not.toHaveReturned();
  });
});

describe("GET /customer/:customerId", () => {
  test("200 - Customer found", async () => {
    const mockFindById = jest.fn().mockResolvedValue(customerResponse);
    const app = createExpressServer(
      createCustomerRouter(
        new CustomerControllerDefault({
          ...service,
          findById: mockFindById,
        })
      )
    );

    const response = await SuperTest(app)
      .get("/customer/" + customerResponse.id)
      .send();

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual(customerResponse);
    expect(mockFindById).toHaveReturned();
  });

  test("404 - Customer not found", async () => {
    const mockFindById = jest.fn(() => {
      throw Error("");
    });
    const app = createExpressServer(
      createCustomerRouter(
        new CustomerControllerDefault({
          ...service,
          findById: mockFindById,
        })
      )
    );

    const response = await SuperTest(app)
      .get("/customer/" + customerResponse.id)
      .send();

    expect(response.status).toStrictEqual(404);
    expect(response.body).toStrictEqual({});
    expect(mockFindById).not.toHaveReturned();
  });
});
