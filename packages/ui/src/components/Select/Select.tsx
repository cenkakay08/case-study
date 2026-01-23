import { Select as BaseSelect } from "@base-ui/react/select";
import styles from "./Select.module.css";

export function Root<T>(props: BaseSelect.Root.Props<T>) {
  return <BaseSelect.Root {...props} />;
}

export function Trigger({
  className = "",
  ...props
}: BaseSelect.Trigger.Props) {
  return (
    <BaseSelect.Trigger
      className={`${styles.Select} ${className}`}
      {...props}
    />
  );
}

export function Value({ className = "", ...props }: BaseSelect.Value.Props) {
  return (
    <BaseSelect.Value className={`${styles.Value} ${className}`} {...props} />
  );
}

export function Icon({ className = "", ...props }: BaseSelect.Icon.Props) {
  return (
    <BaseSelect.Icon
      className={`${styles.SelectIcon} ${className}`}
      {...props}
    />
  );
}

export function Portal(props: BaseSelect.Portal.Props) {
  return <BaseSelect.Portal {...props} />;
}

export function Positioner({
  className = "",
  ...props
}: BaseSelect.Positioner.Props) {
  return (
    <BaseSelect.Positioner
      className={`${styles.Positioner} ${className}`}
      {...props}
    />
  );
}

export function Popup({ className = "", ...props }: BaseSelect.Popup.Props) {
  return (
    <BaseSelect.Popup className={`${styles.Popup} ${className}`} {...props} />
  );
}

export function ScrollUpArrow({
  className = "",
  ...props
}: BaseSelect.ScrollUpArrow.Props) {
  return (
    <BaseSelect.ScrollUpArrow
      className={`${styles.ScrollArrow} ${className}`}
      {...props}
    />
  );
}

export function ScrollDownArrow({
  className = "",
  ...props
}: BaseSelect.ScrollDownArrow.Props) {
  return (
    <BaseSelect.ScrollDownArrow
      className={`${styles.ScrollArrow} ${className}`}
      {...props}
    />
  );
}

export function List({ className = "", ...props }: BaseSelect.List.Props) {
  return (
    <BaseSelect.List className={`${styles.List} ${className}`} {...props} />
  );
}

export function Item({ className = "", ...props }: BaseSelect.Item.Props) {
  return (
    <BaseSelect.Item className={`${styles.Item} ${className}`} {...props} />
  );
}

export function ItemIndicator({
  className = "",
  ...props
}: BaseSelect.ItemIndicator.Props) {
  return (
    <BaseSelect.ItemIndicator
      className={`${styles.ItemIndicator} ${className}`}
      {...props}
    />
  );
}

export function ItemText({
  className = "",
  ...props
}: BaseSelect.ItemText.Props) {
  return (
    <BaseSelect.ItemText
      className={`${styles.ItemText} ${className}`}
      {...props}
    />
  );
}

export function Group(props: BaseSelect.Group.Props) {
  return <BaseSelect.Group {...props} />;
}

export function GroupLabel({
  className = "",
  ...props
}: BaseSelect.GroupLabel.Props) {
  return (
    <BaseSelect.GroupLabel
      className={`${styles.GroupLabel} ${className}`}
      {...props}
    />
  );
}

export function Backdrop({
  className = "",
  ...props
}: BaseSelect.Backdrop.Props) {
  return (
    <BaseSelect.Backdrop
      className={`${styles.Backdrop} ${className}`}
      {...props}
    />
  );
}

export function Arrow({ className = "", ...props }: BaseSelect.Arrow.Props) {
  return (
    <BaseSelect.Arrow className={`${styles.Arrow} ${className}`} {...props} />
  );
}

export function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

export function CheckIcon({
  className = "",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      className={`${styles.ItemIndicatorIcon} ${className}`}
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
