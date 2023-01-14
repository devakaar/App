type CreateOrder = {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: any;
  offer_id: any;
  status: string;
  attempts: number;
  notes: Array<string>;
  createdAt: Date;
};

type PlaceOrder = {
  amount: number;
  transactionId: string;
};

type OrderHistory = {
  amount: number;
  orderId: string;
  status: OrderStatus;
  createdAt: Date;
  _id: string;
};
