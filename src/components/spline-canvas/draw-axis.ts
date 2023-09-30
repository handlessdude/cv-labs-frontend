import Konva from 'konva';
import { colors, invertY, origin } from 'components/spline-canvas/resources';

const drawAxis = (layer: Konva.Layer, stage: Konva.Stage) => {
  const axisPadding = 0;
  const tickLength = 8;
  const tickInterval = 50;

  // Create X axis
  const xAxis = new Konva.Line({
    points: [
      origin.x,
      invertY(origin.y),
      stage.width() - axisPadding,
      invertY(origin.y),
    ],
    stroke: colors.accentGray,
    strokeWidth: 1,
  });

  layer.add(xAxis);

  // Create X axis ticks and labels
  for (
    let x = axisPadding + tickInterval;
    x < stage.width() - axisPadding;
    x += tickInterval
  ) {
    const tick = new Konva.Line({
      points: [x, invertY(origin.y), x, invertY(tickLength)],
      stroke: colors.accentGray,
      strokeWidth: 1,
    });
    layer.add(tick);

    const label = new Konva.Text({
      text: (x - axisPadding).toString(),
      x: x - 10,
      y: invertY(2.5 * tickLength),
      fontSize: 12,
      fill: colors.accentGray,
    });

    layer.add(label);
  }

  // Create Y axis
  const yAxis = new Konva.Line({
    points: [0, axisPadding, 0, stage.height() - axisPadding],
    stroke: colors.accentGray,
    strokeWidth: 1,
  });

  layer.add(yAxis);

  // Create Y axis ticks and labels
  for (
    let y = axisPadding + tickInterval;
    y < stage.height() - axisPadding;
    y += tickInterval
  ) {
    const tick = new Konva.Line({
      points: [0, y, tickLength, y],
      stroke: colors.accentGray,
      strokeWidth: 1,
    });

    layer.add(tick);

    const label = new Konva.Text({
      text: (stage.height() - y - axisPadding).toString(),
      x: tickLength,
      y: y - 5,
      fontSize: 12,
      fill: colors.accentGray,
    });

    layer.add(label);

    const upperBorder = new Konva.Line({
      points: [
        origin.x,
        invertY(stage.height()),
        stage.width(),
        invertY(stage.height()),
      ],
      stroke: colors.accentGray,
      strokeWidth: 1,
    });
    //layer.add(upperBorder);

    const rightBorder = new Konva.Line({
      points: [
        stage.width(),
        invertY(origin.y),
        stage.width(),
        invertY(stage.height()),
      ],
      stroke: colors.accentGray,
      strokeWidth: 1,
    });
    //layer.add(rightBorder);
  }
};

export { drawAxis };
