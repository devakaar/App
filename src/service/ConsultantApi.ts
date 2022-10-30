import AxiosInstance from './Instance';

const ConsultantApi = {
  getAllConsultants: () =>
    AxiosInstance.get<ResponseBody<Array<Consultant>>>('/consultant'),
};

export default ConsultantApi;
