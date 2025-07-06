export interface OrderDetail {
  deviceId: number;
  quantity: number;
  unitPrice: number;
  description: string;
  area: number;
}

export interface NewOrder {
  id: number;
  action: string;
  consumerId: number;
  installationDate: Date;
  details: Array<any>;
}