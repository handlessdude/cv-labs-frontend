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
import {
  configStage,
  invertY,
  origin,
} from 'components/spline-canvas/resources';
import { bullshitPointsAdapter } from 'components/spline-canvas/utils';

const stageRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const axisLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const splineLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

const initialPoints = [
  {
    x: origin.x,
    y: invertY(origin.y),
  },
  {
    x: configStage.width,
    y: invertY(configStage.height),
  },
];

let redLine = new Konva.Line({
  points: bullshitPointsAdapter(initialPoints),
  stroke: '#ff964f',
  strokeWidth: 2,
  lineCap: 'round',
  lineJoin: 'round',
  tension: 1,
  draggable: true,
});

const stageSetup = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  spline: Konva.Line
) => {
  let isDrawing = false;
  const splinePoints: Array<number> = [];

  stage.on('mousedown', () => {
    isDrawing = true;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) {
      return;
    }
    splinePoints.push(pointerPos.x, pointerPos.y);
    spline.points(splinePoints);
    // layer.batchDraw();
  });

  stage.on('mousemove', () => {
    if (!isDrawing) return;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    const lastIndex = splinePoints.length - 2;
    splinePoints[lastIndex] = pointerPos.x;
    splinePoints[lastIndex + 1] = pointerPos.y;
    spline.points(splinePoints);
    // layer.batchDraw();
  });

  stage.on('mouseup', () => {
    isDrawing = false;
  });

  stage.on('mouseleave', () => {
    isDrawing = false;
  });

  /*  stage.on('dblclick', () => {
    isDrawing = false;
    splinePoints.length = 0;
    spline.points([]);
    // layer.batchDraw();
  });*/
};

watch(splineLayerRef, (newLayer) => {
  if (!newLayer || !stageRef.value) {
    return;
  }
  newLayer.getNode().add(redLine);
  drawAxis(newLayer.getNode(), stageRef.value?.getNode());
  stageSetup(stageRef.value.getNode(), newLayer.getNode(), redLine);
  stageRef.value.getNode().container().style.backgroundColor = '#dcefea';
});
</script>

<style scoped lang="scss"></style>
