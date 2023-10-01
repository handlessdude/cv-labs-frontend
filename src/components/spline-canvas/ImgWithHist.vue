<template>
  <div class="column" style="max-width: 100%">
    <img ref="imgRef" :src="imgSrc" :alt="imgAlt" />
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

interface ImagesListProps {
  imgSrc: string;
  imgAlt: string;
  hist: ImageHist;
}

const props = defineProps<ImagesListProps>();
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
  height: auto;
  max-width: 100%;
  object-fit: contain;
}
</style>
