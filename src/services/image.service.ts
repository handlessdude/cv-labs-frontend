import { HttpBasedService } from 'src/services/httb-based.service';
import { GetImageParams, ImageSchema } from 'src/models/image-service';

const BASE_PATH = '/image';

class ImageService extends HttpBasedService {
  async getItem(params: Partial<GetImageParams> = {}) {
    const res = await this.httpClient.get<ImageSchema>(BASE_PATH, {
      params,
    });
    return res.data;
  }
}

const imageService = new ImageService();

export { imageService };
