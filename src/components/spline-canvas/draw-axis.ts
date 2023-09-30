import Konva from 'konva';
import { palette, invertY, origin } from 'components/spline-canvas/resources';

const drawBorders = (layer: Konva.Layer, stage: Konva.Stage) => {
  // Create X axis
  const xAxis = new Konva.Line({
    points: [origin.x, invertY(origin.y), stage.width(), invertY(origin.y)],
    stroke: palette.accentGray,
    strokeWidth: 1,
  });

  // Create Y axis
  const yAxis = new Konva.Line({
    points: [0, 0, 0, stage.height()],
    stroke: palette.accentGray,
    strokeWidth: 1,
  });

  const upperBorder = new Konva.Line({
    points: [
      origin.x,
      invertY(stage.height()),
      stage.width(),
      invertY(stage.height()),
    ],
    stroke: palette.accentGray,
    strokeWidth: 1,
  });

  const rightBorder = new Konva.Line({
    points: [
      stage.width(),
      invertY(origin.y),
      stage.width(),
      invertY(stage.height()),
    ],
    stroke: palette.accentGray,
    strokeWidth: 1,
  });

  layer.add(upperBorder);
  layer.add(rightBorder);
  layer.add(yAxis);
  layer.add(xAxis);
};

const drawAxis = (layer: Konva.Layer, stage: Konva.Stage) => {
  const axisPadding = 0;
  const tickLength = 8;
  const tickInterval = 50;

  // Create X axis ticks and labels
  for (
    let x = axisPadding + tickInterval;
    x < stage.width() - axisPadding;
    x += tickInterval
  ) {
    const tick = new Konva.Line({
      points: [x, invertY(origin.y), x, invertY(tickLength)],
      stroke: palette.accentGray,
      strokeWidth: 1,
    });
    layer.add(tick);

    const label = new Konva.Text({
      text: (x - axisPadding).toString(),
      x: x - 10,
      y: invertY(2.5 * tickLength),
      fontSize: 12,
      fill: palette.accentGray,
    });

    layer.add(label);
  }

  // Create Y axis ticks and labels
  for (
    let y = axisPadding + tickInterval;
    y < stage.height() - axisPadding;
    y += tickInterval
  ) {
    const tick = new Konva.Line({
      points: [0, y, tickLength, y],
      stroke: palette.accentGray,
      strokeWidth: 1,
    });

    layer.add(tick);

    const label = new Konva.Text({
      text: (stage.height() - y - axisPadding).toString(),
      x: tickLength,
      y: y - 5,
      fontSize: 12,
      fill: palette.accentGray,
    });

    layer.add(label);
  }

  // drawBorders(layer, stage);
};

export { drawAxis };
