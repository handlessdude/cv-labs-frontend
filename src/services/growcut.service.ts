import { HttpBasedService } from 'src/services/httb-based.service';
import { GetImageParams, ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/growcut';
const CUT_OBJECT_PATH = '/cut-object';

export type CutObjectParams = GetImageParams;

class GrowcutService extends HttpBasedService {
  async cutObject(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<Array<ImageSchema>>(
      BASE_PATH + CUT_OBJECT_PATH,
      {
        params,
      }
    );
    return res.data;
  }
}

const growcutService = new GrowcutService();

export { growcutService };
