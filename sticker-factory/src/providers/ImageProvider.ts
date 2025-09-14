export interface GeneratedImage {
  buffer: Buffer; // PNG or JPEG buffer
  format: 'png' | 'jpeg';
}

export interface ImageProvider {
  generate(prompt: string, opts?: { size?: number; transparent?: boolean }): Promise<GeneratedImage>;
}
