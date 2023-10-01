import { HttpBasedService } from 'src/services/httb-based.service';
import { ImageSchemaOut } from 'src/models/image-service';

const BASE_PATH = '/image';

class ImageService extends HttpBasedService {
  async getItem() {
    const res = await this.httpClient.get<ImageSchemaOut>(BASE_PATH);
    return res.data;
  }
}

const imageService = new ImageService();

export { imageService };
