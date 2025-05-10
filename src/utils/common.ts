/**
 * Checking value is undefined or not
 *
 * @param value any
 * @returns boolean
 */
export function isUndefined(val: any): boolean {
    return typeof val === 'undefined'
  }


  /**
 * Checking value is valid string or not
 *
 * @param value any
 * @returns boolean
 */
export function isString(value: any): boolean {
    return typeof value === 'string' && value.length > 0
}


  
  /**
   * Checking if array is empty or not
   *
   * @param value any
   * @returns boolean
   */
 export function isEmptyArray(value: any): boolean {
    return !(Array.isArray(value) && value?.length > 0)
  }



/**
 * Gets the first element of `array`.
 *
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 */
export function first(array: any[]) {
    return array != null && array.length ? array[0] : undefined
}
  

export function getFirstLetter(text?: string) {
  if (text && typeof text === "string") {
    return text.charAt(0);
  }
  return null;
}

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};


