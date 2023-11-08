<template>
  <q-banner rounded class="q-pa-md">
    <div class="text-body1">{{ title }}</div>
  </q-banner>
  <div v-if="schema && !isLoading" class="overflow-auto full-width">
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <TableCard>
        <ParagraphTitle icon="image" text="Smoothing filter" class="q-mb-sm" />
        <ImgWithHist :img-schema="schema.smoothing_schema.filt" />
      </TableCard>

      <TableCard>
        <ParagraphTitle
          icon="image"
          text="Smoothing result (spectrum)"
          class="q-mb-sm"
        />
        <ImgWithHist :img-schema="schema.smoothing_schema.spectrum" />
      </TableCard>

      <TableCard>
        <ParagraphTitle
          icon="image"
          text="Smoothing result (image)"
          class="q-mb-sm"
        />
        <ImgWithHist :img-schema="schema.smoothing_schema.img_out" />
      </TableCard>
    </div>
  </div>
  <div v-if="schema && !isLoading" class="overflow-auto full-width">
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <TableCard>
        <ParagraphTitle icon="image" text="Sharpening filter" class="q-mb-sm" />
        <ImgWithHist :img-schema="schema.sharpening_schema.filt" />
      </TableCard>

      <TableCard>
        <ParagraphTitle
          icon="image"
          text="Sharpening result (spectrum)"
          class="q-mb-sm"
        />
        <ImgWithHist :img-schema="schema.sharpening_schema.spectrum" />
      </TableCard>

      <TableCard>
        <ParagraphTitle
          icon="image"
          text="Sharpening result (image)"
          class="q-mb-sm"
        />
        <ImgWithHist :img-schema="schema.sharpening_schema.img_out" />
      </TableCard>
    </div>
  </div>
  <div v-else class="row justify-center">
    <ProgressIndicator />
  </div>
</template>

<script setup lang="ts">
import { FilteringPipelineSchema } from 'src/services/frequency-filtering.service';
import ImgWithHist from 'components/ImgWithHist.vue';
import ParagraphTitle from 'components/ParagraphTitle.vue';
import TableCard from 'components/TableCard.vue';
import ProgressIndicator from 'components/ProgressIndicator.vue';
import { Nullable } from 'src/models/generic';

interface FilteringPipelineProps {
  schema: Nullable<FilteringPipelineSchema>;
  title: string;
  isLoading?: boolean;
}
defineProps<FilteringPipelineProps>();
</script>

<style scoped lang="scss"></style>
