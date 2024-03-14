<template>
	<div class="chat-box">
		<div class="header">
			<span class="title">title</span>
			<span title="群聊信息" v-show="this.chat.type == 'GROUP'" @click="showSide = !showSide">...</span>
		</div>
		<div class="mian">
			<div class="content-box">
				<el-main id="chatScrollBox" @scroll="onScroll"> 
					<ul>
						<li v-for="(msgInfo, idx) in chat.messages" :key="idx">
							<chatMessageItem v-show="idx >= showMinIdx" :mine="msgInfo.sendId == mine.id"
								:headImage="headImage(msgInfo)" :showName="showName(msgInfo)" :msgInfo="msgInfo"
								:groupMembers="groupMembers" @delete="deleteMessage" @recall="recallMessage">
							</chatMessageItem>
						</li>
					</ul>
				</el-main>
			</div>
		</div>
		<div class="footer">
			<div class="chat-tool-bar">
				<div class="chat-tool-item" title="表情" ref="emotion" @click.stop="showEmotionBox()">
					<svg t="1710413625998" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2381" width="32" height="32">
						<path
							d="M822.185081 512.022872c0 171.317899-138.878601 310.1965-310.196499 310.1965S201.837803 683.32934 201.837803 512.022872z"
							p-id="2382"></path>
						<path
							d="M511.988582 1023.99912a508.798614 508.798614 0 0 1-199.276505-40.246219 510.250267 510.250267 0 0 1-162.733715-109.73124 510.238836 510.238836 0 0 1-109.73124-162.733715A508.787184 508.787184 0 0 1 0.000904 512.000011 508.787184 508.787184 0 0 1 40.247122 312.712077a510.238836 510.238836 0 0 1 109.73124-162.733715 510.238836 510.238836 0 0 1 162.733715-109.731241A508.787184 508.787184 0 0 1 512.000012 0.000903a508.787184 508.787184 0 0 1 199.287935 40.280509 510.238836 510.238836 0 0 1 162.733715 109.731241 510.238836 510.238836 0 0 1 109.73124 162.733715 508.787184 508.787184 0 0 1 40.246218 199.287934 508.787184 508.787184 0 0 1-40.32623 199.276505 510.238836 510.238836 0 0 1-109.73124 162.733715 510.250267 510.250267 0 0 1-162.733716 109.73124 508.798614 508.798614 0 0 1-199.219352 40.223358z m0-983.946314a469.009609 469.009609 0 0 0-183.708385 37.080015 470.426971 470.426971 0 0 0-150.02318 101.158487 470.426971 470.426971 0 0 0-101.158487 150.02318A468.998179 468.998179 0 0 0 40.018515 512.022872a468.998179 468.998179 0 0 0 37.080015 183.696954 470.415541 470.415541 0 0 0 101.158487 150.02318 470.426971 470.426971 0 0 0 150.02318 101.158487 469.009609 469.009609 0 0 0 183.708385 37.091446 469.009609 469.009609 0 0 0 183.708384-37.080015 470.426971 470.426971 0 0 0 150.02318-101.158487 470.415541 470.415541 0 0 0 101.158487-150.02318 468.998179 468.998179 0 0 0 37.080015-183.708385 468.998179 468.998179 0 0 0-37.080015-183.708384 470.426971 470.426971 0 0 0-101.158487-150.02318 470.426971 470.426971 0 0 0-150.02318-101.158487A469.009609 469.009609 0 0 0 511.988582 40.041375z"
							p-id="2383"></path>
						<path
							d="M246.07321 381.797037a73.257033 61.918138 90 1 0 123.836276 0 73.257033 61.918138 90 1 0-123.836276 0Z"
							p-id="2384"></path>
						<path
							d="M656.422327 381.797037a73.257033 61.918138 90 1 0 123.836276 0 73.257033 61.918138 90 1 0-123.836276 0Z"
							p-id="2385"></path>
					</svg>
				</div>
				<div class="chat-tool-item" title="发送图片">
					<file-upload :action="'/image/upload'" :maxSize="5 * 1024 * 1024"
						:fileTypes="['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif']"
						@before="onImageBefore" @success="onImageSuccess" @fail="onImageFail">
						<svg t="1710413710263" class="icon" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="2675" width="32" height="32">
							<path
								d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
								fill="#000000" p-id="2676"></path>
						</svg>
					</file-upload>
				</div>
				<div class="chat-tool-item" title="发送文件">
					<file-upload :action="'/file/upload'" :maxSize="10 * 1024 * 1024" @before="onFileBefore"
						@success="onFileSuccess" @fail="onFileFail">
						<svg t="1710414531586" class="icon" viewBox="0 0 1329 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="1197" width="32" height="32">
							<path
								d="M1036.572 951.784h-780.721c-62.416 0-113.411-47.899-115.072-107.38l-78.125-495.818v-2.735c0-60.873 51.662-110.396 115.164-110.396h14.961v-63.036c0-60.873 51.651-110.396 115.13-110.396h234.199c42.067 0 105.428 34.714 140.178 74.338h302.237c48.717 0 161.228 35.661 166.943 104.891 45.468 14.762 78.311 56.069 78.311 104.599v2.747l-78.137 495.807c-1.659 59.493-52.643 107.38-115.072 107.38zM136.887 343.559l78.008 495.070v2.747c0 21.109 18.374 38.279 40.957 38.279h780.721c22.582 0 40.957-17.17 40.957-38.279v-2.747l78.008-495.070c-1.274-20.046-19.146-35.989-40.932-35.989h-37.075v-59.903c-1.823-3.846-12.027-14.026-34.48-24.113-23.096-10.357-46.52-15.078-58.536-15.078h-341.532l-10.87-17.147c-17.953-28.368-70.714-57.191-90-57.191h-234.199c-22.593 0-40.968 17.182-40.968 38.279v135.152h-89.135c-21.775 0-39.647 15.942-40.921 36z"
								p-id="1198"></path>
							<path d="M100.875 306.542h1086.428v69.779h-1086.428z" p-id="1199"></path>
						</svg>
					</file-upload>
				</div>
				<div class="chat-tool-item" title="回执消息" v-show="chat.type == 'GROUP'"
					:class="isReceipt ? 'chat-tool-active' : ''" @click="onSwitchReceipt">
					<svg t="1710413745046" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2874" width="32" height="32">
						<path
							d="M569.1 756.6c0-110.6 90.1-200.1 201.3-200.1 33.8 0 64.8 8.4 92.9 22.4v-375c0-77-63.3-139.9-140.8-139.9H238.3c-77.4 0-140.8 63-140.8 139.9v615.7c0 77 63.3 139.9 140.8 139.9h484.2c11.3 0 22.5-1.4 33.8-4.2-104.2-6.9-187.2-93.7-187.2-198.7zM310 231.9h343.5c23.9 0 43.6 19.6 43.6 43.4 0 23.8-19.7 43.4-43.6 43.4H310c-23.9 0-43.6-19.6-43.6-43.4 0-23.8 19.7-43.4 43.6-43.4z m0 170.7h343.5c23.9 0 43.6 19.6 43.6 43.4 0 23.8-19.7 43.4-43.6 43.4H310c-23.9 0-43.6-19.6-43.6-43.4 0-23.8 19.7-43.4 43.6-43.4z m164.7 257.5H310c-23.9 0-43.6-19.6-43.6-43.4 0-23.8 19.7-43.4 43.6-43.4h164.7c23.9 0 43.6 19.6 43.6 43.4 0.1 23.8-19.6 43.4-43.6 43.4z m0 0"
							p-id="2875"></path>
						<path
							d="M770.3 599.9c-87.3 0-157.7 70-157.7 156.7 0 86.8 70.4 156.7 157.7 156.7 87.3 0 157.7-70 157.7-156.7 0-86.7-70.4-156.7-157.7-156.7z m91.5 208.5l-36.6 43.4c-4.2 4.2-9.9 7-15.5 7-8.4 0-15.5-4.2-18.3-11.2-2.8-7-2.8-15.4 2.8-21l8.4-9.8H694.3c-11.3 0-19.7-8.4-19.7-19.6 0-11.2 8.4-19.6 19.7-19.6h152c8.4 0 15.5 4.2 18.3 11.2 4.3 5.6 2.9 14-2.8 19.6z m-15.4-71.3h-152c-8.4 0-15.5-4.2-18.3-11.2-2.8-7-2.8-15.4 2.8-21l36.6-43.4c7-8.4 19.7-9.8 28.2-2.8 8.4 7 9.9 19.6 2.8 28l-8.4 9.8h108.4c11.3 0 19.7 8.4 19.7 19.6 1.3 12.6-8.6 21-19.8 21z m0 0"
							p-id="2876"></path>
					</svg>
				</div>
				<div class="chat-tool-item" title="发送语音">
					<svg t="1710413769733" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="3070" width="32" height="32">
						<path
							d="M544 851.946667V906.666667a32 32 0 0 1-64 0v-54.72C294.688 835.733333 149.333333 680.170667 149.333333 490.666667v-21.333334a32 32 0 0 1 64 0v21.333334c0 164.949333 133.717333 298.666667 298.666667 298.666666s298.666667-133.717333 298.666667-298.666666v-21.333334a32 32 0 0 1 64 0v21.333334c0 189.514667-145.354667 345.066667-330.666667 361.28zM298.666667 298.56C298.666667 180.8 394.165333 85.333333 512 85.333333c117.781333 0 213.333333 95.541333 213.333333 213.226667v192.213333C725.333333 608.533333 629.834667 704 512 704c-117.781333 0-213.333333-95.541333-213.333333-213.226667V298.56z m64 0v192.213333C362.666667 573.12 429.557333 640 512 640c82.496 0 149.333333-66.805333 149.333333-149.226667V298.56C661.333333 216.213333 594.442667 149.333333 512 149.333333c-82.496 0-149.333333 66.805333-149.333333 149.226667z"
							fill="#000000" p-id="3071"></path>
					</svg>
				</div>
				<div class="chat-tool-item" title="聊天记录">
					<svg t="1710413786198" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="3269" width="32" height="32">
						<path
							d="M372.736 613.888m-183.466667 0a183.466667 183.466667 0 1 0 366.933334 0 183.466667 183.466667 0 1 0-366.933334 0Z"
							fill="#333333" opacity=".3" p-id="3270"></path>
						<path
							d="M512 986.112a470.357333 470.357333 0 0 1-182.101333-36.181333 458.752 458.752 0 0 1-77.824-41.130667c-9.216 0-39.765333 4.437333-138.410667 31.402667a25.770667 25.770667 0 0 1-24.917333-6.656 25.6 25.6 0 0 1-6.656-24.746667c26.965333-98.816 31.061333-129.365333 31.402666-138.410667a479.061333 479.061333 0 0 1-41.130666-77.994666A475.818667 475.818667 0 1 1 512 986.112z m-257.024-128.682667a31.402667 31.402667 0 0 1 21.162667 5.973334A424.277333 424.277333 0 1 0 119.466667 672.768a426.666667 426.666667 0 0 0 39.253333 73.386667c7.168 10.581333 13.312 19.968-15.872 133.290666a533.333333 533.333333 0 0 1 112.128-22.016z"
							fill="#333333" p-id="3271"></path>
						<path
							d="M739.84 570.88H471.381333a25.6 25.6 0 0 1-25.6-25.6V276.821333a25.6 25.6 0 0 1 51.2 0v242.858667h242.858667a25.6 25.6 0 0 1 0 51.2z"
							fill="#333333" p-id="3272"></path>
					</svg>
				</div>
			</div>
			<div class="send-content-area">

				<div contenteditable="true" v-show="!sendImageUrl" ref="editBox" class="send-text-area"
					:disabled="lockMessage" @paste.prevent="onEditorPaste" @compositionstart="onEditorCompositionStart"
					@compositionend="onEditorCompositionEnd" @input="onEditorInput"
					:placeholder="isReceipt ? '【回执消息】' : ''" @blur="onEditBoxBlur()" @keydown.down="onKeyDown"
					@keydown.up="onKeyUp" @keydown.enter.prevent="onKeyEnter">
				</div>

				<div v-show="sendImageUrl" class="send-image-area">
					<div class="send-image-box">
						<img class="send-image" :src="sendImageUrl" />
						<span class="send-image-close " title="删除" @click="removeSendImage()">删除</span>
					</div>
				</div>

				<div class="send-btn-area">
					<el-button type="primary" size="large" @click="sendMessage()">发送</el-button>
				</div>
			</div>
		</div>
		<!-- <emotion ref="emoBox" @emotion="onEmotion"></emotion> -->
		<ChatAtBox ref="atBox" :ownerId="group.ownerId" :members="groupMembers" :search-text="atSearchText"
			@select="onAtSelect"></ChatAtBox>

	</div>
</template>

<script>
import chatMessageItem from '../chat/chatMessageItem.vue'
import ChatAtBox from "../chat/chatAtBox.vue"
import emotion from '../common/emotion.vue'
export default {
	name: "chatPrivate",
	components: {
		chatMessageItem,
		emotion,
		ChatAtBox
	},
	props: {
		chat: {
			type: Object
		}
	},
	data() {
		return {
			friend: {},
			group: {},
			groupMembers: [],
			sendImageUrl: "",
			sendImageFile: "",
			isReceipt: true,
			showVoice: false, // 是否显示语音录制弹窗
			showSide: false, // 是否显示群聊信息栏
			showHistory: false, // 是否显示历史聊天记录
			lockMessage: false, // 是否锁定发送，
			showMinIdx: 0, // 下标低于showMinIdx的消息不显示，否则页面会很卡
			atSearchText: "",
			focusNode: null, // 缓存光标所在节点
			focusOffset: null, // 缓存光标所在节点位置
			zhLock: false // 解决中文输入法触发英文的情况
		}
	},
	methods: {
		moveChatToTop() {
			let chatIdx = this.$store.getters.findChatIdx(this.chat);
			console.log(chatIdx);
			this.$store.commit("moveTop", chatIdx);
		},
		closeRefBox() {
			this.$refs.emoBox.close();
			this.$refs.atBox.close();
		},
		onKeyDown() {
			if (this.$refs.atBox.show) {
				this.$refs.atBox.moveDown()
			}
		},
		onKeyUp() {
			if (this.$refs.atBox.show) {
				this.$refs.atBox.moveUp()
			}
		},
		onKeyEnter() {
			if (this.$refs.atBox.show) {
				// 键盘操作不会自动修正焦点，需要手动修正,原因不详
				this.focusOffset += this.atSearchText.length;
				this.$refs.atBox.select();
			} else {
				this.sendMessage();
			}
		},
		onEditBoxBlur() {
			let selection = window.getSelection()
			// 记录光标位置(点击emoji时)
			this.focusNode = selection.focusNode;
			this.focusOffset = selection.focusOffset;
		},
		onEditorInput(e) {
			// 如果触发 @
			if (this.chat.type == "GROUP" && !this.zhLock) {
				if (e.data == '@') {
					// 打开选择弹窗
					this.showAtBox(e);
				} else {
					let selection = window.getSelection()
					let range = selection.getRangeAt(0)
					this.focusNode = selection.focusNode;
					// 截取@后面的名称作为过滤条件
					let stIdx = this.focusNode.textContent.lastIndexOf('@');
					this.atSearchText = this.focusNode.textContent.substring(stIdx + 1);
				}
			}

		},
		onEditorCompositionStart() {
			this.zhLock = true;
		},
		onEditorCompositionEnd(e) {
			this.zhLock = false;
			this.onEditorInput(e);
		},
		showAtBox(e) {
			this.atSearchText = "";
			let selection = window.getSelection()
			let range = selection.getRangeAt(0)
			// 记录光标所在位置
			this.focusNode = selection.focusNode;
			this.focusOffset = selection.focusOffset;
			// 光标所在坐标
			let pos = range.getBoundingClientRect();
			this.$refs.atBox.open({
				x: pos.x,
				y: pos.y
			})
		},
		onAtSelect(member) {
			let range = window.getSelection().getRangeAt(0)
			// 选中输入的 @xx 符
			range.setStart(this.focusNode, this.focusOffset - 1 - this.atSearchText.length)
			range.setEnd(this.focusNode, this.focusOffset)
			range.deleteContents()
			// 创建元素节点
			let element = document.createElement('SPAN')
			element.className = "at"
			element.dataset.id = member.userId;
			element.contentEditable = 'false'
			element.innerText = `@${member.aliasName}`
			range.insertNode(element)
			// 光标移动到末尾
			range.collapse()
			// 插入空格
			let textNode = document.createTextNode('\u00A0');
			range.insertNode(textNode)
			range.collapse()
			this.atSearchText = "";
			this.$refs.editBox.focus()
		},
		onSwitchReceipt() {
			this.isReceipt = !this.isReceipt;
		},
		createSendText() {
			let sendText = this.isReceipt ? "【回执消息】" : "";
			this.$refs.editBox.childNodes.forEach((node) => {
				if (node.nodeName == "#text") {
					sendText += this.html2Escape(node.textContent);
				} else if (node.nodeName == "SPAN") {
					sendText += node.innerHTML;
				} else if (node.nodeName == "IMG") {
					sendText += node.dataset.code;
				}
			})
			return sendText;
		},
		html2Escape(strHtml) {
			return strHtml.replace(/[<>&"]/g, function (c) {
				return {
					'<': '&lt;',
					'>': '&gt;',
					'&': '&amp;',
					'"': '&quot;'
				}[c];
			});
		},
		createAtUserIds() {
			let ids = [];
			this.$refs.editBox.childNodes.forEach((node) => {
				if (node.nodeName == "SPAN") {
					ids.push(node.dataset.id);
				}
			})
			return ids;
		},
		onEditorPaste(e) {
			let txt = e.clipboardData.getData('Text')
			if (typeof (txt) == 'string') {
				let range = window.getSelection().getRangeAt(0)
				let textNode = document.createTextNode(txt);
				range.insertNode(textNode)
				range.collapse();
			}
			let items = (e.clipboardData || window.clipboardData).items
			if (items.length) {
				for (let i = 0; i < items.length; i++) {
					if (items[i].type.indexOf('image') !== -1) {
						let file = items[i].getAsFile();
						this.sendImageFile = file;
						this.sendImageUrl = URL.createObjectURL(file);
					}
				}
			}
		},
		removeSendImage() {
			this.sendImageUrl = "";
			this.sendImageFile = null;
		},
		onImageSuccess(data, file) {
			let msgInfo = JSON.parse(JSON.stringify(file.msgInfo));
			msgInfo.content = JSON.stringify(data);
			msgInfo.receipt = this.isReceipt;
			this.$http({
				url: this.messageAction,
				method: 'post',
				data: msgInfo
			}).then((id) => {
				msgInfo.loadStatus = 'ok';
				msgInfo.id = id;
				this.isReceipt = false;
				this.$store.commit("insertMessage", msgInfo);
			})
		},
		onImageFail(e, file) {
			let msgInfo = JSON.parse(JSON.stringify(file.msgInfo));
			msgInfo.loadStatus = 'fail';
			this.$store.commit("insertMessage", msgInfo);
		},
		onImageBefore(file) {
			let url = URL.createObjectURL(file);
			let data = {
				originUrl: url,
				thumbUrl: url
			}
			let msgInfo = {
				id: 0,
				fileId: file.uid,
				sendId: this.mine.id,
				content: JSON.stringify(data),
				sendTime: new Date().getTime(),
				selfSend: true,
				type: 1,
				readedCount: 0,
				loadStatus: "loading",
				status: this.$enums.MESSAGE_STATUS.UNSEND
			}
			// 填充对方id
			this.fillTargetId(msgInfo, this.chat.targetId);
			// 插入消息
			this.$store.commit("insertMessage", msgInfo);
			// 会话置顶
			this.moveChatToTop();
			// 滚动到底部
			this.scrollToBottom();
			// 借助file对象保存
			file.msgInfo = msgInfo;
		},
		onFileSuccess(url, file) {
			let data = {
				name: file.name,
				size: file.size,
				url: url
			}
			let msgInfo = JSON.parse(JSON.stringify(file.msgInfo));
			msgInfo.content = JSON.stringify(data);
			msgInfo.receipt = this.isReceipt
			this.$http({
				url: this.messageAction,
				method: 'post',
				data: msgInfo
			}).then((id) => {
				msgInfo.loadStatus = 'ok';
				msgInfo.id = id;
				this.isReceipt = false;
				this.$store.commit("insertMessage", msgInfo);
			})
		},
		onFileFail(e, file) {
			let msgInfo = JSON.parse(JSON.stringify(file.msgInfo));
			msgInfo.loadStatus = 'fail';
			this.$store.commit("insertMessage", msgInfo);
		},
		onFileBefore(file) {
			let url = URL.createObjectURL(file);
			let data = {
				name: file.name,
				size: file.size,
				url: url
			}
			let msgInfo = {
				id: 0,
				sendId: this.mine.id,
				content: JSON.stringify(data),
				sendTime: new Date().getTime(),
				selfSend: true,
				type: 2,
				loadStatus: "loading",
				readedCount: 0,
				status: this.$enums.MESSAGE_STATUS.UNSEND
			}
			// 填充对方id
			this.fillTargetId(msgInfo, this.chat.targetId);
			// 插入消息
			this.$store.commit("insertMessage", msgInfo);
			// 会话置顶
			this.moveChatToTop();
			// 滚动到底部
			this.scrollToBottom();
			// 借助file对象透传
			file.msgInfo = msgInfo;
		},
		onCloseSide() {
			this.showSide = false;
		},
		onScrollToTop() {
			// 多展示10条信息
			this.showMinIdx = this.showMinIdx > 10 ? this.showMinIdx - 10 : 0;
		},
		onScroll(e) {
			let scrollElement = e.target
			let scrollTop = scrollElement.scrollTop
			if (scrollTop < 30) { // 在顶部,不滚动的情况
				// 多展示20条信息
				this.showMinIdx = this.showMinIdx > 20 ? this.showMinIdx - 20 : 0;
			}
		},
		showEmotionBox() {
			let width = this.$refs.emotion.offsetWidth;
			let left = this.$elm.fixLeft(this.$refs.emotion);
			let top = this.$elm.fixTop(this.$refs.emotion);
			this.$refs.emoBox.open({
				x: left + width / 2,
				y: top
			})
		},
		onEmotion(emoText) {
			// 保持输入框焦点
			this.$refs.editBox.focus();
			let range = window.getSelection().getRangeAt(0);
			// 插入光标所在位置
			range.setStart(this.focusNode, this.focusOffset)
			let element = document.createElement('IMG')
			element.className = "emo"
			element.dataset.code = emoText;
			element.contentEditable = 'true'
			element.setAttribute("src", this.$emo.textToUrl(emoText));
			// 选中元素节点
			range.insertNode(element)
			// 光标移动到末尾
			range.collapse()

		},
		showVoiceBox() {
			this.showVoice = true;
		},
		closeVoiceBox() {
			this.showVoice = false;
		},
		showVideoBox() {
			this.$store.commit("showChatPrivateVideoBox", {
				friend: this.friend,
				master: true
			});
		},
		showHistoryBox() {
			this.showHistory = true;
		},
		closeHistoryBox() {
			this.showHistory = false;
		},
		onSendVoice(data) {
			let msgInfo = {
				content: JSON.stringify(data),
				type: 3,
				receipt: this.isReceipt
			}
			// 填充对方id
			this.fillTargetId(msgInfo, this.chat.targetId);
			this.$http({
				url: this.messageAction,
				method: 'post',
				data: msgInfo
			}).then((id) => {
				msgInfo.id = id;
				msgInfo.sendTime = new Date().getTime();
				msgInfo.sendId = this.$store.state.userStore.userInfo.id;
				msgInfo.selfSend = true;
				msgInfo.status = this.$enums.MESSAGE_STATUS.UNSEND;
				msgInfo.readedCount = 0;
				this.$store.commit("insertMessage", msgInfo);
				// 会话置顶
				this.moveChatToTop();
				// 保持输入框焦点
				this.$refs.editBox.focus();
				// 滚动到底部
				this.scrollToBottom();
				// 关闭录音窗口
				this.showVoice = false;
				this.isReceipt = false;

			})
		},
		fillTargetId(msgInfo, targetId) {
			if (this.chat.type == "GROUP") {
				msgInfo.groupId = targetId;
			} else {
				msgInfo.recvId = targetId;
			}
		},
		sendMessage() {
			if (this.sendImageFile) {
				this.sendImageMessage();
			} else {
				this.sendTextMessage();
			}
			// 消息已读
			this.readedMessage()
		},
		sendImageMessage() {
			let file = this.sendImageFile;
			this.onImageBefore(this.sendImageFile);
			let formData = new FormData()
			formData.append('file', file)
			this.$http.post("/image/upload", formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then((data) => {
				this.onImageSuccess(data, file);
			}).catch((res) => {
				this.onImageSuccess(res, file);
			})
			this.sendImageFile = null;
			this.sendImageUrl = "";
			this.$nextTick(() => this.$refs.editBox.focus());
			this.scrollToBottom();
		},
		sendTextMessage() {
			let sendText = this.createSendText();
			if (!sendText.trim()) {
				return
			}
			this.$refs.editBox.cle
			let msgInfo = {
				content: sendText,
				type: 0
			}
			// 填充对方id
			this.fillTargetId(msgInfo, this.chat.targetId);
			// 被@人员列表
			if (this.chat.type == "GROUP") {
				msgInfo.atUserIds = this.createAtUserIds();
				msgInfo.receipt = this.isReceipt;
			}
			this.lockMessage = true;
			this.$http({
				url: this.messageAction,
				method: 'post',
				data: msgInfo
			}).then((id) => {
				msgInfo.id = id;
				msgInfo.sendTime = new Date().getTime();
				msgInfo.sendId = this.$store.state.userStore.userInfo.id;
				msgInfo.selfSend = true;
				msgInfo.readedCount = 0;
				msgInfo.status = this.$enums.MESSAGE_STATUS.UNSEND;
				this.$store.commit("insertMessage", msgInfo);
				// 会话置顶
				this.moveChatToTop();
			}).finally(() => {
				// 解除锁定
				this.lockMessage = false;
				this.scrollToBottom();
				this.resetEditor();
				this.isReceipt = false;
			});

		},
		deleteMessage(msgInfo) {
			this.$confirm('确认删除消息?', '删除消息', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.commit("deleteMessage", msgInfo);
			});
		},
		recallMessage(msgInfo) {
			this.$confirm('确认撤回消息?', '撤回消息', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let url = `/message/${this.chat.type.toLowerCase()}/recall/${msgInfo.id}`
				this.$http({
					url: url,
					method: 'delete'
				}).then(() => {
					this.$message.success("消息已撤回");
					msgInfo = JSON.parse(JSON.stringify(msgInfo));
					msgInfo.type = 10;
					msgInfo.content = '你撤回了一条消息';
					msgInfo.status = this.$enums.MESSAGE_STATUS.RECALL;
					this.$store.commit("insertMessage", msgInfo);
				})
			});
		},
		readedMessage() {
			if (this.chat.unreadCount == 0) {
				return;
			}
			this.$store.commit("resetUnreadCount", this.chat)
			if (this.chat.type == "GROUP") {
				var url = `/message/group/readed?groupId=${this.chat.targetId}`
			} else {
				url = `/message/private/readed?friendId=${this.chat.targetId}`
			}
			this.$http({
				url: url,
				method: 'put'
			}).then(() => { })
		},
		loadReaded(fId) {
			this.$http({
				url: `/message/private/maxReadedId?friendId=${fId}`,
				method: 'get'
			}).then((id) => {
				this.$store.commit("readedMessage", {
					friendId: fId,
					maxId: id
				});
			});
		},
		loadGroup(groupId) {
			this.$http({
				url: `/group/find/${groupId}`,
				method: 'get'
			}).then((group) => {
				this.group = group;
				this.$store.commit("updateChatFromGroup", group);
				this.$store.commit("updateGroup", group);

			});

			this.$http({
				url: `/group/members/${groupId}`,
				method: 'get'
			}).then((groupMembers) => {
				this.groupMembers = groupMembers;
			});
		},
		loadFriend(friendId) {
			// 获取对方最新信息
			this.$http({
				url: `/user/find/${friendId}`,
				method: 'get'
			}).then((friend) => {
				this.friend = friend;
				this.$store.commit("updateChatFromFriend", friend);
				this.$store.commit("updateFriend", friend);
			})
		},
		showName(msgInfo) {
			if (this.chat.type == 'GROUP') {
				let member = this.groupMembers.find((m) => m.userId == msgInfo.sendId);
				return member ? member.aliasName : "";
			} else {
				return msgInfo.sendId == this.mine.id ? this.mine.nickName : this.chat.showName
			}

		},
		headImage(msgInfo) {
			if (this.chat.type == 'GROUP') {
				let member = this.groupMembers.find((m) => m.userId == msgInfo.sendId);
				return member ? member.headImage : "";
			} else {
				return msgInfo.sendId == this.mine.id ? this.mine.headImageThumb : this.chat.headImage
			}
		},
		resetEditor() {
			this.sendImageUrl = "";
			this.sendImageFile = null;
			this.$nextTick(() => {
				this.$refs.editBox.innerHTML = "";
				this.$refs.editBox.focus();
			});
		},
		scrollToBottom() {
			this.$nextTick(() => {
				let div = document.getElementById("chatScrollBox");
				div.scrollTop = div.scrollHeight;
			});
		}
	},
	computed: {
		mine() {
			return this.$store.state.userStore.userInfo;
		},
		title() {
			let title = this.chat.showName;
			if (this.chat.type == "GROUP") {
				let size = this.groupMembers.filter(m => !m.quit).length;
				title += `(${size})`;
			}
			return title;
		},
		messageAction() {
			return `/message/${this.chat.type.toLowerCase()}/send`;
		},
		unreadCount() {
			return this.chat.unreadCount;
		}
	},
	watch: {
		chat: {
			handler(newChat, oldChat) {
				if (newChat.targetId > 0 && (!oldChat || newChat.type != oldChat.type ||
					newChat.targetId != oldChat.targetId)) {
					if (this.chat.type == "GROUP") {
						this.loadGroup(this.chat.targetId);
					} else {
						this.loadFriend(this.chat.targetId);
						// 加载已读状态
						this.loadReaded(this.chat.targetId)
					}
					// 滚到底部
					this.scrollToBottom();
					this.showSide = false;
					// 消息已读
					this.readedMessage()
					// 初始状态只显示30条消息
					let size = this.chat.messages.length;
					this.showMinIdx = size > 30 ? size - 30 : 0;
					// 重置输入框
					this.resetEditor();
					// 复位回执消息
					this.isReceipt = false;
				}
			},
			immediate: true
		},
		unreadCount: {
			handler(newCount, oldCount) {
				if (newCount > 0) {
					// 拉至底部
					this.scrollToBottom();
				}
			}
		}
	},
	mounted() {
		let div = document.getElementById("chatScrollBox");
		div.addEventListener('scroll', this.onScroll)
	}
}
</script>

<style scoped>
.chat-box {
	width: 100%;
	height: 100vh;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

.header {
	height: 8vh;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
}

.title {
	font-size: 18px;
	font-weight: 600;
	color: #333;
	letter-spacing: 1px;
}

.content-box {
	height: 60vh;
	width: 100%;
	padding: 0;
	border: #ffffff solid 3px;
}

#chatScrollBox {
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 0 10px;
}

.footer {
	height: 32vh;
	background-color: #fff;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
	padding: 0;
	box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, .1);
}

.chat-tool-bar {
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0;
	z-index: 0;
	border: 1px 0 #333;
}

.chat-tool-item {
	width: 50px;
	height: 100%;
	display: flex;
	justify-content: center;
	margin: 6px 10px;
	align-items: center;
	cursor: pointer;
	z-index: 1;
	/* background-color: #c6c5c5; */
}

.send-content-area {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 80%;
	width: 96%;
	background-color: white !important;
}

.send-text-area {
	box-sizing: border-box;
	padding: 5px;
	width: 100%;
	flex: 1;
	resize: none;
	font-size: 16px;
	color: black;
	outline-color: rgba(83, 160, 231, 0.61);
	text-align: left;
	line-height: 30 px;
}

.send-image-area {
	text-align: left;
	border: #53a0e7 solid 1px;
}

.send-image-box {
	position: relative;
	display: inline-block;
}

.send-image {
	max-height: 180px;
	border: 1px solid #ccc;
	border-radius: 2%;
	margin: 2px;
}

.send-image-close {
	position: absolute;
	padding: 3px;
	right: 7px;
	top: 7px;
	color: white;
	cursor: pointer;
	font-size: 15px;
	font-weight: 600;
	background-color: #aaa;
	border-radius: 50%;
	border: 1px solid #ccc;
}

.send-btn-area {
	padding: 10px;
	position: absolute;
	bottom: 10px;
	right: 20px;
}
</style>