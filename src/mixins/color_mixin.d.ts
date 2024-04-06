type dataType = {
  hex: string;
  hsb: {
    hue: number;
    saturation: number;
    brightness: number;
  };
  rgb: {
    red: number;
    green: number;
    blue: number;
  };
  alpha: number;
};

declare global {
  interface Window {
    MY_SEL: any;
  }
}

export { dataType };
