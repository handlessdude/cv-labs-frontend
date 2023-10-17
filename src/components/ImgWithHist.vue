<template>
  <div
    v-if="loading || !imgSchema"
    class="row flex-center overflow-hidden sosi"
  >
    <ProgressIndicator />
  </div>
  <div v-else class="column q-gutter-y-md" style="max-width: 100%">
    <div v-if="imgSchema?.img_alt" class="text-h6">
      {{ imgSchema?.img_alt }}
    </div>
    <div v-if="showResolution" class="row items-center text-caption">
      <div class="q-mr-xs">Image resolution:</div>
      <div>{{ imgRef?.naturalWidth }} x {{ imgRef?.naturalHeight }}</div>
    </div>
    <img ref="imgRef" :src="imgSchema?.img_src" :alt="imgSchema?.img_alt" />
    <Bar v-if="showHist" :data="barData" :options="barOptions" />
  </div>
</template>

<script setup lang="ts">
import { ImageHist, ImageSchema } from 'src/models/image-service';
import { computed, Ref, ref } from 'vue';
import { Nullable } from 'src/models/generic';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import ProgressIndicator from 'components/ProgressIndicator.vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ImageSchemaProps {
  imgSchema: Nullable<ImageSchema>;
  loading?: boolean;
  showResolution?: boolean;
  showHist?: boolean;
}

const props = withDefaults(defineProps<ImageSchemaProps>(), {
  showHist: true,
});

const showHist = computed(() => props.showHist && props.imgSchema?.hist);

const imgRef: Ref<Nullable<HTMLImageElement>> = ref(null);

const rgbPalette = {
  r: '#FF0000',
  g: '#00FF00',
  b: '#0000FF',
};

const histToBarChart = (hist: ImageHist) => {
  const labels = [...Array(256).keys()];
  return {
    labels,
    datasets: Object.entries(hist).map(([channel, data]) => ({
      label: channel.toUpperCase(),
      backgroundColor: rgbPalette[channel as keyof typeof rgbPalette],
      data,
    })),
  };
};

const barData = computed(
  () => (props.imgSchema && histToBarChart(props.imgSchema?.hist)) || null
);
const barOptions = { responsive: true };
</script>

<style scoped lang="scss">
img {
  border-radius: 4px;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}

.sosi {
  flex-grow: 1;
}
</style>
