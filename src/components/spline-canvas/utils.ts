import { configStage } from 'components/spline-canvas/resources';

const makeYInverter = (stageConfig: typeof configStage) => (y: number) =>
  stageConfig.height - y;

export { makeYInverter };
