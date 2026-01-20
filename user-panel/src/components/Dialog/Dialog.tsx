import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import styles from "./Dialog.module.css";

export const Root = BaseDialog.Root;
export const Portal = BaseDialog.Portal;

export function Trigger({ className, ...props }: BaseDialog.Trigger.Props) {
  return (
    <BaseDialog.Trigger
      className={`${styles.Button} ${className || ""}`}
      {...props}
    />
  );
}

export function Backdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  return (
    <BaseDialog.Backdrop
      className={`${styles.Backdrop} ${className || ""}`}
      {...props}
    />
  );
}

export function Popup({
  children,
  className,
  ...props
}: BaseDialog.Popup.Props) {
  return (
    <BaseDialog.Popup
      className={`${styles.Popup} ${className || ""}`}
      {...props}
    />
  );
}

export function Title({ className, ...props }: BaseDialog.Title.Props) {
  return (
    <BaseDialog.Title
      className={`${styles.Title} ${className || ""}`}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: BaseDialog.Description.Props) {
  return (
    <BaseDialog.Description
      className={`${styles.Description} ${className || ""}`}
      {...props}
    />
  );
}

export function Close({ className, ...props }: BaseDialog.Close.Props) {
  return (
    <BaseDialog.Close
      className={`${styles.Button} ${className || ""}`}
      {...props}
    />
  );
}
