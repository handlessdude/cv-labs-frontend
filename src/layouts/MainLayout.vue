<template>
  <q-layout view="lHh Lpr lFf" class="bg-dull">
    <q-header elevated>
      <q-toolbar class="bg-teal-7">
        <q-btn
          flat
          dense
          round
          icon="linear_scale"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> CV-LABS </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :show-if-above="false" bordered>
      <q-list>
        <q-item-label header> Color correction </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { RouteName } from 'src/router/route-name';
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    routeName: RouteName.DASHBOARD,
  },
  {
    title: 'Ex. 01: Spline correction',
    icon: 'gesture',
    routeName: RouteName.SPLINE_CORRECTION,
  },
  {
    title: '03: Binarization and quantization',
    icon: 'view_comfy_alt',
    routeName: RouteName.BINARIZATION_QUANTIZATION,
  },
  {
    title: '04: Morphological operations',
    icon: 'hub',
    routeName: RouteName.MORPHOLOGY,
  },
  {
    title: '05: Spatial fitlering',
    icon: 'hub',
    routeName: RouteName.SPATIAL_FILTERING,
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss"></style>
