const calculateVolumetric = (
  height: string,
  weight: string,
  productLength: string
): string => {
  const conversionFactor = 333;
  const volumetricWeight =
    Number.parseFloat(height) *
    Number.parseFloat(weight) *
    Number.parseFloat(productLength) *
    conversionFactor;
  return volumetricWeight.toFixed(3);
};

export default calculateVolumetric;
