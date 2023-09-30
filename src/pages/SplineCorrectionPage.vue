<template>
  <q-page padding class="row">
    <div class="column full-width q-gutter-y-md">
      <q-banner rounded class="q-pa-md">
        <div class="text-h6">Spline color correction</div>
      </q-banner>
      <div class="overflow-auto">
        <div class="row workfield__container q-gutter-md">
          <q-card
            flat
            class="q-pa-md spline__container row justify-center items-center"
          >
            <SplineCanvas />
          </q-card>
          <q-card
            flat
            class="col q-pa-md img__container row justify-center items-center"
          >
            img
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { sanityCheckService } from 'src/services/sanity-check.service';
import SplineCanvas from 'components/spline-canvas/SplineCanvas.vue';

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
  .spline__container {
    width: 400px;
  }
  @media screen and (max-width: $breakpoint-sm) {
    flex-direction: column;
    overflow: hidden;
    .spline__container {
      width: 100%;
    }
  }
}
</style>
