import Konva from 'konva';
import Spline from 'components/spline-canvas/draw-spline';
import { palette, pointLabelOffset } from 'components/spline-canvas/resources';

const stageSetup = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  spline: Konva.Line
) => {
  // Initialize an array to store control points
  const controlPoints: Array<Konva.Circle> = [];
  const controlPointLabels: Array<Konva.Text> = [];

  const moveLabel = (label: Konva.Text, controlPoint: Konva.Circle) => {
    label.draggable(true);
    label.x(controlPoint.x() + pointLabelOffset);
    label.y(controlPoint.y() - pointLabelOffset);
    label.draggable(false);
  };

  // Function to add a draggable control point
  function addControlPoint(x: number, y: number) {
    const controlPoint = new Konva.Circle({
      x,
      y,
      radius: 5,
      fill: palette.pointStroke,
      draggable: true,
    });

    controlPoint.on('dragmove', () => {
      updateSpline();
    });

    const label = new Konva.Text({
      text: controlPoints.length.toString(),
      x: x + pointLabelOffset,
      y: y - pointLabelOffset,
      fontSize: 12,
      fill: palette.accentGray,
    });

    layer.add(label);
    layer.add(controlPoint);
    controlPoints.push(controlPoint);
    controlPointLabels.push(label);
  }

  function updateSpline() {
    if (controlPoints.length < 5) {
      return;
    }
    controlPoints.forEach((point, idx) => {
      moveLabel(controlPointLabels[idx], point);
    });

    const adapter = new Spline(
      controlPoints.map((p) => p.x()),
      controlPoints.map((p) => p.y())
    );

    const splinePoints = [];

    let leftmostX = controlPoints[0].x();
    let rightmostX = controlPoints[0].x();

    controlPoints.forEach((point) => {
      const x = point.x();
      if (x < leftmostX) {
        leftmostX = x;
      }
      if (x > rightmostX) {
        rightmostX = x;
      }
    });

    const delta = (rightmostX - leftmostX) / 100;
    for (let i = 0; i < 100; i++) {
      const x = leftmostX + i * delta;
      splinePoints.push(x, adapter.at(x));
    }
    spline.points(splinePoints);
  }

  addControlPoint(10, 10);
  addControlPoint(50, 50);
  addControlPoint(100, 200);
  addControlPoint(300, 300);
  addControlPoint(350, 350);

  // Update the spline initially
  updateSpline();
};

export { stageSetup };
