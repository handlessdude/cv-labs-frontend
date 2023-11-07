import { HttpBasedService } from 'src/services/httb-based.service';
import { GetImageParams, ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/frequency-filtering';
const APPLY_IDEAL_PATH = '/apply-ideal';
const GET_SPECTRUM_PATH = '/get-spectrum';

export interface FilterApplicationSchema {
  filt: ImageSchema;
  spectrum: ImageSchema;
  img_out: ImageSchema;
}

export interface FilteringPipelineSchema {
  smoothing_schema: FilterApplicationSchema;
  sharpening_schema: FilterApplicationSchema;
}

class FrequencyFilteringService extends HttpBasedService {
  async getImageSpectrum(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<ImageSchema>(
      BASE_PATH + GET_SPECTRUM_PATH,
      {
        params,
      }
    );
    return res.data;
  }

  async applyIdealFilter(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<FilteringPipelineSchema>(
      BASE_PATH + APPLY_IDEAL_PATH,
      {
        params,
      }
    );
    return res.data;
  }
}

const frequencyFilteringService = new FrequencyFilteringService();

export { frequencyFilteringService };
