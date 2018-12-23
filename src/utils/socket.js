/* global Stomp */
import { socketHost } from './url';
import SockJS from '../lib/sockjs';
import '../lib/stomp';

class Socket {
  socket = null;

  stompClient = null;

  subscription = null;

  inited = false;

  initSocket = () => {
    if (!this.socket) {
      this.socket = new SockJS(socketHost);
    }
  }

  subscribe = (subscribeUrl, callback) => {
    if (!this.socket) {
      this.initSocket();
    }

    this.stompClient = Stomp.over(this.socket);

    // 链接WebSocket服务端
    this.stompClient.connect({}, (frame) => {
      // 通过this.stompClient.subscribe订阅/topic/getResponse目标发送的消息，即控制器中的@SendTo
      this.subscription = this.stompClient.subscribe(subscribeUrl, (response) => {
        callback(response.body);
      });
    });
  }

  unsubscribe = () => {
    if (!this.stompClient) {
      return;
    }
    this.socket = null;
    this.stompClient.disconnect();
  }
}

export default new Socket();
