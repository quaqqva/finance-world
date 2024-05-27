type WebsocketUtilityInfo = {
  method: 'subscribe' | 'unsubscribe';
  topics: string[];
};

export default WebsocketUtilityInfo;
