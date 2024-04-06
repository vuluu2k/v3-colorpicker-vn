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

type gradientOptions = {
  degree?: number;
  shape?: string;
  position?: Position;
  colors: Color[];
};

type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
  x: number;
};

type Position = {
  x: number;
  y: number;
};

const getColors = (gradientString: string): Color[] => {
  return (gradientString.match(/rgba?\([\d\s,]+\)\s\d+(\.\d+)?%/g) || []).map((colorString) => {
    const [color, percent]: any = colorString.match(/rgba?\([\d\s,]+\)|\d+(\.\d+)?%/g);
    const [r, g, b, a] = rgbaToArray(color);
    return {
      r,
      g,
      b,
      a,
      x: (parseFloat(percent) / 100) * 128
    };
  });
};

const parseLinearGradient = (gradientString: string): gradientOptions => {
  const degree = gradientString.match(/-?\d+(\.\d+)?(deg|grad|rad|turn)/)?.[0] as string;

  const colors: Color[] = getColors(gradientString);

  return { degree: parseFloat(degree), colors };
};

const parseRadialGradient = (gradientString: string): gradientOptions => {
  const [position, shape]: any = (gradientString.match(/(circle|ellipse) at [\d.]+% [\d.]+%/) || []).map((str) =>
    str.split(" ")
  );

  const colors = getColors(gradientString);
  return {
    shape: shape[0],
    position: {
      x: (parseFloat(position[2]) / 100) * 240,
      y: (parseFloat(position[3]) / 100) * 120
    },
    colors
  };
};

const parseConicGradient = (gradientString: string): gradientOptions => {
  const [[angle, _, x, y]]: any = gradientString
    .match(/-?\d+(\.\d+)?deg at [\d.]+% [\d.]+%/)
    ?.map((str) => str && str.split(" "));

  const colors = getColors(gradientString);

  return {
    degree: parseFloat(angle),
    position: { x: parseFloat(x), y: parseFloat(y) },
    colors
  };
};

export {
  hexToRgb,
  hsbToRgb,
  rgbToHsb,
  rgbToHex,
  removeAccents,
  rgbaToArray,
  convertPercentToHex,
  changeOpacityColorHex,
  parseLinearGradient,
  parseRadialGradient,
  parseConicGradient
};
