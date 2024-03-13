type Callback = (cmd?: number, data?: any) => void;

let websock: WebSocket | null = null;
let rec: NodeJS.Timeout | null = null;
let isConnect = false;
let connectCallBack: Callback | null = null;
let messageCallBack: Callback | null = null;
let closeCallBack: ((e: CloseEvent) => void) | null = null;

let connect = (wsurl: string, accessToken: string) => {
  try {
    if (isConnect) {
      return;
    }
    console.log("连接WebSocket");
    websock = new WebSocket(wsurl);
    websock.onmessage = function (e: MessageEvent) {
      let sendInfo = JSON.parse(e.data)
      if (sendInfo.cmd === 0) {
        heartCheck.start()
        connectCallBack && connectCallBack();
        console.log('WebSocket登录成功')
      } else if (sendInfo.cmd === 1) {
        heartCheck.reset();
      } else {
        console.log("收到消息:", sendInfo);
        messageCallBack && messageCallBack(sendInfo.cmd, sendInfo.data)
      }
    }
    websock.onclose = function (e: CloseEvent) {
      console.log('WebSocket连接关闭')
      isConnect = false;
      closeCallBack && closeCallBack(e);
    }
    websock.onopen = function () {
      console.log("WebSocket连接成功");
      isConnect = true;
      let loginInfo = {
        cmd: 0,
        data: {
          accessToken: accessToken
        }
      };
      websock!.send(JSON.stringify(loginInfo));
    }
    websock.onerror = function () {
      console.log('WebSocket连接发生错误')
      isConnect = false;
      reconnect(wsurl, accessToken);
    }
  } catch (e) {
    console.log("尝试创建连接失败");
    reconnect(wsurl, accessToken);
  }
};

let reconnect = (wsurl: string, accessToken: string) => {
  console.log("尝试重新连接");
  if (isConnect) {
    return;
  }
  rec && clearTimeout(rec);
  rec = setTimeout(function () {
    connect(wsurl, accessToken);
  }, 15000);
};

let close = (code: number) => {
  websock && websock.close(code);
};

let heartCheck = {
  timeout: 5000,
  timeoutObj: null as NodeJS.Timeout | null,
  start: function () {
    if (isConnect) {
      console.log('发送WebSocket心跳')
      let heartBeat = {
        cmd: 1,
        data: {}
      };
      websock!.send(JSON.stringify(heartBeat))
    }
  },
  reset: function () {
    clearTimeout(this.timeoutObj!);
    this.timeoutObj = setTimeout(function () {
      heartCheck.start();
    }, this.timeout);
  }
};

let sendMessage = (agentData: any) => {
  if (websock!.readyState === websock!.OPEN) {
    websock!.send(JSON.stringify(agentData))
  } else if (websock!.readyState === websock!.CONNECTING) {
    setTimeout(function () {
      sendMessage(agentData)
    }, 1000)
  } else {
    setTimeout(function () {
      sendMessage(agentData)
    }, 1000)
  }
}

let onConnect = (callback: Callback) => {
  connectCallBack = callback;
}

let onMessage = (callback: Callback) => {
  messageCallBack = callback;
}

let onClose = (callback: (e: CloseEvent) => void) => {
  closeCallBack = callback;
}

export {
  connect,
  reconnect,
  close,
  sendMessage,
  onConnect,
  onMessage,
  onClose,
}