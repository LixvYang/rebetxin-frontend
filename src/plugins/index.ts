/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import router from '../router'
import { createVuetify } from 'vuetify'
import { usePresets } from "@foxone/uikit/presets";

// Types
import type { App } from 'vue'

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
  }
};

const vuetify = createVuetify(
  usePresets({
    // overwrite vuetify options
    locale: {
      locale: 'zhHans',
      fallback: 'en',
      messages
    },
  })
)

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
}
