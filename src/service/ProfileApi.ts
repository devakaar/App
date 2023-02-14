import AxiosInstance from './Instance';

const ProfileApi = {
  getUserDetails: () => AxiosInstance.get<ResponseBody<User>>('/user'),
};

export default ProfileApi;
