<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Frequency filtering</div>
      </q-banner>
      <div class="overflow-auto full-width">
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="0.0 Source image"
              class="q-mb-sm"
            />
            <ImgWithHist :loading="isSrcImgLoading" :img-schema="srcImg" />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="0.1 Source image spectrum"
              class="q-mb-sm"
            />
            <ImgWithHist
              :loading="isSrcImgSpecLoading"
              :img-schema="srcImgSpec"
            />
          </TableCard>
        </div>
      </div>
      <q-banner rounded class="q-pa-md" v-if="isPipelineReady">
        <div class="text-body1">1. Ideal filter</div>
      </q-banner>
      <div
        v-if="idealFilterPipeline && !isIdealPipelineLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="1.0.0. Smoothing filter"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="idealFilterPipeline.smoothing_schema.filt"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="1.0.1. Smoothing result (spectrum)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="idealFilterPipeline.smoothing_schema.spectrum"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="1.0.2. Smoothing result (image)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="idealFilterPipeline.smoothing_schema.img_out"
            />
          </TableCard>
        </div>
      </div>
      <div
        v-if="idealFilterPipeline && !isIdealPipelineLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="1.1.0. Sharpening filter"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="idealFilterPipeline.sharpening_schema.filt"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="1.1.1. Sharpening result (spectrum)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="idealFilterPipeline.sharpening_schema.spectrum"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="1.1.2. Sharpening result (image)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="idealFilterPipeline.sharpening_schema.img_out"
            />
          </TableCard>
        </div>
      </div>

      <q-banner rounded class="q-pa-md">
        <div class="text-body1">1. Butterworth filter</div>
      </q-banner>
      <div
        v-if="butterworthFilterPipeline && !isButterworthPipelineLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.0.0. Smoothing filter"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="butterworthFilterPipeline.smoothing_schema.filt"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.0.1. Smoothing result (spectrum)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="butterworthFilterPipeline.smoothing_schema.spectrum"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.0.2. Smoothing result (image)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="butterworthFilterPipeline.smoothing_schema.img_out"
            />
          </TableCard>
        </div>
      </div>
      <div
        v-if="butterworthFilterPipeline && !isButterworthPipelineLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.1.0. Sharpening filter"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="butterworthFilterPipeline.sharpening_schema.filt"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.1.1. Sharpening result (spectrum)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="butterworthFilterPipeline.sharpening_schema.spectrum"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.1.2. Sharpening result (image)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="butterworthFilterPipeline.sharpening_schema.img_out"
            />
          </TableCard>
        </div>
      </div>

      <q-banner rounded class="q-pa-md">
        <div class="text-body1">2. Gaussian filter</div>
      </q-banner>
      <div
        v-if="gaussianFilterPipeline && !isGaussianPipelineLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="3.0.0. Smoothing filter"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="gaussianFilterPipeline.smoothing_schema.filt"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="3.0.1. Smoothing result (spectrum)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="gaussianFilterPipeline.smoothing_schema.spectrum"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="3.0.2. Smoothing result (image)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="gaussianFilterPipeline.smoothing_schema.img_out"
            />
          </TableCard>
        </div>
      </div>
      <div
        v-if="gaussianFilterPipeline && !isGaussianPipelineLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="3.1.0. Sharpening filter"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="gaussianFilterPipeline.sharpening_schema.filt"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="3.1.1. Sharpening result (spectrum)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="gaussianFilterPipeline.sharpening_schema.spectrum"
            />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="3.1.2. Sharpening result (image)"
              class="q-mb-sm"
            />
            <ImgWithHist
              :img-schema="gaussianFilterPipeline.sharpening_schema.img_out"
            />
          </TableCard>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ImgWithHist from 'components/ImgWithHist.vue';
import { useFetcher } from 'src/hooks/use-fetcher';
import ParagraphTitle from 'components/ParagraphTitle.vue';
import TableCard from 'components/TableCard.vue';
import {
  frequencyFilteringService,
  FilteringPipelineSchema,
} from 'src/services/frequency-filtering.service';
import { imageService } from 'src/services/image.service';
import { ImageSchema } from 'src/models/image-service';

const getImgParams = {
  name: 'letters.png',
};

const {
  data: srcImg,
  isLoading: isSrcImgLoading,
  triggerFetch: loadSrcImg,
} = useFetcher<ImageSchema>(
  async () => await imageService.getItem(getImgParams)
);

const {
  data: srcImgSpec,
  isLoading: isSrcImgSpecLoading,
  triggerFetch: loadSrcImgSpec,
} = useFetcher<ImageSchema>(
  async () => await frequencyFilteringService.getImageSpectrum(getImgParams)
);

const {
  data: idealFilterPipeline,
  isLoading: isIdealPipelineLoading,
  triggerFetch: loadIdealPipeline,
} = useFetcher<FilteringPipelineSchema>(
  async () => await frequencyFilteringService.applyIdealFilter(getImgParams)
);

const {
  data: butterworthFilterPipeline,
  isLoading: isButterworthPipelineLoading,
  triggerFetch: loadButterworthPipeline,
} = useFetcher<FilteringPipelineSchema>(
  async () =>
    await frequencyFilteringService.applyButterworthFilter(getImgParams)
);

const {
  data: gaussianFilterPipeline,
  isLoading: isGaussianPipelineLoading,
  triggerFetch: loadGaussianPipeline,
} = useFetcher<FilteringPipelineSchema>(
  async () => await frequencyFilteringService.applyGaussianFilter(getImgParams)
);

onMounted(() => {
  try {
    loadSrcImg();
    loadSrcImgSpec();
    loadIdealPipeline();
    loadButterworthPipeline();
    loadGaussianPipeline();
  } catch (e) {
    console.log(e);
  }
});

const isPipelineReady = computed(
  () =>
    idealFilterPipeline.value &&
    !isSrcImgLoading.value &&
    !isSrcImgSpecLoading.value &&
    !isIdealPipelineLoading.value
);
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
