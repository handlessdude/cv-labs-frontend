import { configStage } from 'components/spline-canvas/resources';

const makeYInverter = (stageConfig: typeof configStage) => (y: number) =>
  stageConfig.height - y;

const bullshitPointsAdapter = (points: Array<{ x: number; y: number }>) =>
  points.flatMap(({ x, y }) => [x, y]);

const base64ToImage = (src: string, alt: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img); // Resolve the promise with the loaded image
    };

    img.onerror = (error) => {
      reject(error); // Reject the promise if there is an error loading the image
    };

    // img.src = `data:image/jpeg;base64,${src}`;
    img.src = src;
    img.alt = alt;
  });

export { makeYInverter, bullshitPointsAdapter, base64ToImage };
