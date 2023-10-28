import { HttpBasedService } from 'src/services/httb-based.service';
import { GetImageParams, ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/spatial-filtering';
const GEARS_INSPECTION_PATH = '/skeleton-enhancement';

class SpatialFilteringService extends HttpBasedService {
  async skeletonEnhancement(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<Array<ImageSchema>>(
      BASE_PATH + GEARS_INSPECTION_PATH,
      {
        params,
      }
    );
    return res.data;
  }
}

const spatialFilteringService = new SpatialFilteringService();

export { spatialFilteringService };
