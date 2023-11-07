import { HttpBasedService } from 'src/services/httb-based.service';
import { GetImageParams, ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/frequency-filtering';
const APPLY_IDEAL_PATH = '/apply-ideal';

export interface FilterApplicationSchema {
  filt: ImageSchema;
  spectrum: ImageSchema;
  img_out: ImageSchema;
}

export interface TestSchema {
  source: ImageSchema;
  spectrum: ImageSchema;
  smoothing_schema: FilterApplicationSchema;
  sharpening_schema: FilterApplicationSchema;
}

class FrequencyFilteringService extends HttpBasedService {
  async applyIdealFilter(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<TestSchema>(
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
