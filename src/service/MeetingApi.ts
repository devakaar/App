import AxiosInstance from './Instance';

const MeetingApi = {
  createMeeting: (body: MeetingRequest) =>
    AxiosInstance.post<ResponseBody<ScheduleMeeting>>('/meeting/create', body),
  getMeetingList: (type: 'upcoming' | 'past') =>
    AxiosInstance.get<ResponseBody<Meeting[]>>(`/meeting/list/${type}`),
};

export default MeetingApi;
