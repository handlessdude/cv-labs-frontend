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
import Spline from 'components/spline-canvas/draw-spline';

const stageRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const axisLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const splineLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

let spline = new Konva.Line({
  id: 'spline',
  points: [],
  stroke: '#ff964f',
  strokeWidth: 2,
});

const stageSetup = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  spline: Konva.Line
) => {
  // Initialize an array to store control points
  const controlPoints: Array<Konva.Circle> = [];

  // Function to add a draggable control point
  function addControlPoint(x: number, y: number) {
    const controlPoint = new Konva.Circle({
      x,
      y,
      radius: 5,
      fill: '#ec8550',
      draggable: true,
    });

    controlPoint.on('dragmove', () => {
      updateSpline();
    });

    layer.add(controlPoint);
    controlPoints.push(controlPoint);
  }

  function updateSpline() {
    if (controlPoints.length < 5) {
      return;
    }

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
