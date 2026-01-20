import { Switch as BaseSwitch } from "@base-ui/react/switch";
import styles from "./Switch.module.css";

export function Root({ className, ...props }: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root {...props} className={`${styles.Switch} ${className}`} />
  );
}

export function Thumb({ className, ...props }: BaseSwitch.Thumb.Props) {
  return (
    <BaseSwitch.Thumb {...props} className={`${styles.Thumb} ${className}`} />
  );
}
