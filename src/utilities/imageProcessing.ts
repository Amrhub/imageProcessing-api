import sharp from 'sharp';

export const imageProcessing = async (imageName: string, width: number, height: number): Promise<sharp.OutputInfo> => (
  await sharp(`./src/images/${imageName}`)
    .resize(width, height)
    .toFile(`./src/thumbnails/${imageName}`)
)