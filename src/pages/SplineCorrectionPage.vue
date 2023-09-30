<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Spline color correction</div>
      </q-banner>
      <div class="overflow-auto">
        <div class="row workfield__container q-gutter-md">
          <q-card flat class="col-4 q-pa-md spline__container"> spline </q-card>
          <q-card flat class="col q-pa-md img__container"> img </q-card>
        </div>
      </div>
    </div>
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
.workfield__container {
  @media screen and (max-width: $breakpoint-xs) {
    flex-direction: column;
    overflow: hidden;
    .spline__container {
      width: 100%;
    }
  }
}
</style>
