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
            <SplineCanvas @update="updateImage" />
            <q-table
              title="Points"
              :rows="statistics"
              :columns="statisticsColumns"
              row-key="id"
              flat
              class="full-width q-mt-md"
            />
          </q-card>
          <q-card
            flat
            class="col q-pa-md img__container row justify-center items-center"
          >
            <NoImagePlaceholder />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { sanityCheckService } from 'src/services/sanity-check.service';
import SplineCanvas from 'components/spline-canvas/SplineCanvas.vue';
import NoImagePlaceholder from 'components/NoImagePlaceholder.vue';
import { debounce } from 'quasar';
import { Iterable, Point } from 'src/models/generic';

onMounted(async () => {
  const hello = await sanityCheckService.check();
  console.log(hello.status);
});

//
const updateImage = debounce(
  (points: Array<Iterable & Point>, xp: Array<number>, fp: Array<number>) => {
    statistics.value = points;
  },
  50
);

const statistics: Ref<Array<Iterable & Point>> = ref([]);
const statisticsColumns = ref([
  {
    name: 'id',
    required: true,
    label: 'Number',
    align: 'left',
    field: (row: Iterable & Point) => row.id,
  },
  {
    name: 'x',
    required: true,
    label: 'X',
    field: 'x',
    align: 'left',
  },
  {
    name: 'y',
    required: true,
    label: 'Y',
    field: 'y',
    align: 'left',
  },
]);
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

.q-table__container {
  color: $basic-dark !important;
}
</style>
