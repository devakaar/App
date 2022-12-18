import AxiosInstance from './Instance';

const ChatApi = {
  createChat: (body: ChatRequest) =>
    AxiosInstance.post<ResponseBody<Room>>('/chat/create', body),
  getChats: () => AxiosInstance.get<ResponseBody<Array<Room>>>('/chat/list'),
};

export default ChatApi;
