<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Binarization and quantization</div>
      </q-banner>
      <div class="overflow-auto full-width">
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="0. Source image"
              class="q-mb-sm"
            />
            <ImgWithHist :img-schema="imgInSchema" :loading="isImgInLoading" />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="01. Halftone image"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="halftoneImgSchema"
              :loading="isHalftoneLoading"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="02. Quantitized image"
              class="q-mb-sm"
            />
            <q-input
              v-model.trim="quantizationLevels"
              placeholder="Quantization levels..."
              outlined
              class="q-mb-md"
              dense
            />
            <ImgWithHist
              :img-schema="quantitizedImgSchema"
              :loading="isQuantitizedLoading"
            />
          </TableCard>
        </div>
      </div>
      <div class="overflow-auto full-width">
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="03. Otsu global binarization"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="otsuGlobal"
              :loading="isOtsuGlobalLoading"
            />
          </TableCard>
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="04. Otsu local binarization"
              class="q-mb-sm"
            />
            <q-input
              v-model.trim="otsuLocalHeightDelims"
              placeholder="Height delimeters..."
              outlined
              class="q-mb-md"
              dense
            />
            <ImgWithHist
              :img-schema="otsuLocal"
              :loading="isOtsuLocalLoading"
            />
          </TableCard>
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="05. Otsu hierarchical binarization"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="otsuHierarchical"
              :loading="isOtsuHierarchicalLoading"
            />
          </TableCard>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ParagraphTitle from 'components/ParagraphTitle.vue';
import { quantizationService } from 'src/services/quantization.service';
import ImgWithHist from 'components/ImgWithHist.vue';
import TableCard from 'components/TableCard.vue';
import { imageService } from 'src/services/image.service';
import { useFetcher } from 'src/hooks/use-fetcher';
import { ImageSchema } from 'src/models/image-service';
import { debounce } from 'quasar';
import {
  DEFAULT_LEVELS,
  FETCH_DEBOUNCE_MS,
  OTSU_LOCAL,
} from 'src/resources/quantization';

const getImgParams = {
  name: 'gosling1.png',
  // name: 'normalization.png',
};

const {
  data: imgInSchema,
  isLoading: isImgInLoading,
  triggerFetch: fetchImgIn,
} = useFetcher<ImageSchema>(
  async () => await imageService.getItem(getImgParams)
);

const {
  data: halftoneImgSchema,
  isLoading: isHalftoneLoading,
  triggerFetch: fetchHalftone,
} = useFetcher<ImageSchema>(
  async () => await quantizationService.getHalftone(getImgParams)
);

const quantizationLevels = ref(DEFAULT_LEVELS);
const {
  data: quantitizedImgSchema,
  isLoading: isQuantitizedLoading,
  triggerFetch: fetchQuantitized,
} = useFetcher<ImageSchema>(
  async () =>
    await quantizationService.getQuantitized({
      ...getImgParams,
      levels: quantizationLevels.value,
    })
);

watch(
  quantizationLevels,
  debounce((newVal) => {
    console.log(`fetching quantization for ${newVal}`);
    fetchQuantitized();
  }, FETCH_DEBOUNCE_MS)
);

const {
  data: otsuGlobal,
  isLoading: isOtsuGlobalLoading,
  triggerFetch: fetchOtsuGlobal,
} = useFetcher<ImageSchema>(
  async () => await quantizationService.getOtsuGlobal(getImgParams)
);

const otsuLocalHeightDelims = ref(OTSU_LOCAL.height_delims);
const {
  data: otsuLocal,
  isLoading: isOtsuLocalLoading,
  triggerFetch: fetchOtsuLocal,
} = useFetcher<ImageSchema>(
  async () =>
    await quantizationService.getOtsuLocal({
      ...getImgParams,
      height_delims: otsuLocalHeightDelims.value,
    })
);
watch(
  otsuLocalHeightDelims,
  debounce((newVal) => {
    console.log(`fetching otsu local for ${newVal}`);
    fetchOtsuLocal();
  }, FETCH_DEBOUNCE_MS)
);

const {
  data: otsuHierarchical,
  isLoading: isOtsuHierarchicalLoading,
  triggerFetch: fetchOtsuHierarchical,
} = useFetcher<ImageSchema>(
  async () => await quantizationService.getOtsuHierarchical(getImgParams)
);

onMounted(() => {
  try {
    fetchImgIn();
    fetchHalftone();
    fetchQuantitized();
    fetchOtsuGlobal();
    fetchOtsuLocal();
    fetchOtsuHierarchical();
  } catch (e) {
    console.log(e);
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
