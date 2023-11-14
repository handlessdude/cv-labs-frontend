<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Growcut</div>
      </q-banner>
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Here goes image picker</div>
      </q-banner>
      <div class="overflow-auto full-width">
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <TableCard>
            <ParagraphTitle
              icon="edit"
              text="Foreground marking"
              class="q-mb-sm"
            />
            <FreedrawCanvas />
          </TableCard>
          <TableCard>
            <ParagraphTitle
              icon="edit"
              text="Background marking"
              class="q-mb-sm"
            />
            <FreedrawCanvas />
          </TableCard>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FreedrawCanvas from 'components/freedraw-canvas/FreedrawCanvas.vue';
import ParagraphTitle from 'components/ParagraphTitle.vue';
import TableCard from 'components/TableCard.vue';
import ImgWithHist from 'components/ImgWithHist.vue';
</script>
