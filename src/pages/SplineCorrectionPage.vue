<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Spline color correction</div>
      </q-banner>
      <div class="overflow-auto">
        <div class="row workfield__container q-gutter-md">
          <q-card
            flat
            class="q-pa-md spline__container row justify-center items-center"
          >
            <SplineCanvas @update="updateImage" />
            <q-table
              title="Points"
              :rows="statistics"
              :columns="pointsTableColumns"
              row-key="id"
              flat
              class="full-width q-mt-md"
            />
          </q-card>
          <q-card
            flat
            class="col q-pa-md img__container row justify-center items-center"
          >
            <ProgressIndicator v-if="isRequestLoading" />
            <NoImagePlaceholder v-else-if="!img" />
            <ImagesList v-else :img="img" :hist="hist" />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import SplineCanvas from 'components/spline-canvas/SplineCanvas.vue';
import NoImagePlaceholder from 'components/NoImagePlaceholder.vue';
import { debounce } from 'quasar';
import { Iterable, Nullable, Point } from 'src/models/generic';
import ProgressIndicator from 'components/ProgressIndicator.vue';
import { pointsTableColumns } from 'components/spline-canvas/points-table-columns';
import { colorCorrectionService } from 'src/services/color-correction.service';
import ImagesList from 'components/spline-canvas/ImagesList.vue';
import { base64ToImage } from 'components/spline-canvas/utils';
import { imageService } from 'src/services/image.service';
import { ImageHist } from 'src/models/image-service';

const isRequestLoading = ref(false);
const statistics: Ref<Array<Iterable & Point>> = ref([]);

const img: Ref<Nullable<HTMLImageElement>> = ref(null);
const hist: Ref<ImageHist> = ref({
  r: [],
  g: [],
  b: [],
});

const updateImage = debounce(
  async (
    points: Array<Iterable & Point>,
    xp: Array<number>,
    fp: Array<number>
  ) => {
    try {
      isRequestLoading.value = true;
      statistics.value = points;
      const res = await colorCorrectionService.splineCorrection({
        xp,
        fp,
      });
      if (res.img) {
        img.value = await base64ToImage(res.img, 'Corrected img');
        hist.value = res.hist;
      }
    } catch (e) {
      console.log(e);
    } finally {
      isRequestLoading.value = false;
    }
  },
  50
);

onMounted(async () => {
  const data = await imageService.getItem();
  img.value = await base64ToImage(data.img, 'Sample img');
  console.log(img.value);
  hist.value = data.hist;
});
</script>

<style lang="scss">
.q-table__title {
  font-weight: 500;
}

.q-table__top {
  padding-left: 0;
  padding-right: 0;
}
.workfield__container {
  .spline__container {
    width: 400px;
  }
  @media screen and (max-width: $breakpoint-sm) {
    flex-direction: column;
    overflow: hidden;
    .spline__container {
      width: 100%;
    }
  }
}

.q-table__container {
  color: $basic-dark !important;
}
</style>
