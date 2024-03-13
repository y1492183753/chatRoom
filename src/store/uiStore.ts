import { defineStore } from 'pinia';

export const useUiStore = defineStore({
  id: 'uiStore',
  state: () => ({
    userInfo: { // 用户信息窗口
      show: false,
      user: {},
      pos: {
        x: 0,
        y: 0
      }
    },
    fullImage: { // 全屏大图
      show: false,
      url: ""
    },
    chatPrivateVideo: {  // 私人视频聊天
      show: false,
      master: false, // 是否房主
      friend: {},
      offer: {}  // 对方发起带过过来的sdp信息
    },
    videoAcceptor: { // 视频呼叫选择
      show: false,
      friend: {}
    }
  }),
  actions: {
    showUserInfoBox(user: any) {
      this.userInfo.show = true;
      this.userInfo.user = user;
    },
    setUserInfoBoxPos(pos: { x: number, y: number }) {
      let w = document.documentElement.clientWidth;
      let h = document.documentElement.clientHeight;
      this.userInfo.pos.x = Math.min(pos.x, w - 350);
      this.userInfo.pos.y = Math.min(pos.y, h - 200);
    },
    closeUserInfoBox() {
      this.userInfo.show = false;
    },
    showFullImageBox(url: string) {
      this.fullImage.show = true;
      this.fullImage.url = url;
    },
    closeFullImageBox() {
      this.fullImage.show = false;
    },
    showChatPrivateVideoBox(info: { friend: any, master: boolean, offer: any }) {
      this.chatPrivateVideo.show = true;
      this.chatPrivateVideo.friend = info.friend;
      this.chatPrivateVideo.master = info.master;
      this.chatPrivateVideo.offer = info.offer;
    },
    closeChatPrivateVideoBox() {
      this.chatPrivateVideo.show = false;
    },
    showVideoAcceptorBox(friend: any) {
      this.videoAcceptor.show = true;
      this.videoAcceptor.friend = friend;
    },
    closeVideoAcceptorBox() {
      this.videoAcceptor.show = false;
    }
  }
});