<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Binarization and quantization</div>
      </q-banner>
      <q-card
        v-if="isRequestLoading"
        flat
        class="workarea column q-pa-md bg-transparent"
      >
        <div class="row justify-center">
          <ProgressIndicator />
        </div>
      </q-card>

      <div class="overflow-auto full-width">
        <div class="row q-gutter-lg">
          <TableCard v-if="imgInSchema">
            <ParagraphTitle
              icon="image"
              text="0. Source image"
              class="q-mb-sm"
            />
            <ImgWithHist v-bind:="imgInSchema" />
          </TableCard>
          <TableCard v-if="halftoneImgSchema">
            <ParagraphTitle
              icon="image"
              text="01. Halftone image"
              class="q-mb-sm"
            />
            <ImgWithHist v-bind:="halftoneImgSchema" />
          </TableCard>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { Iterable, Nullable, Point } from 'src/models/generic';
import { colorCorrectionService } from 'src/services/color-correction.service';
import { ImageSchema } from 'src/models/image-service';
import ParagraphTitle from 'components/ParagraphTitle.vue';
import { quantizationService } from 'src/services/quantization.service';
import ImgWithHist from 'components/ImgWithHist.vue';
import ProgressIndicator from 'components/ProgressIndicator.vue';
import TableCard from 'components/TableCard.vue';

const isRequestLoading = ref(false);

const imgInSchema: Ref<Nullable<ImageSchema>> = ref(null);
const halftoneImgSchema: Ref<Nullable<ImageSchema>> = ref(null);
onMounted(async () => {
  try {
    isRequestLoading.value = true;
    const { img_in, img_out } = await quantizationService.getHalftone();
    imgInSchema.value = img_in;
    halftoneImgSchema.value = img_out;
  } catch (e) {
    console.log(e);
  } finally {
    isRequestLoading.value = false;
  }
});
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
