import { HttpBasedService } from 'src/services/httb-based.service';
import { GetImageParams, ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/frequency-filtering';
const SMOOTHENING_SHARPENING_PATH = '/smoothening-sharpening';

export interface FilterApplicationSchema {
  filt: ImageSchema;
  spectrum: ImageSchema;
  img_out: ImageSchema;
}

export interface TestSchema {
  source: ImageSchema;
  spectrum: ImageSchema;
  smoothing_schema: FilterApplicationSchema;
}

class FrequencyFilteringService extends HttpBasedService {
  async smootheningSharpening(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<TestSchema>(
      BASE_PATH + SMOOTHENING_SHARPENING_PATH,
      {
        params,
      }
    );
    return res.data;
  }
}

const frequencyFilteringService = new FrequencyFilteringService();

export { frequencyFilteringService };
