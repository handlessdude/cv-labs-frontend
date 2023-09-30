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
import { configStage, palette } from 'components/spline-canvas/resources';
import { stageSetup } from 'components/spline-canvas/stage-setup';

const stageRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const axisLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const splineLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

let spline = new Konva.Line({
  id: 'spline',
  points: [],
  stroke: palette.lineStroke,
  strokeWidth: 2,
});

watch(splineLayerRef, (newLayer) => {
  if (!newLayer || !stageRef.value) {
    return;
  }
  drawAxis(newLayer.getNode(), stageRef.value?.getNode());
  newLayer.getNode().add(spline);
  stageSetup(stageRef.value.getNode(), newLayer.getNode(), spline);
  stageRef.value.getNode().container().style.backgroundColor =
    palette.background;
});
</script>

<style scoped lang="scss"></style>
