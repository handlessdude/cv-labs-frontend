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
        <div class="row q-col-gutter-md-md">
          <TableCard v-if="imgInSchema">
            <div class="column">
              <ParagraphTitle
                icon="image"
                text="0. Source image"
                class="q-mb-sm"
              />
              <ImgWithHist v-bind:="imgInSchema" />
            </div>
          </TableCard>

          <TableCard v-if="halftoneImgSchema">
            <div class="column">
              <ParagraphTitle
                icon="image"
                text="01. Halftone image"
                class="q-mb-sm"
              />
              <ImgWithHist v-bind:="halftoneImgSchema" />
            </div>
          </TableCard>

          <TableCard v-if="quantitizedImgSchema">
            <div class="column">
              <ParagraphTitle
                icon="image"
                text="02. Quantitized image"
                class="q-mb-sm"
              />
              <ImgWithHist v-bind:="quantitizedImgSchema" />
            </div>
          </TableCard>
        </div>
      </div>

      <div class="overflow-auto full-width">
        <div class="row q-col-gutter-md-md">
          <TableCard v-if="otsuGlobal">
            <div class="column">
              <ParagraphTitle
                icon="image"
                text="03. Otsu global"
                class="q-mb-sm"
              />
              <ImgWithHist v-bind:="otsuGlobal" />
            </div>
          </TableCard>

          <TableCard v-if="otsuGlobal">
            <div class="column">
              <ParagraphTitle
                icon="image"
                text="03. Otsu global"
                class="q-mb-sm"
              />
              <ImgWithHist v-bind:="otsuGlobal" />
            </div>
          </TableCard>

          <TableCard v-if="otsuGlobal">
            <div class="column">
              <ParagraphTitle
                icon="image"
                text="03. Otsu global"
                class="q-mb-sm"
              />
              <ImgWithHist v-bind:="otsuGlobal" />
            </div>
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
import { imageService } from 'src/services/image.service';

const isRequestLoading = ref(false);

const imgInSchema: Ref<Nullable<ImageSchema>> = ref(null);
const halftoneImgSchema: Ref<Nullable<ImageSchema>> = ref(null);
const quantitizedImgSchema: Ref<Nullable<ImageSchema>> = ref(null);
const otsuGlobal: Ref<Nullable<ImageSchema>> = ref(null);
const otsuLocal: Ref<Nullable<ImageSchema>> = ref(null);
const otsuHierarchical: Ref<Nullable<ImageSchema>> = ref(null);

const getImgParams = {
  name: 'gosling1.png',
};

onMounted(async () => {
  try {
    isRequestLoading.value = true;
    imgInSchema.value = await imageService.getItem(getImgParams);
    halftoneImgSchema.value = await quantizationService.getHalftone(
      getImgParams
    );
    quantitizedImgSchema.value = await quantizationService.getQuantitized({
      ...getImgParams,
      levels: [70, 100, 170],
    });
    otsuGlobal.value = await quantizationService.getOtsuGlobal(getImgParams);
    otsuLocal.value = await quantizationService.getOtsuLocal(getImgParams);
    otsuHierarchical.value = await quantizationService.getOtsuHierarchical(
      getImgParams
    );
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
