import './assets/scss/main.scss';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { setupI18n } from './plugins/vue-i18n.js';
import { setupRouter } from './router';
import { apolloProvider } from './plugins/apollo-provider.js';
import store from './store';
// import i18n from './plugins/vue-i18n.js';
import './plugins/notifications.js';
import './global-components.js';
import { translations } from 'fantom-vue-components/src/mixins/translations.js';
import { faTranslations } from 'fantom-vue-components/src/locales/fa.js';
import { psTranslations } from 'fantom-vue-components/src/locales/ps.js';
import PortalVue from 'portal-vue';
// import { isAnyComponentChanged } from 'fantom-vue-components/src/utils/vue-helpers.js';
import { getRoutes, getMaintenanceRoutes } from '@/router/routes.js';
import { beforeEachRoute } from '@/modules/app/DocumentMeta.js';
import appConfig from '@/app.config.js';

Vue.use(PortalVue);

// set fantom-vue-components translations
translations.add('fa', faTranslations);
translations.add('ps', psTranslations);

Vue.config.productionTip = false;
export const i18n = setupI18n();
export let vueApp = null;

const router = setupRouter({
    routes: appConfig.underMaintenance ? getMaintenanceRoutes() : getRoutes(),
    beforeEach: beforeEachRoute,
});

vueApp = new Vue({
    i18n,
    router,
    store,
    apolloProvider,
    render: h => h(App),
}).$mount('#app');

// check if any form was changed before window unload
/*
window.addEventListener('beforeunload', function(_event) {
    const message = isAnyComponentChanged(vueApp.$root, translations._('componentChangeMessages'), true);

    if (message) {
        _event.preventDefault();
        return (_event.returnValue = message);
    }
});
*/
