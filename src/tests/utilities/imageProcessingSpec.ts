import { imageProcessing } from '../../utilities/imageProcessing';
import fs from 'fs';

const imageName = 'forTesting.jpg';
const thumbnailPath = `./src/thumbnails/${imageName}`

describe("Testing image processing", () => {
  beforeAll(() => {
    if (fs.existsSync(thumbnailPath))
      fs.unlinkSync(thumbnailPath)
  })

  it("Should save image correctly", async () => {
    await imageProcessing(imageName, 400, 400);

    const isImageSaved = fs.existsSync(thumbnailPath);

    expect(isImageSaved).toBeTruthy;
  })

  afterAll(() => {
    if (fs.existsSync(thumbnailPath))
      fs.unlinkSync(thumbnailPath)
  })
})