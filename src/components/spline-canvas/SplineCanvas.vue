<template>
  <v-stage ref="stageRef" :config="configStage">
    <v-layer ref="axisLayerRef" :config="{}"></v-layer>
    <v-layer ref="splineLayerRef" :config="{}"></v-layer>
  </v-stage>
</template>

<script setup lang="ts">
import Konva from 'konva';
import { Iterable, Nullable, Point } from 'src/models/generic';
import { ref, Ref, watch } from 'vue';
import { drawAxis } from 'components/spline-canvas/draw-axis';
import {
  configStage,
  invertY,
  palette,
} from 'components/spline-canvas/resources';
import { stageSetup } from 'components/spline-canvas/stage-setup';
import Spline from 'components/spline-canvas/draw-spline';

const emit = defineEmits<{
  (
    e: 'update',
    points: Array<Iterable & Point>,
    xp: Array<number>, // xp, fp - points sorted by x value
    fp: Array<number>
  ): void;
}>();

const stageRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const axisLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
const splineLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

let spline = new Konva.Line({
  id: 'spline',
  points: [],
  stroke: palette.lineStroke,
  strokeWidth: 2,
});

let interpolator: Nullable<Ref<Nullable<Spline>>> = null;
let controlPoints: Nullable<Ref<Array<Konva.Circle>>> = null;
const processInterpolator = (interpolator: Nullable<Spline>) => {
  if (!interpolator) {
    return;
  }
  emit(
    'update',
    controlPoints?.value?.map((point, id) => ({
      id,
      x: point.x(),
      y: invertY(point.y()),
    })) || [],
    interpolator.getXp(),
    interpolator.getFp().map((y) => invertY(y))
  );
};

watch(splineLayerRef, (newLayer) => {
  if (!newLayer || !stageRef.value) {
    return;
  }
  drawAxis(newLayer.getNode(), stageRef.value?.getNode());
  newLayer.getNode().add(spline);
  ({ interpolator, controlPoints } = stageSetup(
    stageRef.value.getNode(),
    newLayer.getNode(),
    spline
  ));
  watch(interpolator, processInterpolator, {
    immediate: true,
  });
  stageRef.value.getNode().container().style.backgroundColor =
    palette.background;
});
</script>

<style scoped lang="scss"></style>
