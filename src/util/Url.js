export const logoUrl = () => {
    const dbConfig = window.DASHBOARD_CONFIG;
    if (
        dbConfig &&
        dbConfig['app-configs'] &&
        dbConfig['app-configs'][0] &&
        dbConfig['app-configs'][0].app_images &&
        dbConfig['app-configs'][0].app_images.logo
    ) {
        const logoUrl = dbConfig['app-configs'][0].app_images.logo;
        return logoUrl.includes('sample') ? '/logo.svg' : logoUrl;
    }
    return '/logo.svg';
};
