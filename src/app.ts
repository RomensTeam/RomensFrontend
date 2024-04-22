const appUrl = import.meta.env.VITE_URL
    ? import.meta.env.VITE_URL
    : window.location.hostname
;
const settings = {
    locale: window.navigator.language.substr(0, 2),
    fallbackLocale: 'en',
    availableLocale: [
        'ru',
        'en',
    ],
    appUrl: appUrl,
    logo: {
        wide: 'https://romens.org/Romens/logo_wide_primary_null.svg',
    },
}
export default settings;
