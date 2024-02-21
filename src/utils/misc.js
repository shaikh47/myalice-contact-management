export const generateColorFromWord = (word) => {
  const totalAscii = word
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  // Increase the RGB components for a bright cyanish tone
  const red = (totalAscii & 0x0000ff) << 1;
  const green = (totalAscii & 0x0000ff) << 1; // Increase the green component
  const blue = (totalAscii & 0x00ff00) << 2; // Increase the blue component

  const hexColor = `#${((red << 16) | (green << 8) | blue)
    .toString(16)
    .toUpperCase()
    .padStart(6, "0")}`;

  return hexColor;
};
