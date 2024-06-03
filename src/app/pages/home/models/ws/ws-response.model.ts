export type WebsocketResponse<T> = {
  ts: number;
  event: string;
  topic: string;
  data: T[];
};
