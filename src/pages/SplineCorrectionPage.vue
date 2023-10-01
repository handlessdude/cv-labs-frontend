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
            class="col data__container row justify-center items-center q-pa-md"
            style="max-width: 100%"
          >
            <ProgressIndicator v-if="isRequestLoading" />
            <NoImagePlaceholder v-else-if="!imgSrc" />
            <ImgWithHist
              v-else
              :img-src="imgSrc"
              img-alt="Sample img"
              :hist="hist"
            />
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
import { imageService } from 'src/services/image.service';
import { ImageHist } from 'src/models/image-service';
import ImgWithHist from 'components/spline-canvas/ImgWithHist.vue';

const isRequestLoading = ref(false);
const statistics: Ref<Array<Iterable & Point>> = ref([]);

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
      const data = await colorCorrectionService.splineCorrection({
        xp,
        fp,
      });
      if (data.img) {
        // img.value = await base64ToImage(res.img, 'Corrected img');
        imgSrc.value = data.img;
        hist.value = data.hist;
      }
    } catch (e) {
      console.log(e);
    } finally {
      isRequestLoading.value = false;
    }
  },
  50
);

const imgSrc = ref('');
onMounted(async () => {
  const data = await imageService.getItem();
  // img.value = await base64ToImage(data.img, 'Sample img');
  imgSrc.value = data.img;
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
