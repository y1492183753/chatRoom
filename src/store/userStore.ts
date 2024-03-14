import { defineStore } from 'pinia'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('userUserId', {
  // 其他配置...
  state: () => ({ 
    token:"",
    userName:"",
    userId:"",
    nickName:"默认昵称",
    headImage:"../assets/default-head.jpg",
  }),
  getters: {
   getUserName():string{
    return this.userName
   },
   getToken():string{
    return this.token
   },
   getUserId():string{
    return this.userId
   },
   getNickName():string{
    return this.nickName
   },
   getHeadImage():string{
    return this.headImage
   }
  },
  actions: {
    setToken(token:string){
        this.token=token
    },
    setUserName(userName:string){
        this.userName=userName
    },
    setUserId(userId:string){
        this.userId=userId
    },
  },
})