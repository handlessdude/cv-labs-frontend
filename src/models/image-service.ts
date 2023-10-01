interface ImageHist {
  r: Array<number>;
  g: Array<number>;
  b: Array<number>;
}

interface ImageSchemaOut {
  id: string;
  img: string;
  hist: ImageHist;
}

export type { ImageSchemaOut, ImageHist };
