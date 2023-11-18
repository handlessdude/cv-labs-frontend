<template>
  <q-select v-model="mode" outlined dense :options="modes" class="q-mb-md" />
  <q-slider
    v-model="strokeWidth"
    :min="strokeWidthLimits.min"
    :max="strokeWidthLimits.max"
    class="q-mr-md q-mb-md"
  />
  <v-stage ref="stageRef" :config="configStage">
    <v-layer ref="drawLayerRef" :config="{}"></v-layer>
  </v-stage>
</template>

<script setup lang="ts">
import { configStage } from 'components/spline-canvas/resources';
import { useFreedrawCanvas } from 'components/freedraw-canvas/use-freedraw-canvas';

const {
  drawLayerRef,
  stageRef,
  mode,
  strokeWidth,
  modes,
  strokeWidthLimits,
  saveImage,
} = useFreedrawCanvas();

interface IFreedrawCanvasExpose {
  saveImage: () => void;
}

defineExpose<IFreedrawCanvasExpose>({
  saveImage,
});
</script>
