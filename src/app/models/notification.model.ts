export interface Notification {
  _id: string;
  id: string;
  type: string;
  title: string;
  message: string;
  time: Date;
  seen: boolean;
}
