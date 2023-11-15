import { gql } from '@apollo/client';

const MailingAddressFragment = gql`
    fragment MailingAddressFragment on MailingAddress {
        id
        address1
        address2
        city
        company
        country
        firstName
        formatted
        lastName
        latitude
        longitude
        phone
        province
        zip
        name
        countryCode: countryCodeV2
        provinceCode
    }
`;

const VariantFragment = gql`
    fragment VariantFragment on ProductVariant {
        id
        title
        priceV2 {
            amount
            currencyCode
        }
        presentmentPrices(first: 20) {
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                    price {
                        amount
                        currencyCode
                    }
                    compareAtPrice {
                        amount
                        currencyCode
                    }
                }
            }
        }
        weight
        available: availableForSale
        sku
        compareAtPriceV2 {
            amount
            currencyCode
        }
        image {
            id
            src: originalSrc
            altText
        }
        selectedOptions {
            name
            value
        }
        unitPrice {
            amount
            currencyCode
        }
        unitPriceMeasurement {
            measuredType
            quantityUnit
            quantityValue
            referenceUnit
            referenceValue
        }
    }
`;

const VariantWithProductFragment = gql`
    fragment VariantWithProductFragment on ProductVariant {
        ...VariantFragment
        product {
            id
            handle
        }
    }
    ${VariantFragment}
`;

const DiscountApplicationFragment = gql`
    fragment DiscountApplicationFragment on DiscountApplication {
        __typename
        targetSelection
        allocationMethod
        targetType
        value {
            ... on MoneyV2 {
                amount
                currencyCode
            }
            ... on PricingPercentageValue {
                percentage
            }
        }
        ... on ManualDiscountApplication {
            title
            description
        }
        ... on DiscountCodeApplication {
            code
            applicable
        }
        ... on ScriptDiscountApplication {
            description
        }
        ... on AutomaticDiscountApplication {
            title
        }
    }
`;

const AppliedGiftCardFragment = gql`
    fragment AppliedGiftCardFragment on AppliedGiftCard {
        amountUsedV2 {
            amount
            currencyCode
        }
        balanceV2 {
            amount
            currencyCode
        }
        presentmentAmountUsed {
            amount
            currencyCode
        }
        id
        lastCharacters
    }
`;

export const CheckoutFragment = gql`
    fragment CheckoutFragment on Checkout {
        id
        ready
        requiresShipping
        note
        paymentDueV2 {
            amount
            currencyCode
        }
        webUrl
        orderStatusUrl
        taxExempt
        taxesIncluded
        currencyCode
        totalTax
        totalTaxV2 {
            amount
            currencyCode
        }
        lineItemsSubtotalPrice {
            amount
            currencyCode
        }
        subtotalPriceV2 {
            amount
            currencyCode
        }
        totalPriceV2 {
            amount
            currencyCode
        }
        completedAt
        createdAt
        updatedAt
        email
        discountApplications(first: 10) {
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                    __typename
                    ...DiscountApplicationFragment
                }
            }
        }
        appliedGiftCards {
            ...AppliedGiftCardFragment
        }
        shippingAddress {
            ...MailingAddressFragment
        }
        shippingLine {
            handle
            priceV2 {
                amount
                currencyCode
            }
            title
        }
        customAttributes {
            key
            value
        }
        order {
            id
            processedAt
            orderNumber
            subtotalPriceV2 {
                amount
                currencyCode
            }
            totalShippingPriceV2 {
                amount
                currencyCode
            }
            totalTax
            totalTaxV2 {
                amount
                currencyCode
            }
            totalPriceV2 {
                amount
                currencyCode
            }
            currencyCode
            totalRefunded
            totalRefundedV2 {
                amount
                currencyCode
            }
            customerUrl
            shippingAddress {
                ...MailingAddressFragment
            }
            lineItems(first: 250) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    cursor
                    node {
                        title
                        variant {
                            ...VariantWithProductFragment
                        }
                        quantity
                        customAttributes {
                            key
                            value
                        }
                    }
                }
            }
        }
        lineItems(first: 250) {
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    id
                    title
                    variant {
                        ...VariantWithProductFragment
                    }
                    quantity
                    customAttributes {
                        key
                        value
                    }
                    discountAllocations {
                        allocatedAmount {
                            amount
                            currencyCode
                        }
                        discountApplication {
                            __typename
                            ...DiscountApplicationFragment
                        }
                    }
                }
            }
        }
    }
    ${MailingAddressFragment}
    ${VariantWithProductFragment}
    ${DiscountApplicationFragment}
    ${AppliedGiftCardFragment}
`;
