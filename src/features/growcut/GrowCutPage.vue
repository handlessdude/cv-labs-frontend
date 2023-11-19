<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Growcut</div>
      </q-banner>
      <q-banner rounded class="q-pa-md">
        <div class="controls__container">
          <q-file
            v-model="imageFile"
            outlined
            dense
            label="Select an image..."
          />
        </div>
      </q-banner>
      <TableCard>
        <ParagraphTitle icon="edit" text="Foreground marking" class="q-mb-sm" />
        <FreedrawCanvas ref="fgCanvas" :image="imageElement" />
      </TableCard>
      <TableCard>
        <ParagraphTitle icon="edit" text="Background marking" class="q-mb-sm" />
        <FreedrawCanvas ref="bgCanvas" :image="imageElement" />
      </TableCard>
      <!--      <div class="overflow-auto full-width">-->
      <!--        <div class="row q-col-gutter-x-md q-col-gutter-y-md">-->
      <!--        </div>-->
      <!--      </div>-->
      <q-banner rounded class="q-pa-md">
        <q-btn
          @click="onClickProcess"
          label="Process image"
          class="bg-green text-white"
          no-caps
        />
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FreedrawCanvas from 'components/freedraw-canvas/FreedrawCanvas.vue';
import ParagraphTitle from 'components/ParagraphTitle.vue';
import TableCard from 'components/TableCard.vue';
import { ref } from 'vue';
import { Nullable } from 'src/models/generic';
import { useImageReader } from 'src/hooks/use-image-reader';

const bgCanvas = ref<Nullable<typeof FreedrawCanvas>>(null);
const fgCanvas = ref<Nullable<typeof FreedrawCanvas>>(null);

const { imageFile, imageElement } = useImageReader();

const onClickProcess = () => {
  if (!bgCanvas.value || !fgCanvas.value) return;
  console.log(fgCanvas.value.saveImage());
  console.log(bgCanvas.value.saveImage());
};
</script>

<style lang="scss" scoped>
:deep(.controls__container) {
  max-width: 600px;
}
</style>
