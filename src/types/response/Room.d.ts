type Room = {
  _id: string;
  consultant: Consultant;
  user: string;
  lastMessage: Message;
};

type Message = {
  _id: string;
  text: string;
  roomId: string;
  consultant?: Consultant;
  user: User;
  updatedAt: string;
};
