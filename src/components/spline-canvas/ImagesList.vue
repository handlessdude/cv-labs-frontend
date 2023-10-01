<template>
  <v-image ref="imgRef" :config="correctedImgConfig" />
</template>

<script setup lang="ts">
import { ImageHist } from 'src/models/image-service';
import { computed, ref, Ref } from 'vue';
import { Nullable } from 'src/models/generic';
import Konva from 'konva';

interface ImagesListProps {
  img: HTMLImageElement;
  hist: ImageHist;
}

const imgRef: Ref<Nullable<Konva.Image>> = ref(null);
const props = defineProps<ImagesListProps>();

const correctedImgConfig = computed(() => ({
  image: props.img,
}));
</script>

<style scoped lang="scss"></style>
