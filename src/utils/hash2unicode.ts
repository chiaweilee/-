function hex2int(hex) {
  const len = hex.length;
  const a = new Array(len);
  let code;
  for (let i = 0; i < len; i++) {
    code = hex.charCodeAt(i);
    if (code >= 48 && code < 58) {
      code -= 48;
    } else {
      code = (code & 0xdf) - 65 + 10;
    }
    a[i] = code;
  }

  return a.reduce(function (acc, c) {
    acc = 16 * acc + c;
    return acc;
  }, 0);
}

function int2hex(num) {
  const hex = '0123456789abcdef';
  let s = '';
  while (num) {
    s = hex.charAt(num % 16) + s;
    num = Math.floor(num / 16);
  }
  return `${s || 0}`;
}

function group(string: string) {
  return string
    .replace(/(.{4})/g, '$1,')
    .split(',')
    .filter((_) => _ !== '');
}

export const compress = (hash: string): string => {
  const strings = group(hash);
  return strings.map((string) => String.fromCharCode(hex2int(string))).join('');
};

export const decompress = (compressed: string): string => {
  const strings = compressed.split('');
  return strings.map((string) => int2hex(string.charCodeAt(0))).join('');
};
