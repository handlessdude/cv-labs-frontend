import { ref, watch } from 'vue';
import { Nullable } from 'src/models/generic';

const useImageReader = () => {
  const imageFile = ref<Nullable<File>>(null);
  const imageElement = ref<Nullable<HTMLImageElement>>(null);

  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    if (!event.target) return;

    const dataURL: string | ArrayBuffer | null = event.target.result;

    if (typeof dataURL !== 'string') return;

    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      imageElement.value = img;
    };
  };

  watch(imageFile, (val) => {
    if (!val) return;
    reader.readAsDataURL(val);
  });

  return {
    imageFile,
    imageElement,
  };
};

export { useImageReader };
