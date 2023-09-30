<template>
  <v-stage ref="stageRef" :config="configStage">
    <v-layer ref="axisLayerRef" :config="{}"></v-layer>
    <v-layer ref="splineLayerRef" :config="{}"></v-layer>
  </v-stage>
</template>

<script setup lang="ts">
import Konva from 'konva';
import { Nullable } from 'src/models/generic';
import { ref, Ref, watch } from 'vue';
import { drawAxis } from 'components/spline-canvas/draw-axis';
import { configStage } from 'components/spline-canvas/resources';

const stageRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const axisLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const splineLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

let spline = new Konva.Line({
  id: 'spline',
  points: [],
  stroke: 'blue',
  strokeWidth: 2,
});

const stageSetup = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  spline: Konva.Line
) => {
  // Initialize an array to store control points
  const controlPoints = [];

  // Function to add a draggable control point
  function addControlPoint(x: number, y: number) {
    const controlPoint = new Konva.Circle({
      x,
      y,
      radius: 5,
      fill: 'red',
      draggable: true,
    });

    controlPoint.on('dragmove', () => {
      updateSpline();
    });

    layer.add(controlPoint);
    controlPoints.push(controlPoint);
  }

  // Function to update the Catmull-Rom spline
  function updateSpline() {
    if (controlPoints.length < 4) {
      return;
    }

    const splinePoints = [];

    for (let i = 1; i < controlPoints.length - 2; i++) {
      const p0 = controlPoints[i - 1];
      const p1 = controlPoints[i];
      const p2 = controlPoints[i + 1];
      const p3 = controlPoints[i + 2];

      for (let t = 0; t <= 1; t += 0.01) {
        const x =
          0.5 *
          (2 * p1.x() +
            (-p0.x() + p2.x()) * t +
            (2 * p0.x() - 5 * p1.x() + 4 * p2.x() - p3.x()) * t * t +
            (-p0.x() + 3 * p1.x() - 3 * p2.x() + p3.x()) * t * t * t);

        const y =
          0.5 *
          (2 * p1.y() +
            (-p0.y() + p2.y()) * t +
            (2 * p0.y() - 5 * p1.y() + 4 * p2.y() - p3.y()) * t * t +
            (-p0.y() + 3 * p1.y() - 3 * p2.y() + p3.y()) * t * t * t);

        splinePoints.push(x, y);
      }
    }

    spline.points(splinePoints);
  }

  // Add initial control points
  addControlPoint(50, 50);
  addControlPoint(100, 200);
  addControlPoint(300, 300);
  addControlPoint(350, 350);

  // Update the spline initially
  updateSpline();
};

watch(splineLayerRef, (newLayer) => {
  if (!newLayer || !stageRef.value) {
    return;
  }
  drawAxis(newLayer.getNode(), stageRef.value?.getNode());
  newLayer.getNode().add(spline);
  stageSetup(stageRef.value.getNode(), newLayer.getNode(), spline);
  stageRef.value.getNode().container().style.backgroundColor = '#dcefea';
});
</script>

<style scoped lang="scss"></style>
