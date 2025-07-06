export const calculateDeviceQuantity = (
  areaCoverage: number,
  isPlantation: boolean
): number => {
  if (!isPlantation || areaCoverage === 0) {
    return 1; // Para plantas individuales o sin área, solo 1 dispositivo
  }

  // Para plantaciones: 1 dispositivo por cada 0.5 km² (ajusta según tu lógica de negocio)
  const devicesPerKm = 2; // 2 dispositivos por km²
  const quantity = Math.ceil(areaCoverage * devicesPerKm);

  return Math.max(1, quantity);
};

export const getReturnUrl = (referenceType: string) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (referenceType == 'order') {
    return `${baseUrl}payment-order-succeded`;
  } else if (referenceType == 'subscription') {
    return `${baseUrl}payment-succeded`;
  } else {
    return `${baseUrl}payment-succeded`;
  }
};