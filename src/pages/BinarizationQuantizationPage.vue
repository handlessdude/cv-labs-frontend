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

          <TableCard v-if="quantitizedImgSchema">
            <ParagraphTitle
              icon="image"
              text="02. Quantitized image"
              class="q-mb-sm"
            />
            <ImgWithHist v-bind:="quantitizedImgSchema" />
          </TableCard>

          <TableCard v-if="otsuGlobal">
            <ParagraphTitle
              icon="image"
              text="02. Quantitized image"
              class="q-mb-sm"
            />
            <ImgWithHist v-bind:="otsuGlobal" />
          </TableCard>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { Nullable } from 'src/models/generic';
import { ImageSchema } from 'src/models/image-service';
import ParagraphTitle from 'components/ParagraphTitle.vue';
import { quantizationService } from 'src/services/quantization.service';
import ImgWithHist from 'components/ImgWithHist.vue';
import ProgressIndicator from 'components/ProgressIndicator.vue';
import TableCard from 'components/TableCard.vue';

const isRequestLoading = ref(false);

const imgInSchema: Ref<Nullable<ImageSchema>> = ref(null);
const halftoneImgSchema: Ref<Nullable<ImageSchema>> = ref(null);
const quantitizedImgSchema: Ref<Nullable<ImageSchema>> = ref(null);
const otsuGlobal: Ref<Nullable<ImageSchema>> = ref(null);

onMounted(async () => {
  try {
    isRequestLoading.value = true;
    const { img_in, img_out: halftone } =
      await quantizationService.getHalftone();
    imgInSchema.value = img_in;
    halftoneImgSchema.value = halftone;

    const { img_out: quantitized } = await quantizationService.getQuantitized({
      levels: [70, 100, 170],
    });
    quantitizedImgSchema.value = quantitized;

    const { img_out: otsuGlobaled } = await quantizationService.getOtsuGlobal();
    otsuGlobal.value = otsuGlobaled;

    halftoneImgSchema.value = halftone;
  } catch (e) {
    console.log(e);
  } finally {
    isRequestLoading.value = false;
  }
});
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
