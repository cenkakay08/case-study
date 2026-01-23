import { Toast as BaseToast } from "@base-ui/react/toast";
import classes from "./Toast.module.css";

export const toastManager = BaseToast.createToastManager();

export function Provider(props: BaseToast.Provider.Props) {
  return <BaseToast.Provider {...props} />;
}

export function Viewport({
  className = "",
  ...props
}: BaseToast.Viewport.Props) {
  return (
    <BaseToast.Viewport
      className={`${classes.Viewport} ${className}`}
      {...props}
    />
  );
}

export function Root({ className = "", ...props }: BaseToast.Root.Props) {
  return (
    <BaseToast.Root className={`${classes.Toast} ${className}`} {...props} />
  );
}

export function Content({ className = "", ...props }: BaseToast.Content.Props) {
  return (
    <BaseToast.Content
      className={`${classes.Content} ${className}`}
      {...props}
    />
  );
}

export function Title({ className = "", ...props }: BaseToast.Title.Props) {
  return (
    <BaseToast.Title className={`${classes.Title} ${className}`} {...props} />
  );
}

export function Description({
  className = "",
  ...props
}: BaseToast.Description.Props) {
  return (
    <BaseToast.Description
      className={`${classes.Description} ${className}`}
      {...props}
    />
  );
}

export function Close({ className = "", ...props }: BaseToast.Close.Props) {
  return (
    <BaseToast.Close className={`${classes.Close} ${className}`} {...props} />
  );
}

export function Portal(props: BaseToast.Portal.Props) {
  return <BaseToast.Portal {...props} />;
}
