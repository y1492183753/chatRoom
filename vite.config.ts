import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
 
  // server:{
  //   proxy:{
  //     '/dev':{
  //       target:'http://6u16672v39.goho.co:8888',
  //       rewrite:(path)=>path.replace(/^\/dev/,'')
  //     }
  //   }
  // }
})
