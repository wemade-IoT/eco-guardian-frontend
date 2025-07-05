export class OrderRequest {
    action: string; //Installation Manual or Assisted
    consumerId: number; //This is the userId of the consumer we get it from the AuthStore
    installationDate: Date; // This is selected or assigned depending on the action
    details: Array<{OrderDetailRequest: any}>; // This Should Have all the info about the order of Installation

    constructor(
        action: string,
        consumerId: number,
        installationDate: Date,
        details: Array<{OrderDetailRequest: any}>
    ) {
        this.action = action;
        this.consumerId = consumerId;
        this.installationDate = installationDate;
        this.details = details;
    }

}
