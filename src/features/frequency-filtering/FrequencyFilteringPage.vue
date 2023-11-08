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

      <FilteringPipeline
        title="1. Ideal filter"
        :schema="idealFilterPipeline"
        :is-loading="isIdealPipelineLoading"
      />
      <FilteringPipeline
        title="2. Butterworth filter"
        :schema="butterworthFilterPipeline"
        :is-loading="isButterworthPipelineLoading"
      />
      <FilteringPipeline
        title="3. Gaussian filter"
        :schema="gaussianFilterPipeline"
        :is-loading="isGaussianPipelineLoading"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
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
import FilteringPipeline from 'src/features/frequency-filtering/components/FilteringPipeline.vue';

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
