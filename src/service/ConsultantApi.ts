import AxiosInstance from './Instance';

const ConsultantApi = {
  getAllConsultants: () =>
    AxiosInstance.get<ResponseBody<Array<Consultant>>>('/consultant'),
  getConsultantDetails: (id: String) =>
    AxiosInstance.get<ResponseBody<Consultant>>(`/consultant/${id}`),
};

export default ConsultantApi;
