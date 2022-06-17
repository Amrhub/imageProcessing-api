import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';
export const app = express();
const port = 3000;

interface ValidateQueryInputs {
  name?: string;
  height?: string;
  width?: string;
}

app.get('/', (_req, res) => {
  res.send('Welcome to Image processing api current version v1.0.0');
});

app.get('/image_processing', async (req, res) => {
  const { width, height, name } = req.query;
  const validateQueryInputs: ValidateQueryInputs = {};
  let isQueryInputsValid = true;
  if (!name) {
    isQueryInputsValid = false;
    validateQueryInputs.name = "is required with it's extension e.g 'image.jpg'";
  }

  if (!(parseInt(height as string) > 0)) {
    isQueryInputsValid = false;
    validateQueryInputs.height = 'must be bigger than zero e.g 500';
  }

  if (!(parseInt(width as string) > 0)) {
    isQueryInputsValid = false;
    validateQueryInputs.width = 'must be bigger than zero e.g 500';
  }

  if (!isQueryInputsValid) {
    res.status(422).send(JSON.stringify({ image: validateQueryInputs }));
    return;
  }
  try {
    const outputImage = await fs.readFile(`./src/thumbnails/${name as string}`);

    res.contentType(`image/jpg`);
    res.send(outputImage);
  } catch {
    try {
      await sharp(`./src/images/${name}`)
        .resize(parseInt(width as string), parseInt(height as string))
        .toFile(`./src/thumbnails/${name}`);

      const outputImage = await fs.readFile(`./src/thumbnails/${name}`);

      res.contentType(`image/jpg`);
      res.send(outputImage);
    } catch (err) {
      if (err instanceof Error && err.message.includes('missing')) {
        // assuming there are errors might occur from sharp not able to resize for example so I just want to give user accurate and user friendly message
        res.status(404).send(`Image ${name} not found`);
        return;
      }
      console.error(err);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
