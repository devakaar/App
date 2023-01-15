import AxiosInstance from './Instance';

const MeetingApi = {
  createMeeting: (body: MeetingRequest) =>
    AxiosInstance.post<ResponseBody<ScheduleMeeting>>('/meeting/create', body),
  getMeetingList: () =>
    AxiosInstance.get<ResponseBody<Meeting[]>>('/meeting/list'),
};

export default MeetingApi;
