import 'dotenv/config';

export const CFG = {
  OUTPUT_ROOT: process.env.OUTPUT_ROOT || './output',
  IMAGE_PROVIDER: (process.env.IMAGE_PROVIDER || 'dummy') as 'openai' | 'dummy',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_IMAGE_MODEL: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',

  // Sheet defaults (8.5x11 @ 300dpi)
  SHEET_WIDTH: 2550,  // px
  SHEET_HEIGHT: 3300, // px
  SHEET_MARGIN: 120,  // px outer margin
  CELL_GUTTER: 32,    // px spacing between cells
  MAX_CELL: 512,      // px max cell size (stickers are scaled to fit)

  // Export defaults
  STICKER_MAX_DIM: 768,       // px max width/height for single sticker PNGs
  STICKER_PADDING: 32,        // px white "border" padding around each sticker
  BACKGROUND_COLOR: { r: 255, g: 255, b: 255, alpha: 0 }, // transparent
};

export type StickerPrompt = {
  name: string;         // slug-friendly short name e.g. "glossy-donut"
  prompt: string;       // the style+subject prompt
  count?: number;       // how many variants
  size?: number;        // output square size request (provider)
};
