export const getWeight = (
  alto: number,
  ancho: number,
  largo: number,
  factorConversion = 5000
) => {
  const volumen = alto * ancho * largo;
  const pesoVolumetrico = volumen / factorConversion;

  return pesoVolumetrico;
};
