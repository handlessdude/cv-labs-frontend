<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Frequency filtering</div>
      </q-banner>
      <div
        v-if="pipelineImgs && !areImgsLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="0. Source image"
              class="q-mb-sm"
            />
            <ImgWithHist :img-schema="pipelineImgs.source" />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="01. Image spectrum"
              class="q-mb-sm"
            />
            <ImgWithHist :img-schema="pipelineImgs.spectrum" />
          </TableCard>
        </div>
      </div>
      <ProgressIndicator v-else class="q-ma-xl" />
      <div
        v-if="pipelineImgs && !areImgsLoading"
        class="overflow-auto full-width"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.0. Smoothing filter"
              class="q-mb-sm"
            />
            <ImgWithHist :img-schema="pipelineImgs.smoothing_schema.filt" />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.1. Result of smoothing (spectrum form)"
              class="q-mb-sm"
            />
            <ImgWithHist :img-schema="pipelineImgs.smoothing_schema.spectrum" />
          </TableCard>

          <TableCard>
            <ParagraphTitle
              icon="image"
              text="2.2. Result of smoothing (image form)"
              class="q-mb-sm"
            />
            <ImgWithHist :img-schema="pipelineImgs.smoothing_schema.img_out" />
          </TableCard>
        </div>
      </div>
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
  TestSchema,
} from 'src/services/frequency-filtering.service';
import ProgressIndicator from 'components/ProgressIndicator.vue';

const getImgParams = {
  name: 'letters.png',
};

const {
  data: pipelineImgs,
  isLoading: areImgsLoading,
  triggerFetch: startPipeline,
} = useFetcher<TestSchema>(
  async () =>
    await frequencyFilteringService.smootheningSharpening(getImgParams)
);

onMounted(() => {
  try {
    startPipeline();
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
