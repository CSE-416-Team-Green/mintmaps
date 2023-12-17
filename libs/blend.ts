export const blendColors = (color1: any, color2: any) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Average the RGB values
    let blendedRgb;
    if (rgb1 && rgb2) {
        blendedRgb = {
            r: Math.ceil((rgb1.r + rgb2.r) / 2),
            g: Math.ceil((rgb1.g + rgb2.g) / 2),
            b: Math.ceil((rgb1.b + rgb2.b) / 2),
        };
    }
    if (blendedRgb) {
        return rgbToHex(blendedRgb.r, blendedRgb.g, blendedRgb.b);
    }
};

const hexToRgb = (hex: any) => {
    // Convert hex to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

const rgbToHex = (r: any, g: any, b: any) => {
    // Convert RGB to hex
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
