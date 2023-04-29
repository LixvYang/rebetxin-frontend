/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import UIKit from "@foxone/uikit"
import Passport from "@foxone/mixin-passport"
import 'vuetify/dist/vuetify.min.css'


const app = createApp(App)

registerPlugins(app)

app.use(UIKit)
app.use(Passport, {
  infuraId: '',
})


app.mount('#app')
