import { HttpBasedService } from 'src/services/httb-based.service';
import { ImageHist } from 'src/models/image-service';

const BASE_PATH = '/color-correction';

const SPLINE_PATH = '/spline';

interface Correction {
  id: string;
  img: string;
  hist: ImageHist;
}

interface SplineCorrectionParams {
  xp: Array<number>;
  fp: Array<number>;
}

const splineParamsAdapter = (params: SplineCorrectionParams) => ({
  xp: params.xp.join(','),
  fp: params.fp.join(','),
});

class ColorCorrectionService extends HttpBasedService {
  async splineCorrection(params: SplineCorrectionParams) {
    const res = await this.httpClient.get<Correction>(BASE_PATH + SPLINE_PATH, {
      params: splineParamsAdapter(params),
    });
    return res.data;
  }
}

const colorCorrectionService = new ColorCorrectionService();

export { colorCorrectionService };
