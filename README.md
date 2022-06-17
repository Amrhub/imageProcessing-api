# Image Processing

> This project allows you to process images from images folder and save them to processed folder (thumbnails), when requesting url more than once it doesn't re-process the img it returns image as is.

## Built With

- TypeScript
- Jasmine, Sharp, and supertest.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Node.js and npm

### Setup

```bash
git clone https://github.com/Amrhub/imageProcessing-api.git
cd imageProcessing-api
npm install
```

or you can download zip file and unzip it. then run

```bash
npm install
```

### Usage

```bash
npm start # to start live server via typescript or
npm run build # to build the static files
node build/index.js # to start the server after building
```

You can see the live server at http://localhost:3000 it should be running and returns `Welcome to Image processing api current version vX.X.X`.

### Endpoints

`/image_processing` it expects query inputs `name` "image name" and `width` and `height`.

They are required, It's also required to send width and height with values bigger than zero.
There are validations for unprocessable entities.

Example of hitting this endpoint
`/image_processing?name=fjord.jpg&width=300&height=300`

expected output: to be a jpg image just like [src/images/fjord.jpg](./src/images/fjord.jpg) with a width of 300 and height of 300.

### All available Script Commands

```bash
npm start # to start the live server via typescript
npm run build # build project in build/ directory
npm run lint # to lint the code in .ts files
npm run prettier # runs prettier on .ts files
npm run jasmine # to run tests on js files after building
npm test # builds first then run tests
```

## Author

👤 **Amr Ahmed**

- GitHub: [@Amrhub](https://github.com/amrhub)
- LinkedIn: [AmrAhmed](https://linkedin.com/in/amr-abdelrehim-ahmed)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!
