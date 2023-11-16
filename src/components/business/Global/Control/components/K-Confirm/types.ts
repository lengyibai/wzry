export interface ConfirmTip {
  text: string;
  confirm: () => void;
  cancel?: () => void;
}
