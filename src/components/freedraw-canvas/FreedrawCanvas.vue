<template>
  <div class="controls__container">
    <div class="row no-wrap q-gutter-x-md q-mb-md">
      <q-select v-model="mode" outlined dense :options="modes" />
      <FlatBtn label="Save markings" icon="save" @click="downloadMarkings" />
      <FlatBtn label="Save image" icon="save" @click="downloadImage" />
    </div>
    <q-slider
      v-model="strokeWidth"
      :min="strokeWidthLimits.min"
      :max="strokeWidthLimits.max"
      class="q-mb-md"
    />
  </div>
  <v-stage ref="stageRef" :config="configStageFinal">
    <v-layer ref="bgLayerRef">
      <v-image :config="bgImageConfig" />
    </v-layer>
    <v-layer ref="drawLayerRef" />
  </v-stage>
</template>

<script setup lang="ts">
import { configStage } from 'components/spline-canvas/resources';
import { useFreedrawCanvas } from 'components/freedraw-canvas/use-freedraw-canvas';
import { Nullable } from 'src/models/generic';
import { computed, reactive, watch } from 'vue';
import Konva from 'konva';
import FlatBtn from 'components/FlatBtn.vue';

interface IFreedrawCanvasProps {
  image: Nullable<HTMLImageElement>;
}

interface IFreedrawCanvasExpose {
  saveImage: () => void;
}

const props = defineProps<IFreedrawCanvasProps>();

const bgImageConfig = computed(() => ({
  image: props.image,
}));

const MAX_SIZE = {
  width: 1200,
  height: 600,
};
const configStageFinal = reactive({
  ...configStage,
  ...MAX_SIZE,
});

const resizeStage = (newVal: Nullable<HTMLImageElement>) => {
  if (!newVal) return;
  let width = newVal.width;
  let height = newVal.height;
  if (width > height) {
    if (width > MAX_SIZE.width) {
      height = height * (MAX_SIZE.width / width);
      width = MAX_SIZE.width;
    }
  }
  configStageFinal.width = width;
  configStageFinal.height = height;
};

watch(() => props.image, resizeStage, {
  immediate: true,
});

const {
  drawLayerRef,
  stageRef,
  mode,
  strokeWidth,
  modes,
  strokeWidthLimits,
  saveImage,
} = useFreedrawCanvas();

const downloadResource = (uri: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const resourceSaveConfig = { pixelRatio: 1 };
const downloadImage = () => {
  if (!stageRef.value) return;
  const stage: Konva.Stage = stageRef.value.getNode();
  const uri = stage.toDataURL(resourceSaveConfig);
  const name = 'stage.png';
  downloadResource(uri, name);
};

const downloadMarkings = () => {
  if (!drawLayerRef.value) return;
  const stage: Konva.Stage = drawLayerRef.value.getNode();
  const uri = stage.toDataURL(resourceSaveConfig);
  const name = 'markings.png';
  downloadResource(uri, name);
};

defineExpose<IFreedrawCanvasExpose>({
  saveImage,
});
</script>
