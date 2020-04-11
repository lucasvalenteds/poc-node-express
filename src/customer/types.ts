export interface Customer {
  name: string;
  age: number;
}

export interface CustomerResponse extends Customer {
  id: string;
}
