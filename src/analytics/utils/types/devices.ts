export const DEVICE_STATE = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  LOST_SIGNAL: 'Lost Signal',
} as const;

export type DEVICE_STATE = typeof DEVICE_STATE[keyof typeof DEVICE_STATE];