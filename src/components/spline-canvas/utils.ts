import { configStage } from 'components/spline-canvas/resources';

const makeYInverter = (stageConfig: typeof configStage) => (y: number) =>
  stageConfig.height - y;

const bullshitPointsAdapter = (points: Array<{ x: number; y: number }>) =>
  points.flatMap(({ x, y }) => [x, y]);

const cubicSplineInterpolation = (points: Array<{ x: number; y: number }>) => {
  const n = points.length - 1;
  const h = [];
  const alpha = [];
  const l = [];
  const mu: Array<number> = [];
  const z: Array<number> = [];
  const c: Array<number> = [];
  const b: Array<number> = [];
  const d: Array<number> = [];

  // Step 1: Sort the points based on x-coordinates
  points.sort((a, b) => a.x - b.x);

  // Step 2: Calculate differences and initialize arrays
  for (let i = 0; i < n; i++) {
    h[i] = points[i + 1].x - points[i].x;
    alpha[i] = (3 / h[i]) * (points[i + 1].y - points[i].y);
  }

  // Step 3: Calculate the tridiagonal system
  for (let i = 1; i < n; i++) {
    l[i] = 2 * (points[i + 1].x - points[i - 1].x) - h[i - 1] * mu[i - 1];
    mu[i] = h[i] / l[i];
    z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
  }
  console.log(l, mu, z);

  // Step 4: Calculate the cubic spline coefficients
  c[n] = 0;
  for (let j = n - 1; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1];
    b[j] =
      (points[j + 1].y - points[j].y) / h[j] -
      (h[j] * (c[j + 1] + 2 * c[j])) / 3;
    d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
  }

  // Step 5: Define the spline function
  function spline(x: number) {
    let i = 0;
    while (i < n && x > points[i + 1].x) {
      i++;
    }
    const dx = x - points[i].x;
    return points[i].y + b[i] * dx + c[i] * dx * dx + d[i] * dx * dx * dx;
  }

  return spline;
};

export { makeYInverter, bullshitPointsAdapter, cubicSplineInterpolation };
