interface ImageHist {
  r: Array<number>;
  g: Array<number>;
  b: Array<number>;
}

interface ImageSchema {
  id: string;
  img_src: string;
  hist: ImageHist;
  img_alt?: string;
}

interface CorrectionSchema {
  img_in: ImageSchema;
  img_out: ImageSchema;
}

interface SplineCorrectionParams {
  xp: Array<number>;
  fp: Array<number>;
}

export type {
  ImageSchema,
  ImageHist,
  CorrectionSchema,
  SplineCorrectionParams,
};
