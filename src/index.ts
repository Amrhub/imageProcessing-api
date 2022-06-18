import express from 'express';
import fsSync, { promises as fs } from 'fs';
import { validateQueryInputs, QueryInputs } from './utilities/helpers';
import { imageProcessing } from './utilities/imageProcessing';
export const app = express();
const port = 3000;



app.get('/', (_req, res) => {
  res.send('Welcome to Image processing api current version v1.0.0');
});



app.get('/image_processing', async (req, res) => {
  const { width, height, name }: QueryInputs = req.query;

  const { isQueryInputsValid, queryInputsValidationMsg } = validateQueryInputs({ width, height, name });
  if (!isQueryInputsValid) {
    res.status(422).send(JSON.stringify({ image: queryInputsValidationMsg }));
    return;
  }
  try {
    const outputImage = await fs.readFile(`./src/thumbnails/${name}`);

    res.contentType(`image/jpg`);
    res.send(outputImage);
  } catch {
    try {
      if (!fsSync.existsSync(`./src/images/${name}`)) throw new Error("Input file is missing: ./src/images/AmrAhmed.jpg")
      imageProcessing(name as string, parseInt(width as string), parseInt(height as string))

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
