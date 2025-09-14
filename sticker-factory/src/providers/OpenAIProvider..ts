import fetch from 'node-fetch';
import { CFG } from '../config.js';
import { ImageProvider, GeneratedImage } from './ImageProvider.js';

export class OpenAIProvider implements ImageProvider {
  async generate(prompt: string, opts?: { size?: number; transparent?: boolean }): Promise<GeneratedImage> {
    const size = opts?.size ?? 1024;

    const body = {
      model: CFG.OPENAI_IMAGE_MODEL,
      prompt,
      size: `${size}x${size}`,
      // Some models accept: background: 'transparent'
      // background: opts?.transparent ? 'transparent' : 'white',
      response_format: 'b64_json'
    } as Record<string, unknown>;

    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CFG.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenAI image gen failed: ${res.status} ${text}`);
    }

    const json: any = await res.json();
    const b64 = json?.data?.[0]?.b64_json;
    if (!b64) throw new Error('No image returned');

    const buffer = Buffer.from(b64, 'base64');
    return { buffer, format: 'png' } satisfies GeneratedImage;
  }
}
