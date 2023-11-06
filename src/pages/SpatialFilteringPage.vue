<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Spatial filtering</div>
      </q-banner>
      <div class="row full-width justify-center">
        <div
          v-if="pipelineImgs && pipelineImgs.length"
          class="row q-gutter-lg justify-center"
        >
          <q-card
            flat
            v-for="schema in pipelineImgs"
            :key="schema.id"
            style="max-width: 450px"
          >
            <q-card-section class="q-pa-md">
              <ImgWithHist :img-schema="schema" />
            </q-card-section>
          </q-card>
        </div>
        <ProgressIndicator v-else class="q-ma-xl" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ImgWithHist from 'components/ImgWithHist.vue';
import { useFetcher } from 'src/hooks/use-fetcher';
import { ImageSchema } from 'src/models/image-service';
import ProgressIndicator from 'components/ProgressIndicator.vue';
import { spatialFilteringService } from 'src/services/spatial-filtering.service';

const getImgParams = {
  name: 'skeleton.jpg',
};

const {
  data: pipelineImgs,
  isLoading: areImgsLoading,
  triggerFetch: startPipeline,
} = useFetcher<Array<ImageSchema>>(
  async () => await spatialFilteringService.skeletonEnhancement(getImgParams)
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
