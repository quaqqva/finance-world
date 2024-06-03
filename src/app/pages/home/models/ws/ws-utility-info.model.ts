export type WebsocketUtilityInfo = {
  method: 'subscribe' | 'unsubscribe';
  topics: string[];
};
