export const logoUrl = () => {
    const dbConfig = window.DASHBOARD_CONFIG;
    if (
        dbConfig &&
        dbConfig['app-configs'] &&
        dbConfig['app-configs'][0] &&
        dbConfig['app-configs'][0].app_images &&
        dbConfig['app-configs'][0].app_images.logo
    ) {
        return dbConfig['app-configs'][0].app_images.logo;
    }
    return window.SMCONFIGS.logo_url
        ? window.SMCONFIGS.logo_url
        : 'https://www.simicart.com/skin/frontend/default/simicart2.1/images/simicart/new_logo_small.png';
};
