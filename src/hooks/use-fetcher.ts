import { ref } from 'vue';

const useFetcher = (callback: (...params: any[]) => Promise<void>) => {
  const isRequestLoading = ref(false);

  const load = async (...params: any[]) => {
    try {
      isRequestLoading.value = true;
      await callback(params);
    } catch (e) {
      console.log(e);
    } finally {
      isRequestLoading.value = false;
    }
  };
  return {
    isRequestLoading,
    load,
  };
};

export { useFetcher };
