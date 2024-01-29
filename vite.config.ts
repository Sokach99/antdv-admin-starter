import { fileURLToPath } from 'node:url'
import * as process from 'node:process'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { viteBuildInfo } from './plugins/vite-build-info'

const baseSrc = fileURLToPath(new URL('./src', import.meta.url))

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  // 代理
  const proxyObj = {}
  if (mode === 'development' && env.VITE_APP_BASE_API_DEV && env.VITE_APP_BASE_URL_DEV) {
    proxyObj[env.VITE_APP_BASE_API_DEV] = {
      target: env.VITE_APP_BASE_URL_DEV,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API_DEV}`), ''),
    }
  }
  return {
    plugins: [vue(), vueJsx(), UnoCSS(), Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
      dts: 'types/components.d.ts',
    }), viteMockServe({
      mockPath: 'mock',
      enable: true,
    }), viteBuildInfo(env.VITE_APP_NAME)],
    resolve: {
      alias: {
        '@': baseSrc,
        '~': baseSrc,
      },
    },
    build: {
      chunkSizeWarningLimit: 4096,
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            antd: ['ant-design-vue', '@ant-design/icons-vue', 'dayjs'],
            // lodash: ['loadsh-es'],
          },
        },
      },
    },
    server: {
      port: 6678,
      host: '0.0.0.0',
      proxy: {
        ...proxyObj,
      },
    },
  }
}
