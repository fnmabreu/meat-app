class Order {
  constructor(
    public address: string,
    public city: string,
    public country: string,
    public postalCode: string,
    public paymentOption: string,
    public orderItems: OrderItem[] = []
  ) {}
}

class OrderItem {
  constructor(public quantity: number, public menuId: string) {}
}

export { Order, OrderItem };
