import * as React from "react";
import classes from "./Field.module.css";
import { Field } from "@base-ui/react/field";

export function Root({ className = "", ...props }: Field.Root.Props) {
  return <Field.Root className={`${classes.Field} ${className}`} {...props} />;
}

export function Label({
  className = "",
  required,
  children,
  ...props
}: Field.Label.Props & { required?: boolean }) {
  return (
    <Field.Label className={`${classes.Label} ${className}`} {...props}>
      {children}
      {required && <span className={classes.Asterisk}> *</span>}
    </Field.Label>
  );
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

export const Control = React.forwardRef<any, Field.Control.Props>(
  function FieldControl(
    { className = "", ...props }: Field.Control.Props,
    forwardedRef: React.ForwardedRef<any>,
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
