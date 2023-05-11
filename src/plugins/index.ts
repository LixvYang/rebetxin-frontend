/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import router from '../router'
import { usePresets } from "@foxone/uikit/presets";
import { createVuetify } from 'vuetify'
import { md1 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import UIKit from "@foxone/uikit"
import Passport from "@foxone/mixin-passport"
import { Button, List, Cell, CellGroup } from 'vant'
import 'vant/lib/index.css';



// Types
import type { App } from 'vue'
import store from '@/store';

const messages = {
  en: {
    // ... your English translations
    "uikit.connect_wallet": "connect_wallet",
    "uikit.gas_fee_hint": "gas fee"
  },
  zhHans: {
    // ... your Chinese translations
    "uikit.connect_wallet": "连接钱包",
    "uikit.gas_fee_hint": "gas费用"
  },
};

const vuetify = createVuetify(
  usePresets({
    // overwrite vuetify options
    blueprint: md1,
    ssr: true,
    locale: {
      locale: 'zhHans',
      fallback: 'en',
      messages
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
  })
)

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(store)
    .use(UIKit)
    .use(Passport, {})
    app.use(Button);
    app.use(List);
    app.use(Cell);
    app.use(CellGroup);
}

export function listenWindow(app: App) {
  window.addEventListener('resize', () => {
    store.commit('main/changeIsMobile', window.innerWidth <= 600)
  })
}
