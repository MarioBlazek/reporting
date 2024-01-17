export abstract class StringUtil {
  /**
   *
   * @param price Price in cents
   * @returns Decimal price with two digits and german decimal separator
   */
  static formatPrice(price: number): string {
    return parseFloat((price / 100).toString())
      .toFixed(2)
      .replace('.', ',');
  }

  /**
   *
   * @param n Number to be converted (e.g. part of a date)
   * @returns Two digit string
   */
  static addLeadingZero(n: number): string {
    return String(n).padStart(2, '0');
  }

  /**
   *
   * @param date Date to be converted
   * @returns Date as string in format dd.mm.yyyy hh:mm
   */
  static formatDateTime(date: Date): string {
    return `
      ${StringUtil.addLeadingZero(date.getDay())}.${StringUtil.addLeadingZero(
      date.getMonth(),
    )}.${StringUtil.addLeadingZero(date.getFullYear())} 
      ${StringUtil.addLeadingZero(date.getHours())}:${StringUtil.addLeadingZero(
      date.getMinutes(),
    )}`;
  }
}
