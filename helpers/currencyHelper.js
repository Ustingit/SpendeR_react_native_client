export const DEFAULT_CURRENCY_SHORT_SIGN = "zl."
export const ZLOTY_CURRENCY_SHORT_SIGN = DEFAULT_CURRENCY_SHORT_SIGN
export const EURO_CURRENCY_SHORT_SIGN = "eur."
export const DOLLAR_CURRENCY_SHORT_SIGN = "dol."
export const BELARUS_R_CURRENCY_SHORT_SIGN = "blr."

export function getShortCurrencySignById(id) {
    if (id === 0) {
        return ZLOTY_CURRENCY_SHORT_SIGN;
    }
    
    if (id === 1) {
        return DOLLAR_CURRENCY_SHORT_SIGN;
    }

    if (id === 2) {
        return EURO_CURRENCY_SHORT_SIGN;
    }

    if (id === 3) {
        return BELARUS_R_CURRENCY_SHORT_SIGN;
    }

    return DEFAULT_CURRENCY_SHORT_SIGN;
}