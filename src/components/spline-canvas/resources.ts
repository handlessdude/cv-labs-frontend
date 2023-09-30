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

const colors = {
  accentGray: '#5e5e5e',
};

export { origin, configStage, invertY, colors };
