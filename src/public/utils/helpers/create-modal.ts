import type { DefineComponent } from "vue";
import type { ModalProps } from "../interfaces/modal-props";

/**
 * creates and opens a modal dialog with the specified component and data baila mati
 *
 * @param dialog - The dialog service used to open the modal
 * @param component - The Vue component to be rendered in the modal
 * @param data - The data to be passed to the modal, including title, subtitle, type, and severity
 */
export const createModal = (
  dialog: any,
  component: DefineComponent<any, any, any>,
  data: ModalProps
) => {

  dialog.open(component, {
    props: {
      modal: true,
      style: { width: "400px" },
      closable: false,
    },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      type: data.type,
      severity: data.severity,
    },
    onClose: () => {
      console.log("Dialog closed");
    },
  });
};
