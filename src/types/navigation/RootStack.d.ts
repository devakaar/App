type RootStack = {
  GetStarted: undefined;
  Login: undefined;
  BottomTabs: undefined;
  ConsultantDetails: {id: string};
  Chat: {roomId: string; name: string; consultantId: string};
  CallScreen: {item: Meeting};
  PaymentHistory: undefined;
  AddFunds: {setCallProfileApi: (bool: boolean) => void};
  PastMeetings: undefined;
};
