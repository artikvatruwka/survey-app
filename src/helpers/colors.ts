export const generateGradientColors = (color1: string, color2: string, color3: string, n: number) => {
  const hexToRgb = (hex: string): number[] => {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
  };

  const rgbToHex = (rgb: number[]): string => {
    return '#' + rgb.map(c => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const color1Rgb = hexToRgb(color1);
  const color2Rgb = hexToRgb(color2);
  const color3Rgb = hexToRgb(color3);
  const colors: string[] = [];
  for (let i = 0; i < n; i++) {
    let r, g, b;
    if (i < n / 2) {
      r = Math.round(color1Rgb[0] + (color2Rgb[0] - color1Rgb[0]) * (i / (n / 2)));
      g = Math.round(color1Rgb[1] + (color2Rgb[1] - color1Rgb[1]) * (i / (n / 2)));
      b = Math.round(color1Rgb[2] + (color2Rgb[2] - color1Rgb[2]) * (i / (n / 2)));
    } else {
      r = Math.round(color2Rgb[0] + (color3Rgb[0] - color2Rgb[0]) * ((i - n / 2) / (n / 2)));
      g = Math.round(color2Rgb[1] + (color3Rgb[1] - color2Rgb[1]) * ((i - n / 2) / (n / 2)));
      b = Math.round(color2Rgb[2] + (color3Rgb[2] - color2Rgb[2]) * ((i - n / 2) / (n / 2)));
    }
    colors.push(rgbToHex([r, g, b]));
  }
  return colors;
}
