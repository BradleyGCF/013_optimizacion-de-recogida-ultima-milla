const calculateVolumetric = ({ height, weight, productLength }) => {
  const conversionFactor = 333;
  const volumetricWeight = height * weight * productLength * conversionFactor;
  return volumetricWeight;
};

export default calculateVolumetric;
