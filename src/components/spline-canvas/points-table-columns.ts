import { ref } from 'vue';
import { Iterable, Point } from 'src/models/generic';

const pointsTableColumns = ref([
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
    format: (val: number) => val.toFixed(4)
  },
  {
    name: 'y',
    required: true,
    label: 'Y',
    field: 'y',
    align: 'left',
    format: (val: number) => val.toFixed(4)
  },
]);

export { pointsTableColumns };
