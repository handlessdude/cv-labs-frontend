import { HttpBasedService } from 'src/services/httb-based.service';
import { CorrectionSchema } from 'src/models/image-service';

const BASE_PATH = '/quantization';

const HALFTONE_PATH = '/halftone';

class QuantizationService extends HttpBasedService {
  async getHalftone() {
    const res = await this.httpClient.get<CorrectionSchema>(
      BASE_PATH + HALFTONE_PATH
    );
    return res.data;
  }
}

const quantizationService = new QuantizationService();

export { quantizationService };
