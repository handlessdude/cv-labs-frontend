import { HttpBasedService } from 'src/services/httb-based.service';
import { ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/growcut';
const CUT_OBJECT_PATH = '/cut-object';

export interface CutObjectParams {
  src_img: string;
  markings: string;
}

class GrowcutService extends HttpBasedService {
  async cutObject(data: CutObjectParams) {
    const res = await this.httpClient.post<Array<ImageSchema>>(
      BASE_PATH + CUT_OBJECT_PATH,
      data
    );
    return res.data;
  }
}

const growcutService = new GrowcutService();

export { growcutService };
