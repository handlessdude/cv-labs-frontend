<template>
  <div class="controls__container">
    <div class="row no-wrap items-stretch q-gutter-x-md q-mb-md">
      <q-select
        style="min-width: 95px"
        v-model="toolMode"
        outlined
        dense
        :options="toolModes"
      />
      <q-select
        style="min-width: 218px"
        v-model="markingMode"
        outlined
        dense
        :options="markingModes"
      >
        <template v-slot:selected-item="scope">
          <ColorItem v-bind="scope.opt" />
        </template>
        <template v-slot:option="scope">
          <ColorItem v-bind="{ ...scope.itemProps, ...scope.opt }" />
        </template>
      </q-select>
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
import { MaybeUndefined, Nullable } from 'src/models/generic';
import { computed, reactive, watch } from 'vue';
import FlatBtn from 'components/FlatBtn.vue';
import ColorItem from 'src/features/growcut/components/ColorItem.vue';

interface IFreedrawCanvasProps {
  image: Nullable<HTMLImageElement>;
}

interface IFreedrawCanvasExpose {
  getImgDataUrl: () => MaybeUndefined<string>;
  getDrawDataUrl: () => MaybeUndefined<string>;
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
  toolMode,
  toolModes,
  markingModes,
  markingMode,
  strokeWidth,
  strokeWidthLimits,
  getImgDataUrl,
  getDrawDataUrl,
} = useFreedrawCanvas();

const downloadResource = (uri: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadImage = () => {
  if (!stageRef.value) return;
  const uri = getImgDataUrl();
  if (!uri) return;
  const name = 'stage.png';
  downloadResource(uri, name);
};

const downloadMarkings = () => {
  if (!drawLayerRef.value) return;
  const uri = getDrawDataUrl();
  if (!uri) return;
  const name = 'markings.png';
  downloadResource(uri, name);
};

defineExpose<IFreedrawCanvasExpose>({
  getImgDataUrl,
  getDrawDataUrl,
});
</script>
