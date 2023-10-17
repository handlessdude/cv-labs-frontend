import { HttpBasedService } from 'src/services/httb-based.service';
import { GetImageParams, ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/morphology';
const GEARS_INSPECTION_PATH = '/gear-inspection';

class MorphologyService extends HttpBasedService {
  async inspectGears(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<Array<ImageSchema>>(
      BASE_PATH + GEARS_INSPECTION_PATH,
      {
        params,
      }
    );
    return res.data;
  }
}

const morphologyService = new MorphologyService();

export { morphologyService };
