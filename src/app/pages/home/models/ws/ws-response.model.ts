type WebsocketResponse<T> = {
  ts: number;
  event: string;
  topic: string;
  data: T[];
};

export default WebsocketResponse;
