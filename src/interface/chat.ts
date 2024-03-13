export interface State {
    privateMsgMaxId: number;
    groupMsgMaxId: number;
    chats: Chat[];
    moveTop(idx: number): void;
    activeChat: Chat | null;
    loadingPrivateMsg: boolean;
    loadingGroupMsg: boolean;
}
export interface Chat{
    messages: Message[];
    type: string; 
    targetId: string; 
    showName: string; 
    headImage: string; 
    lastContent: string; 
    lastSendTime: number; 
    sendNickName: string;
    unreadCount: number; 
    atMe: boolean; 
    atAll: boolean; 
    lastTimeTip?: number;
}


export interface Message {
    loadStatus: string;
    id?: number;
    groupId?: number;
    type: string;
    content?: string;
    sendTime: number;
    sendNickName: string;
    selfSend?: boolean;
    status?: string;
    atUserIds?: number[];
}

export interface Getters {
    findChat(msgInfo: Message): Chat;
    findMessage(chat: Chat, msgInfo: Message): Message;
}

export interface Friend {
    id: string;
    headImageThumb: string;
    nickName: string;
}
export interface UserState {
    userInfo: {
        id: string;
    };
}

export interface ChatData {
    privateMsgMaxId: number;
    groupMsgMaxId: number;
    chats: Chat[];
}

export interface Context {
    commit: (mutation: string, payload: any) => void;
}
          
export interface MsgInfo {
    groupId?: string;
    selfSend?: boolean;
    recvId?: string;
    sendId?: string;
    id?: string;
    sendTime?: number;
}