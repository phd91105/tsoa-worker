export class StringUtils {
  static truncateUtf8(str: string, n: number) {
    let l = 0;
    let r = '';
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (
        (c >= 0x0 && c < 0x81) ||
        c === 0xf8f0 ||
        (c >= 0xff61 && c < 0xffa0) ||
        (c >= 0xf8f1 && c < 0xf8f4)
      ) {
        l += 1;
      } else {
        l += 2;
      }
      if (l <= n) {
        r = r.concat(str[i]);
      }
    }
    return r;
  }

  static truncate2byte(s: string, n: number) {
    if (s !== null && s !== undefined) {
      const r = this.truncateUtf8(s.toString(), n);

      if (r.length !== s.toString().length) {
        return `${r}...`;
      } else {
        return r;
      }
    }

    return s;
  }

  static removeDiacritics(str: string) {
    str = str.toLowerCase();
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    str = str.replace(/[ìíịỉĩ]/g, 'i');
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
    str = str.replace(/[ỳýỵỷỹ]/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\s/g, '');
    str = str.replace(/'/g, '');

    return str;
  }

  static removeSingleQuote(str: string) {
    return str.replace(/'/g, '');
  }
}
