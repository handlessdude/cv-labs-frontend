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
        <div class="column no-wrap">
          <ParagraphTitle icon="edit" text="Markings" class="q-mb-sm" />
          <FreedrawCanvas ref="markingsCanvas" :image="imageElement" />
        </div>
      </TableCard>
      <q-banner rounded class="q-pa-md">
        <q-btn
          @click="onClickProcess"
          :disable="!imageFile"
          label="Process image"
          class="bg-green text-white"
          no-caps
        />
      </q-banner>
      <ImgWithHist v-if="imgOut" :img-schema="imgOut" :loading="isImgLoading" />
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
import { growcutService } from 'src/services/growcut.service';
import ImgWithHist from 'components/ImgWithHist.vue';
import { ImageSchema } from 'src/models/image-service';
import { useQuasar } from 'quasar';

const markingsCanvas = ref<Nullable<typeof FreedrawCanvas>>(null);

const { imageFile, imageElement } = useImageReader();
const $q = useQuasar();

const isImgLoading = ref(false);
const imgOut = ref<Nullable<ImageSchema>>(null);

const onClickProcess = async () => {
  if (!markingsCanvas.value || !imageElement.value) return;
  const markings = markingsCanvas.value.getDrawDataUrl();
  try {
    isImgLoading.value = true;
    imgOut.value = await growcutService.cutObject({
      src_img: imageElement.value.src,
      markings,
    });
  } catch (e) {
    console.log(e);
    $q.notify({
      type: 'negative',
      message: 'Error processing image',
    });
  } finally {
    isImgLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
:deep(.controls__container) {
  max-width: 600px;
}
</style>
