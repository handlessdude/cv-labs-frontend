import { HttpBasedService } from 'src/services/httb-based.service';
import { CorrectionSchema } from 'src/models/image-service';

const BASE_PATH = '/quantization';

enum QuantizationPaths {
  HALFTONE_PATH = '/halftone',
  QUANTIZATION_PATH = '/quantitize',
  OTSU_GLOBAL_PATH = '/otsu-global',
}

interface QuantizationParams {
  levels: Array<number>;
}

class QuantizationService extends HttpBasedService {
  async getHalftone() {
    const res = await this.httpClient.get<CorrectionSchema>(
      BASE_PATH + QuantizationPaths.HALFTONE_PATH
    );
    return res.data;
  }

  async getQuantitized(params: QuantizationParams) {
    const res = await this.httpClient.get<CorrectionSchema>(
      BASE_PATH + QuantizationPaths.QUANTIZATION_PATH,
      {
        params: {
          ...params,
          levels: params.levels.join(','),
        },
      }
    );
    return res.data;
  }

  async getOtsuGlobal() {
    const res = await this.httpClient.get<CorrectionSchema>(
      BASE_PATH + QuantizationPaths.OTSU_GLOBAL_PATH
    );
    return res.data;
  }
}

const quantizationService = new QuantizationService();

export { quantizationService };
