import AxiosInstance from './Instance';

const ChatApi = {
  createChat: (body: ChatRequest) => AxiosInstance.post('/chat/create', body),
  getChats: () =>
    AxiosInstance.get<ResponseBody<Array<RoomResponse>>>('/chat/list'),
};

export default ChatApi;
