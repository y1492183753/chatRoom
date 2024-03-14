<template>
    <div class="chat-page">
        <div width="260px" class="chat-list-box">
            <div class="chat-list-header">
                <el-input placeholder="搜索" v-model="searchText">
                    <template #append>
                        <el-button><svg t="1710231430055" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1015" width="16" height="16">
                                <path
                                    d="M797.525333 752.266667c62.069333-72.736 97.28-165.002667 97.28-262.186667C894.816 266.528 713.621333 85.333333 490.08 85.333333 266.538667 85.333333 85.333333 266.538667 85.333333 490.069333 85.333333 713.610667 266.538667 894.826667 490.069333 894.826667a404.693333 404.693333 0 0 0 118.208-17.546667 32 32 0 0 0-18.666666-61.216 340.693333 340.693333 0 0 1-99.541334 14.762667C301.888 830.816 149.333333 678.261333 149.333333 490.069333 149.333333 301.888 301.888 149.333333 490.069333 149.333333 678.261333 149.333333 830.826667 301.888 830.826667 490.069333c0 89.28-35.381333 173.696-97.141334 237.322667a36.992 36.992 0 0 0 0.384 51.925333l149.973334 149.973334a32 32 0 0 0 45.258666-45.248L797.525333 752.266667z"
                                    fill="#8a8a8a" p-id="1016"></path>
                            </svg></el-button>
                    </template>
                </el-input>
            </div>
            <div class="chat-list-loadding" v-if="loading" v-loading="true" element-loading-text="消息接收中..."
                element-loading-spinner="el-icon-loading" element-loading-background="#eee">
                <div class="chat-loading-box"></div>
            </div>
            <el-scrollbar class="chat-list-items">
                <div v-for="(chat, index) in chatStore.chats" :key="index">
                    <chatItem v-show="chat.showName.startsWith(searchText)" :chat="chat" :index="index" v-bind="$attrs"
                        @click="onActiveItem(index)" @delete="onDelItem(index)" @top="onTop(index)"·
                        :active="chat === chatStore.activeChat"></chatItem>
                </div>
            </el-scrollbar>
        </div>
        <el-container class="chat-box">
			<chatBox v-if="chatStore.activeChat" :chat="chatStore.activeChat"></chatBox>
		</el-container>
    </div>
</template>

<script>
import ChatItem from '../../components/chat/chatItem.vue'
import ChatBox from '../../components/chat/chatBox.vue'
import { useChatStore } from '../../store/chatStore'
const store = useChatStore()
export default {
    name: 'Chat',
    components: {
		ChatItem,
		ChatBox
	},
    // Add your component logic here
    data() {
        return {
            searchText: "",
            messageContent: "",
            group: {},
            groupMembers: []
        }
    },
   
    methods: {
        onActiveItem(index) {
            store.activeChat(index)
        },
        onDelItem(index) {
            store.removeChat(index)
        },
        onTop(chatIdx) {
            store.moveTop(chatIdx)
        },
    },
    computed: {
        chatStore() {
            return store;
        },
        loading(){
            return store.loadingGroupMsg || store.loadingPrivateMsg
        }
    }
}
</script>

<style scoped>
/* Add your component styles here */
.chat-page {
    display: flex;
    height: 100%;
    background-color: #f0f0f0;
}

.chat-list-box {
    width: 260px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-right: 1px solid #ebeef5;
    overflow: hidden;
}

.chat-list-header {
    padding: 10px 20px;
    border-bottom: 1px solid #ebeef5;
}
</style>