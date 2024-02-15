export type TProduct = {
  name: string;
  price: number;
  productImg: string;
  quantity: number;
  frameMaterial: "metal" | "plastic" | "acetate";
  frameShape: "rectangular" | "round" | "cat-eye";
  lensType: "single-vision" | "bifocal" | "progressive";
  brand: string;
  gender: "men" | "women" | "unisex";
  color: string;
  templeLength: number;
  bridgeSize: number;
  createdBy: string;
};
