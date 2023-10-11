import { HttpBasedService } from 'src/services/httb-based.service';
import {
  GetImageParams,
  ImageSchema,
  QuantizationParams,
} from 'src/models/image-service';

const BASE_PATH = '/quantization';

enum QuantizationPaths {
  HALFTONE_PATH = '/halftone',
  QUANTIZATION_PATH = '/quantitize',
  OTSU_GLOBAL_PATH = '/otsu-global',
  OTSU_LOCAL_PATH = '/otsu-local',
  OTSU_HIERARCHICAL_PATH = '/otsu-hierarchical',
}

const quantizationParamsAdapter = (params: QuantizationParams) => ({
  ...params,
  levels: params.levels.join(','),
});

class QuantizationService extends HttpBasedService {
  async getHalftone(params: GetImageParams) {
    const res = await this.httpClient.get<ImageSchema>(
      BASE_PATH + QuantizationPaths.HALFTONE_PATH,
      {
        params,
      }
    );
    return res.data;
  }

  async getQuantitized(params: QuantizationParams) {
    const res = await this.httpClient.get<ImageSchema>(
      BASE_PATH + QuantizationPaths.QUANTIZATION_PATH,
      {
        params: quantizationParamsAdapter(params),
      }
    );
    return res.data;
  }

  async getOtsuGlobal(params: GetImageParams) {
    const res = await this.httpClient.get<ImageSchema>(
      BASE_PATH + QuantizationPaths.OTSU_GLOBAL_PATH,
      {
        params,
      }
    );
    return res.data;
  }

  async getOtsuLocal(params: GetImageParams) {
    const res = await this.httpClient.get<ImageSchema>(
      BASE_PATH + QuantizationPaths.OTSU_LOCAL_PATH,
      {
        params,
      }
    );
    return res.data;
  }

  async getOtsuHierarchical(params: GetImageParams) {
    const res = await this.httpClient.get<ImageSchema>(
      BASE_PATH + QuantizationPaths.OTSU_HIERARCHICAL_PATH,
      {
        params,
      }
    );
    return res.data;
  }
}

const quantizationService = new QuantizationService();

export { quantizationService };
