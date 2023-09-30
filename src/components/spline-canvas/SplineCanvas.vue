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

const stageRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

const axisLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const splineLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

let redLine = new Konva.Line({
  points: [
    origin.x,
    invertY(origin.y),
    configStage.width,
    invertY(configStage.height),
  ],
  stroke: 'red',
  strokeWidth: 4,
  lineCap: 'round',
  lineJoin: 'round',
  tension: 1,
  draggable: true,
});

// redLine.move({
//   x: 20,
//   y: 5,
// });

watch(splineLayerRef, (newLayer) => {
  if (!newLayer || !stageRef.value) {
    return;
  }
  newLayer.getNode().add(redLine);
  drawAxis(newLayer.getNode(), stageRef.value?.getNode());
});
</script>

<style scoped lang="scss"></style>
