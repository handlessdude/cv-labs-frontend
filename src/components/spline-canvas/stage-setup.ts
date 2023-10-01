import Konva from 'konva';
import Spline from 'components/spline-canvas/draw-spline';
import {
  invertY,
  palette,
  pointLabelOffset,
} from 'components/spline-canvas/resources';
import { ref, Ref } from 'vue';
import { Nullable } from 'src/models/generic';

const stageSetup = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  spline: Konva.Line
) => {
  const controlPoints: Ref<Array<Konva.Circle>> = ref([]);
  const interpolator: Ref<Nullable<Spline>> = ref(null);

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
      name: 'control-point',
      x,
      y,
      radius: 5,
      fill: palette.pointStroke,
      draggable: true,
    });

    controlPoint.on('dragmove', () => {
      updateSpline();
    });

    controlPoint.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
      controlPoint.scale({ x: 1.5, y: 1.5 });
    });

    controlPoint.on('mouseout', () => {
      document.body.style.cursor = 'default';
      controlPoint.scale({ x: 1, y: 1 });
    });

    const label = new Konva.Text({
      text: controlPoints.value.length.toString(),
      x: x + pointLabelOffset,
      y: y - pointLabelOffset,
      fontSize: 12,
      fill: palette.accentGray,
    });

    layer.add(label);
    layer.add(controlPoint);
    controlPoints.value.push(controlPoint);
    controlPointLabels.push(label);
  }

  function updateSpline() {
    if (controlPoints.value.length < 5) {
      return;
    }
    controlPoints.value.forEach((point, idx) => {
      moveLabel(controlPointLabels[idx], point);
    });

    interpolator.value = new Spline(
      controlPoints.value.map((p) => p.x()),
      controlPoints.value.map((p) => p.y())
    );

    const splinePoints = [];

    let leftmostX = controlPoints.value[0].x();
    let rightmostX = controlPoints.value[0].x();

    controlPoints.value.forEach((point) => {
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
      splinePoints.push(x, interpolator.value.at(x));
    }
    spline.points(splinePoints);
  }

  addControlPoint(30, invertY(30));
  addControlPoint(117, invertY(82));
  addControlPoint(170, invertY(169));
  addControlPoint(215, invertY(279));
  addControlPoint(346, invertY(371));

  // Update the spline initially
  updateSpline();

  return {
    interpolator,
    controlPoints,
  };
};

export { stageSetup };
