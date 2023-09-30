import { configStage } from 'components/spline-canvas/resources';

const makeYInverter = (stageConfig: typeof configStage) => (y: number) =>
  stageConfig.height - y;

const bullshitPointsAdapter = (points: Array<{ x: number; y: number }>) =>
  points.flatMap(({ x, y }) => [x, y]);

export { makeYInverter, bullshitPointsAdapter };
