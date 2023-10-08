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
        path: '',
        name: RouteName.SPLINE_CORRECTION,
        component: () => import('pages/SplineCorrectionPage.vue'),
      },
      {
        path: '',
        name: RouteName.BINARIZATION_QUANTIZATION,
        component: () => import('pages/BinarizationQuantizationPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
