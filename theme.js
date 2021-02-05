/**
 * This theme is for https://styled-system.com
 */

const borderWidths = [0, 1, 2, 4];

const colors = {
  black: 'hsl(236, 18%, 19%)',
  yellow: 'hsl(48, 81%, 75%)',
  salmon: 'hsl(8, 72%, 72%)',
  purple: 'hsl(238, 12%, 55%)',
  white: 'hsl(0, 8%, 97%)',
};

colors.primary = colors.purple;
colors.secondary = colors.salmon;
colors.text = colors.purple;

const lineHeights = [1.25];

// A perfect fifth
const ratio = 1.5;

// Build a modular scale starting from `basisPx` pixels, times `ratio` to the `i`th power.
const basisPx = 16;

const scales = [];
for (let i = -2; i <= 8; i += 1) {
  scales.push(ratio ** i);
}

const fontSizes = scales.map((scale) => scale.toPrecision(5) * basisPx);

// The spacing scale for padding and margins
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512, 1024];

// Layout sizes for width and height match spacing scale
const sizes = space;

export default {
  basisPx,
  borderWidths,
  colors,
  fontSizes,
  lineHeights,
  ratio,
  scales,
  sizes,
  space,
};
