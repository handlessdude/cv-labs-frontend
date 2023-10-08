<template>
  <div class="text-body1 row items-center" style="width: fit-content">
    <q-icon v-if="icon" :name="icon" class="q-mr-md" />
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface ParagraphTitleProps {
  icon?: string;
  text: string;
}

defineProps<ParagraphTitleProps>();
</script>

<style scoped lang="scss"></style>
