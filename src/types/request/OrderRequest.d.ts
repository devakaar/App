type CreateOrderRequest = {
  amount: number;
};

type PlaceOrderRequest = {
  orderId: string;
  paymentId: string;
  status: OrderStatus;
};

type OrderStatus = 'success' | 'failed';
