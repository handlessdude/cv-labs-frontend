import { Ref } from 'vue';
import { Nullable } from 'src/models/generic';
import Konva from 'konva';
import { onMounted, ref } from 'vue';
import { palette } from 'components/spline-canvas/resources';

const useFreedrawCanvas = () => {
  const stageRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);
  const drawLayerRef: Ref<Nullable<Konva.NodeConfig>> = ref(null);

  const modes = ['eraser', 'brush'];
  const mode = ref(modes[1]);
  const strokeWidth = ref(5);
  const strokeWidthLimits = { min: 1, max: 50 };

  let isPaint = false;
  let lastLine: Nullable<Konva.Line>;

  const setCallbacks = (stage: Konva.NodeConfig, layer: Konva.NodeConfig) => {
    stage.on('mousedown touchstart', function () {
      if (!stageRef.value) return;
      isPaint = true;
      const pos = stage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: strokeWidth.value,
        globalCompositeOperation:
          mode.value === 'brush' ? 'source-over' : 'destination-out',
        // round cap for smoother lines
        lineCap: 'round',
        lineJoin: 'round',
        // add point twice, so we have some drawings even on a simple click
        points: [pos.x, pos.y, pos.x, pos.y],
      });
      layer.add(lastLine);
    });

    stage.on('mouseup touchend', function () {
      isPaint = false;
    });

    // and core function - drawing
    stage.on('mousemove touchmove', function (e) {
      if (!isPaint) return;

      // prevent scrolling on touch devices
      console.log(e);
      e.evt.preventDefault();

      const pos = stage.getPointerPosition();
      if (!lastLine) return;

      const newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
    });
  };

  onMounted(() => {
    if (!stageRef.value) return;
    if (!drawLayerRef.value) return;
    const stage: Konva.NodeConfig = stageRef.value.getNode();
    const layer: Konva.NodeConfig = drawLayerRef.value.getNode();

    stage.container().setAttribute('id', 'konva-parent');

    stage.container().style.backgroundColor = palette.background;
    setCallbacks(stage, layer);
  });

  return {
    stageRef,
    drawLayerRef,
    mode,
    strokeWidth,
    strokeWidthLimits,
    modes,
  };
};

export { useFreedrawCanvas };
