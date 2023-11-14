import { RouteRecordRaw } from 'vue-router';
import { RouteName } from 'src/router/route-name';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: RouteName.DASHBOARD,
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: '/spline',
        name: RouteName.SPLINE_CORRECTION,
        component: () => import('pages/SplineCorrectionPage.vue'),
      },
      {
        path: '/quantization',
        name: RouteName.BINARIZATION_QUANTIZATION,
        component: () => import('pages/BinarizationQuantizationPage.vue'),
      },
      {
        path: '/morphology',
        name: RouteName.MORPHOLOGY,
        component: () => import('pages/MorphologyPage.vue'),
      },
      {
        path: '/spatial-filtering',
        name: RouteName.SPATIAL_FILTERING,
        component: () => import('pages/SpatialFilteringPage.vue'),
      },
      {
        path: '/frequency-filtering',
        name: RouteName.FREQUENCY_FILTERING,
        component: () =>
          import('src/features/frequency-filtering/FrequencyFilteringPage.vue'),
      },
      {
        path: '/growcut',
        name: RouteName.GROWCUT,
        component: () => import('src/features/growcut/GrowCutPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
