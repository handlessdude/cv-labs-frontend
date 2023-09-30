import { makeYInverter } from 'components/spline-canvas/utils';

const origin = {
  x: 0,
  y: 0,
};

const configStage = {
  width: 368,
  height: 400,
};

const invertY = makeYInverter(configStage);

const palette = {
  accentGray: '#5e5e5e',
  lineStroke: '#ff964f',
  pointStroke: '#dc7d4c',
  // background: '#dcefea',
  background: '#cfe7e0',
};

const pointLabelOffset = 10;
export { origin, configStage, invertY, palette, pointLabelOffset };
