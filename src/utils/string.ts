import type { JSONValue } from 'hono/utils/types';

export class StringUtils {
  static truncateUtf8(str: string, n: number): string {
    let result = '';
    for (const char of str) {
      result += char;
      if (new TextEncoder().encode(result).length > n) {
        return result.slice(0, -1);
      }
    }
    return result;
  }

  static truncate2byte(s: string, n: number): string {
    return s.length !== this.truncateUtf8(s, n).length
      ? `${this.truncateUtf8(s, n)}...`
      : s;
  }

  static removeDiacritics(str: string): string {
    const diacriticsMap = {
      a: /[àáạảãâầấậẩẫăằắặẳẵ]/g,
      e: /[èéẹẻẽêềếệểễ]/g,
      i: /[ìíịỉĩ]/g,
      o: /[òóọỏõôồốộổỗơờớợởỡ]/g,
      u: /[ùúụủũưừứựửữ]/g,
      y: /[ỳýỵỷỹ]/g,
      d: /đ/g,
      c: /[ç]/g,
      n: /[ñ]/g
    };
    str = str.toLowerCase().replace(/\s/g, '').replace(/'/g, '');
    for (const [nonDiacritic, regex] of Object.entries(diacriticsMap)) {
      str = str.replace(regex, nonDiacritic);
    }
    return str;
  }
}

export class URLUtils {
  static construct(base: string, params: JSONValue) {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    return url.toString();
  }
}
