import { Button as BaseButton } from "@base-ui/react/button";
import styles from "./Button.module.css";

export function Button(props: React.ComponentProps<typeof BaseButton>) {
  return (
    <BaseButton {...props} className={`${styles.Button} ${props.className}`} />
  );
}
