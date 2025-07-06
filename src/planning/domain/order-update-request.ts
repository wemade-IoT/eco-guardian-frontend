export class OrderUpdateRequest {
  action: string;
  stateId: number;
  consumerId: number;
  specialistId: number;
  installationDate: Date;

  constructor(
    action: string,
    stateId: number,
    consumerId: number,
    specialistId: number,
    installationDate: Date
  ) {
    this.action = action;
    this.stateId = stateId;
    this.consumerId = consumerId;
    this.specialistId = specialistId;
    this.installationDate = installationDate;
  }
}