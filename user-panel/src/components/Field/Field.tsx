import * as React from "react";
import classes from "./Field.module.css";
import { Field } from "@base-ui/react/field";

export function Root({ className = "", ...props }: Field.Root.Props) {
  return <Field.Root className={`${classes.Field} ${className}`} {...props} />;
}

export function Label({ className = "", ...props }: Field.Label.Props) {
  return <Field.Label className={`${classes.Label} ${className}`} {...props} />;
}

export function Description({
  className = "",
  ...props
}: Field.Description.Props) {
  return (
    <Field.Description
      className={`${classes.Description} ${className}`}
      {...props}
    />
  );
}

export const Control = React.forwardRef<HTMLInputElement, Field.Control.Props>(
  function FieldControl(
    { className = "", ...props }: Field.Control.Props,
    forwardedRef: React.ForwardedRef<HTMLInputElement>,
  ) {
    return (
      <Field.Control
        ref={forwardedRef}
        className={`${classes.Input} ${className}`}
        {...props}
      />
    );
  },
);

export function Error({ className = "", ...props }: Field.Error.Props) {
  return <Field.Error className={`${classes.Error} ${className}`} {...props} />;
}

export function Item(props: Field.Item.Props) {
  return <Field.Item {...props} />;
}
