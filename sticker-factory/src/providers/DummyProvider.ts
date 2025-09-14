import sharp from 'sharp';
import { ImageProvider, GeneratedImage } from './ImageProvider.js';

// Creates a simple glossy gradient square w/ subject text — for offline testing
export class DummyProvider implements ImageProvider {
  async generate(prompt: string, opts?: { size?: number; transparent?: boolean }): Promise<GeneratedImage> {
    const size = opts?.size ?? 768;
    const svg = `<?xml version="1.0"?>
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffd1dc"/>
            <stop offset="100%" stop-color="#b388ff"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 24}" fill="rgba(255,255,255,0.25)"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Inter,Arial" font-size="${Math.round(size/16)}" fill="#222">
          ${prompt.replace(/</g, '&lt;').slice(0,64)}
        </text>
      </svg>`;
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    return { buffer, format: 'png' } satisfies GeneratedImage;
  }
}
