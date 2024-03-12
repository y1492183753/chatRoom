import { defineStore } from 'pinia';
import {
    MESSAGE_TYPE,
    MESSAGE_STATUS
} from "../api/enum"
import userStore from './userStore';
import { Commit } from 'vuex';
import { Chat, State, Message, Getters , Friend ,UserState ,ChatData ,Context} from '../interface/chat';

const userStore = {
    state: {
        userInfo: {
            id: '',
        },
    },
};
export const useChatStore = defineStore('chatStore', {
    state: () => ({
        activeChat: null,
        privateMsgMaxId: 0,
        groupMsgMaxId: 0,
        loadingPrivateMsg: false,
        loadingGroupMsg: false,
        chats: [] as Chat[],
    }),
    getters: {

    },
    actions: {
        initChats(this: State, chatsData: { chats?: any[]; privateMsgMaxId?: number; groupMsgMaxId?: number; }) {
            this.chats = chatsData.chats || [];
            this.privateMsgMaxId = chatsData.privateMsgMaxId || 0;
            this.groupMsgMaxId = chatsData.groupMsgMaxId || 0;
            // 防止图片一直处在加载中状态
            this.chats.forEach((chat: { messages: { loadStatus: string; }[]; }) => {
                chat.messages.forEach((msg: { loadStatus: string; }) => {
                    if (msg.loadStatus == "loading") {
                        msg.loadStatus = "fail"
                    }
                })
            })
        },
        openChat(this: State, chatInfo: { type: any; targetId: any; showName: any; headImage: any; }) {
            let chat = null;
            for (let idx in this.chats) {
                if (this.chats[idx].type == chatInfo.type && this.chats[idx].targetId === chatInfo.targetId) {
                    chat = this.chats[idx];
                    // 放置头部
                    this.moveTop(Number(idx));
                    break;
                }
            }
            // 创建会话
            if (chat == null) {
                chat = {
                    targetId: chatInfo.targetId,
                    type: chatInfo.type,
                    showName: chatInfo.showName,
                    headImage: chatInfo.headImage,
                    lastContent: "",
                    lastSendTime: new Date().getTime(),
                    unreadCount: 0,
                    messages: [],
                    atMe: false,
                    atAll: false
                };
                this.chats.unshift(chat);
            }
        },
        activeChat(state: { activeChat: any; chats: any[]; }, idx: number): void {
            state.activeChat = state.chats[idx];
        },
        // 这个函数的作用是重置指定聊天会话的未读消息数量和 @ 我/@ 所有人的标记，
        // 并将更改保存到存储中。
        resetUnreadCount(state: { chats: { type: any; targetId: any; unreadCount: number; atMe: boolean; atAll: boolean; }[]; }, chatInfo: { type: any; targetId: any; }, commit: Commit): void {
            for (let idx in state.chats) {
                if (state.chats[idx].type == chatInfo.type &&
                    state.chats[idx].targetId == chatInfo.targetId) {
                    state.chats[idx].unreadCount = 0;
                    state.chats[idx].atMe = false;
                    state.chats[idx].atAll = false;
                }
            }
            commit("saveToStorage");
        },
        // 这段代码的目的是将用户在特定私人聊天中发送的、未被撤回的、ID 小于等于 pos.maxId 的所有消息标记为已读。
        // 如果 pos.maxId 为空，那么就将所有消息标记为已读。
        readedMessage(state: { chats: { type: string; targetId: any; messages: { selfSend: boolean; status: number; id: any; }[]; }[]; }, pos: { friendId: any; maxId?: any; }, commit: (mutation: string) => void): void {
            for (let idx in state.chats) {
                if (state.chats[idx].type == 'PRIVATE' &&
                    state.chats[idx].targetId == pos.friendId) {
                    state.chats[idx].messages.forEach((m) => {
                        if (m.selfSend && m.status != MESSAGE_STATUS.RECALL) {
                            // pos.maxId为空表示整个会话已读
                            if (!pos.maxId || m.id <= pos.maxId) {
                                m.status = MESSAGE_STATUS.READED
                            }
                        }
                    })
                }
            }
            commit("saveToStorage");
        },
        // 在用户结束或离开一个聊天时，将该聊天从聊天列表中移除，并确保这个更改被保存。
        removeChat(state: State, idx: number, commit: (mutation: string) => void): void {
            if (state.chats[idx] === state.activeChat) {
                state.activeChat = null;
            }
            state.chats.splice(idx, 1);
            commit("saveToStorage");
        },
        // 在用户与一个聊天互动后，将这个聊天移动到聊天列表的顶部，以便用户可以更方便地找到它。
        moveTop(state: State, idx: number, commit: (mutation: string) => void): void {
            if (state.loadingPrivateMsg || state.loadingGroupMsg) {
                return;
            }
            if (idx > 0) {
                let chat = state.chats[idx];
                state.chats.splice(idx, 1);
                state.chats.unshift(chat);
                commit("saveToStorage");
            }
        },
        // 在用户结束或离开一个私人聊天时，将该聊天从聊天列表中移除
        removePrivateChat(state: State, friendId: any, commit: (mutation: string, idx: number) => void): void {
            for (let idx in state.chats) {
                if (state.chats[idx].type == 'PRIVATE' && state.chats[idx].targetId == friendId) {
                    commit("removeChat", Number(idx));
                }
            }
        },
        // 处理新的消息，并更新聊天的状态。
        insertMessage(this: { state: State; getters: Getters; commit: (mutation: string) => void }, msgInfo: Message) {
            let type = msgInfo.groupId ? 'GROUP' : 'PRIVATE';
            // 记录消息的最大id
            if (msgInfo.id && type == "PRIVATE" && msgInfo.id > this.state.privateMsgMaxId) {
                this.state.privateMsgMaxId = msgInfo.id;
            }
            if (msgInfo.id && type == "GROUP" && msgInfo.id > this.state.groupMsgMaxId) {
                this.state.groupMsgMaxId = msgInfo.id;
            }
            // 如果是已存在消息，则覆盖旧的消息数据
            let chat = this.getters.findChat(msgInfo);
            let message = this.getters.findMessage(chat, msgInfo);
            if (message) {
                Object.assign(message, msgInfo);
                this.commit("saveToStorage");
                return;
            }
            // 插入新的数据
            if (Number(msgInfo.type) == MESSAGE_TYPE.IMAGE) {
                chat.lastContent = "[图片]";
            } else if (Number(msgInfo.type) == MESSAGE_TYPE.FILE) {
                chat.lastContent = "[文件]";
            } else if (Number(msgInfo.type) == MESSAGE_TYPE.AUDIO) {
                chat.lastContent = "[语音]";
            } else if (Number(msgInfo.type) == MESSAGE_TYPE.TEXT || Number(msgInfo.type) == MESSAGE_TYPE.RECALL) {
                chat.lastContent = msgInfo.content || '';
            }
            chat.lastSendTime = msgInfo.sendTime;
            chat.sendNickName = msgInfo.sendNickName;
            // 未读加1
            if (!msgInfo.selfSend && Number(msgInfo.status) != MESSAGE_STATUS.READED && Number(msgInfo.type) != MESSAGE_TYPE.TIP_TEXT) {
                chat.unreadCount++;
            }
            // 是否有人@我
            if (!msgInfo.selfSend && chat.type == "GROUP" && msgInfo.atUserIds &&
                Number(msgInfo.status) != MESSAGE_STATUS.READED) {
                let userId = userStore.state.userInfo.id;
                if (msgInfo.atUserIds.indexOf(userId) >= 0) {
                    chat.atMe = true;
                }
                if (msgInfo.atUserIds.indexOf(-1) >= 0) {
                    chat.atAll = true;
                }
            }
            if (!chat.lastTimeTip || (chat.lastTimeTip < msgInfo.sendTime - 600 * 1000)) {
                let newMessage: Message = {
                    sendTime: msgInfo.sendTime,
                    type: MESSAGE_TYPE.TIP_TIME.toString(),
                    loadStatus:"",
                    sendNickName: "",
                    // add other required properties here...
                };
                chat.messages.push(newMessage);
                chat.lastTimeTip = Number(msgInfo.sendTime.toString());
            }
            // 新的消息
            chat.messages.push(msgInfo);
            this.commit("saveToStorage");
        },
        // 更新已存在的消息，并保存更新后的状态。
        updateMessage(this: { getters: Getters; commit: (mutation: string) => void }, msgInfo: Message): void {
            // 获取对方id或群id
            let chat = this.getters.findChat(msgInfo);
            let message = this.getters.findMessage(chat, msgInfo);
            if (message) {
                // 属性拷贝
                Object.assign(message, msgInfo);
                this.commit("saveToStorage");
            }
        },
        // 删除特定的消息，并保存更新后的状态
        deleteMessage(context: { getters: Getters; commit: (mutation: string) => void }, msgInfo: Message): void {
            let chat = context.getters.findChat(msgInfo);
            for (let idx in chat.messages) {
                // 已经发送成功的，根据id删除
                if (chat.messages[idx].id && chat.messages[idx].id == msgInfo.id) {
                    chat.messages.splice(parseInt(idx), 1);
                    break;
                }
                // 正在发送中的消息可能没有id，根据发送时间删除
                if (msgInfo.selfSend && chat.messages[idx].selfSend &&
                    chat.messages[idx].sendTime == msgInfo.sendTime) {
                    chat.messages.splice(parseInt(idx), 1);
                    break;
                }
            }
            context.commit("saveToStorage");
        },
        // 更新与特定好友相关的聊天信息，并保存更新后的状态。
        updateChatFromFriend(context: { state: State; commit: (mutation: string) => void }, friend: Friend): void {
            for (let i in context.state.chats) {
                let chat = context.state.chats[i];
                if (chat.type == 'PRIVATE' && chat.targetId == friend.id) {
                    chat.headImage = friend.headImageThumb;
                    chat.showName = friend.nickName;
                    break;
                }
            }
            context.commit("saveToStorage");
        },
        // 管理私人消息和群组消息的加载状态，并在所有消息都加载完成后对聊天记录进行排序。
        setLoadingPrivateMsg(state: State, loading: boolean) {
            state.loadingPrivateMsg = loading;
        },
        setLoadingGroupMsg(state: State, loading: boolean) {
            state.loadingGroupMsg = loading;
        },
        sortChats(state: State) {
            state.chats.sort((c1: Chat, c2: Chat) => c2.lastSendTime - c1.lastSendTime);
        },
        loadingPrivateMsg({ commit, state }: { commit: Commit; state: State }, loading: boolean) {
            commit('setLoadingPrivateMsg', loading);
            if (!state.loadingPrivateMsg && !state.loadingGroupMsg) {
                commit('sortChats');
            }
        },
        loadingGroupMsg({ commit, state }: { commit: Commit; state: State }, loading: boolean) {
            commit('setLoadingGroupMsg', loading);
            if (!state.loadingPrivateMsg && !state.loadingGroupMsg) {
                commit('sortChats');
            }
        },
        // 为了在用户下次访问时，能够从 localStorage 中恢复聊天数据，我们需要将聊天数据保存到 localStorage 中。
        saveToStorage(state: State): void {
            let userId = userStore.state.userInfo.id;
            let key = "chats-" + userId;
            let chatsData = {
                privateMsgMaxId: state.privateMsgMaxId,
                groupMsgMaxId: state.groupMsgMaxId,
                chats: state.chats
            }
            localStorage.setItem(key, JSON.stringify(chatsData));
        },
        // 这个函数通常在用户登出或需要清空聊天记录时被调用
        clear(state: State): void {
            state.activeChat = null;
            state.chats = [];
        },
        // 通常在用户登录后被调用，用于恢复用户的聊天数据。
        loadChat(context: Context): Promise<void> {
            return new Promise((resolve, reject) => {
                let userId = userStore.state.userInfo.id;
                let key = "chats-" + userId;
                let item = localStorage.getItem(key);
                if (item) {
                    let chatsData: ChatData = JSON.parse(item);
                    context.commit("initChats", chatsData);
                }
                resolve();
            });
       
    },
});