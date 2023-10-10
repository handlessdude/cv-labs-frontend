<template>
  <div class="column q-gutter-y-md" style="max-width: 100%">
    <div v-if="img_alt" class="text-h6">{{ img_alt }}</div>
    <img ref="imgRef" :src="img_src" :alt="img_alt" />
    <Bar :data="barData" :options="barOptions" />
  </div>
</template>

<script setup lang="ts">
import { ImageHist } from 'src/models/image-service';
import { Ref, ref } from 'vue';
import { Nullable } from 'src/models/generic';
import { ChartData } from 'src/models/chart';
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
  id: string;
  img_src: string;
  hist: ImageHist;
  img_alt?: string;
}

const props = defineProps<ImageSchemaProps>();
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

const barData: Ref<ChartData> = ref(histToBarChart(props.hist));
const barOptions = { responsive: true };
</script>

<style scoped lang="scss">
img {
  border-radius: 4px;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}
</style>
