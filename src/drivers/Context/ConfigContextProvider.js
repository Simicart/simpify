import React, { useContext, createContext } from 'react';
import { IntlProvider } from 'react-intl';
import { gql, useQuery } from '@apollo/client';

const DEFAULT_LOCALE = 'en';

const ConfigContext = createContext();

export const ConfigContextProvider = (props) => {
    const { data } = useQuery(GET_SHOP_DETAILS, {
        fetchPolicy: 'cache-first',
    });
    const simiConfig = window.DASHBOARD_CONFIG;
    const translationTerms = {};

    if (
        simiConfig &&
        simiConfig['app-configs'] &&
        simiConfig['app-configs'][0] &&
        simiConfig['app-configs'][0].language
    ) {
        try {
            const apiTerms = simiConfig['app-configs'][0].language;
            Object.keys(apiTerms).map((key) => {
                let newKey = key.split('_');
                newKey = newKey[0];
                translationTerms[newKey] = apiTerms[key];
            });
        } catch (err) {}
    }

    return (
        <IntlProvider
            messages={translationTerms.it ? translationTerms.it : {}}
            locale='it'
            defaultLocale={DEFAULT_LOCALE}
        >
            <ConfigContext.Provider value={data}>
                {props.children}
            </ConfigContext.Provider>
        </IntlProvider>
    );
};

export const useConfig = () => useContext(ConfigContext);

const GET_SHOP_DETAILS = gql`
    query getShopDetails {
        shop {
            name
            currencyCode
            moneyFormat
            description
            primaryDomain {
                host
                url
            }
            metafields(first: 10) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    cursor
                    node {
                        id
                        namespace
                        key
                        valueType
                        value
                    }
                }
            }
            paymentSettings {
                currencyCode
                acceptedCardBrands
                enabledPresentmentCurrencies
            }
        }
        localization {
            availableCountries {
                currency {
                    isoCode
                    name
                    symbol
                }
                isoCode
                name
                unitSystem
            }
            country {
                currency {
                    isoCode
                    name
                    symbol
                }
                isoCode
                name
                unitSystem
            }
        }
    }
`;
