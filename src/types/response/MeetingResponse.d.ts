type ScheduleMeeting = {
  scheduledTime: Date;
};

type Meeting = {
  _id: string;
  consultant: Consultant;
  scheduledTime: Date;
  meetingLink: string;
  meetingToken: string;
  createdAt: string;
};
