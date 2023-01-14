import AxiosInstance from './Instance';

const OrderApi = {
  createOrder: (amount: number) =>
    AxiosInstance.post<ResponseBody<CreateOrder>>('/order/create', {amount}),
  placeOrder: (payload: PlaceOrderRequest) =>
    AxiosInstance.post<ResponseBody<PlaceOrder>>('/order/place', payload),
  getPaymentHistory: () =>
    AxiosInstance.get<ResponseBody<Array<OrderHistory>>>('/order/history'),
};

export default OrderApi;
