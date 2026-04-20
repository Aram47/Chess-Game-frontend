export type notificationType = {
  id: number;
  eventType: string;
  data: {
    fromUserId: number;
  };
  readAt: Date | null;
  createdAt: Date | null;
};
