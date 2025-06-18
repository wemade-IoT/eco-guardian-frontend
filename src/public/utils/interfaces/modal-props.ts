import type { AlertType } from "../types/alert-type";

export interface ModalProps {
  title: string;
  subtitle: string;
  type: AlertType;
  severity: "secondary" | "success" | "info" | "warning" | "help" | "danger";
}
