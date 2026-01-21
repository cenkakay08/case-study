import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import styles from "./AlertDialog.module.css";

export const Root = BaseAlertDialog.Root;
export const Portal = BaseAlertDialog.Portal;
export const Close = BaseAlertDialog.Close;

export function Trigger({
  className,
  ...props
}: BaseAlertDialog.Trigger.Props) {
  return (
    <BaseAlertDialog.Trigger
      className={`${styles.Button} ${className || ""}`}
      {...props}
    />
  );
}

export function Backdrop({
  className,
  ...props
}: BaseAlertDialog.Backdrop.Props) {
  return (
    <BaseAlertDialog.Backdrop
      className={`${styles.Backdrop} ${className || ""}`}
      {...props}
    />
  );
}

export function Popup({ className, ...props }: BaseAlertDialog.Popup.Props) {
  return (
    <BaseAlertDialog.Popup
      className={`${styles.Popup} ${className || ""}`}
      {...props}
    />
  );
}

export function Title({ className, ...props }: BaseAlertDialog.Title.Props) {
  return (
    <BaseAlertDialog.Title
      className={`${styles.Title} ${className || ""}`}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: BaseAlertDialog.Description.Props) {
  return (
    <BaseAlertDialog.Description
      className={`${styles.Description} ${className || ""}`}
      {...props}
    />
  );
}
