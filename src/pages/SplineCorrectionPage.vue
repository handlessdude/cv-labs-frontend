<template>
  <q-page padding class="q-gutter-y-md">
    <div class="text-h6">hello</div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { sanityCheckService } from 'src/services/sanity-check.service';

onMounted(async () => {
  const hello = await sanityCheckService.check();
  console.log(hello.status);
});
</script>

<style lang="scss">
.q-table__title {
  font-weight: 500;
}

.q-table__top {
  padding-left: 0;
  padding-right: 0;
}
</style>
