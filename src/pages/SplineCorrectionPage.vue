<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Spline color correction</div>
      </q-banner>
      <div class="overflow-auto">
        <div class="row workfield__container q-gutter-md">
          <q-card flat class="q-pa-md spline__container column">
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
            <div v-if="imgSchemes.length" :class="imgListClasses">
              <ImgWithHist
                v-for="imgSchema in imgSchemes"
                :key="imgSchema.id"
                v-bind:="imgSchema"
                class="col"
              />
            </div>
            <NoImagePlaceholder v-else />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import SplineCanvas from 'components/spline-canvas/SplineCanvas.vue';
import NoImagePlaceholder from 'components/NoImagePlaceholder.vue';
import { Iterable, Point } from 'src/models/generic';
import { pointsTableColumns } from 'components/spline-canvas/points-table-columns';
import { colorCorrectionService } from 'src/services/color-correction.service';
import { ImageSchema } from 'src/models/image-service';
import ImgWithHist from 'components/ImgWithHist.vue';

const isRequestLoading = ref(false);
const statistics: Ref<Array<Iterable & Point>> = ref([]);

const imgSchemes: Ref<Array<ImageSchema>> = ref([]);

const updateImage = async (
  points: Array<Iterable & Point>,
  xp: Array<number>,
  fp: Array<number>
) => {
  try {
    isRequestLoading.value = true;
    statistics.value = points;
    const { img_in, img_out } = await colorCorrectionService.splineCorrection({
      xp,
      fp,
    });
    imgSchemes.value = [
      {
        img_alt: 'Image in',
        ...img_in,
      },
      {
        img_alt: 'Image out',
        ...img_out,
      },
    ];
  } catch (e) {
    console.log(e);
  } finally {
    isRequestLoading.value = false;
  }
};

const imgListClasses = computed(() => [
  'row items-start full-height q-gutter-x-md',
  /*  {
    'half-opacity': imgSchemes.value.length && isRequestLoading.value,
  },*/
]);
</script>

<style lang="scss">
.half-opacity {
  opacity: 0.5;
}

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
