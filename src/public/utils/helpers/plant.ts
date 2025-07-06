export const limits = {
  'Domestic': 0, // deberia ser 5
  'Pro': 0, // deberia ser 10
  'Business': 0,
  'Specialist': 0,
  'Admin': 0,
}; 

export function createObjectURL(file: File): string {
  return URL.createObjectURL(file);
}