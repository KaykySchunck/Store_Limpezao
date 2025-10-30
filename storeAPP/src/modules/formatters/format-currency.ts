export interface CurrencyConfig {
  locales?: string;
  currency?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

type FormatCurrencyValueType = number | string;

/**
 * @description Format a number or string to currency
 * @param {number} value - Value in cents
 * @param {CurrencyConfig} options - Currency configuration
 * @returns {string} - Formatted currency
 * @example
 * formatCurrency(1000) // R$ 10,00
 * formatCurrency(1000, { locales: 'en-US', currency: 'USD' }) // $10.00
 */
function formatCurrency(
  value: FormatCurrencyValueType,
  options?: CurrencyConfig
): string {
  value = typeof value === "string" ? parseFloat(value) : value;
  const { locales = "pt-BR", currency = "BRL", ...isOptions } = options || {};
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
    ...isOptions,
  }).format(value / 100);
}

/**
 *
 * @param {number|string} value - Value in cents
 * @description - when value is zero or not has decimal hide digits.
 * @return R$ 0 or R$ 10 or R$ 10,01
 */
function cleanFormatCurrency(value: FormatCurrencyValueType) {
  const valueNumber = Number(value);
  const getDigits = Number(String(valueNumber).slice(-2));

  if (valueNumber === 0 || getDigits === 0) {
    return formatCurrency(value, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }

  return formatCurrency(value);
}

export { formatCurrency, cleanFormatCurrency };
