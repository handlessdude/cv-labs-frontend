<script setup lang="ts">
interface ColorItemProps {
  id: string;
  colorName: string;
  color: string;
}
const props = defineProps<ColorItemProps>();
console.log(props);
</script>

<template>
  <q-item dense>
    <q-item-section avatar>
      <q-avatar square size="sm" :color="colorName" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ id }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.q-item--dense {
  min-height: 28px !important;
}
</style>
