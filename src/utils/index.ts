const hexToRgb = (hex: string) => {
  let alpha = false,
    h = hex.replace(/#/g, "");
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;

  const hexaParseInt = parseInt(h, 16);

  return [
    hexaParseInt >>> (alpha ? 24 : 16),
    (hexaParseInt & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8),
    (hexaParseInt & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0),
    alpha ? hexaParseInt & 0x000000ff : 255
  ];
};

const hsbToRgb = (h: number, s: number, b: number): [number, number, number] => {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  const red = Math.round(255 * f(5));
  const green = Math.round(255 * f(3));
  const blue = Math.round(255 * f(1));
  return [red, green, blue];
};

const rgbToHsb = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;

  const hue = Math.round(60 * (h < 0 ? h + 6 : h));
  const saturation = Math.round(v && (n / v) * 100);
  const brightness = Math.round(v * 100);
  return [hue, saturation, brightness];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
};

type rgbaArrayType = [number, number, number, number];

const rgbaToArray = (rgba: string): rgbaArrayType => {
  const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/i;
  const matches = rgba.match(rgbaRegex);

  if (matches) {
    const red = parseInt(matches[1]);
    const green = parseInt(matches[2]);
    const blue = parseInt(matches[3]);
    const alpha = matches[4] ? parseFloat(matches[4]) : 1;
    return [red, green, blue, alpha];
  } else return [0, 0, 0, 1];
};

const convertPercentToHex = (percent: number): string => {
  const hexOpacity = Math.round((percent / 100) * 255)
    .toString(16)
    .padStart(2, "0");

  return hexOpacity;
};

const changeOpacityColorHex = (color: string, percent: number) => {
  const hexOpacity = convertPercentToHex(percent);
  return `${color.slice(0, 7)}${hexOpacity}`;
};

const removeAccents = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export {
  hexToRgb,
  hsbToRgb,
  rgbToHsb,
  rgbToHex,
  removeAccents,
  rgbaToArray,
  convertPercentToHex,
  changeOpacityColorHex
};
