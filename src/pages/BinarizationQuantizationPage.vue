<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Binarization and quantization</div>
      </q-banner>
      <q-card flat class="workarea column q-pa-md">
        <div class="row justify-center">
          <ParagraphTitle
            icon="image"
            text="Select an image to start processing."
            class=""
          />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { Iterable, Point } from 'src/models/generic';
import { colorCorrectionService } from 'src/services/color-correction.service';
import { ImageSchema } from 'src/models/image-service';
import ParagraphTitle from 'components/ParagraphTitle.vue';

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
</script>

<style scoped lang="scss">
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

.q-table__container {
  color: $basic-dark !important;
}
</style>
