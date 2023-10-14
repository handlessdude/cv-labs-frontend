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
    <img ref="imgRef" :src="imgSchema?.img_src" :alt="imgSchema?.img_alt" />
    <Bar :data="barData" :options="barOptions" />
  </div>
</template>

<script setup lang="ts">
import { ImageHist, ImageSchema } from 'src/models/image-service';
import { computed, Ref, ref, watch } from 'vue';
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
}

const props = defineProps<ImageSchemaProps>();
const imgRef: Ref<Nullable<HTMLImageElement>> = ref(null);

watch(
  () => props.loading,
  (newVal) => {
    console.log(newVal);
  },
  { immediate: true }
);

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
