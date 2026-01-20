import React from "react";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { z } from "zod";
import * as Field from "@/components/Field/Field";
import styles from "./Login.module.css";
import { Button } from "@/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAsyncThunk } from "@/store/slices/authSlice";

import { useTranslation } from "react-i18next";

const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("login.emailRequired") })
      .pipe(z.email({ message: t("login.emailInvalid") })),
    password: z
      .string()
      .min(1, { message: t("login.passwordRequired") })
      .min(6, { message: t("login.passwordMin") }),
  });

const loginDefaultValues = {
  email: "user1@test.com",
  password: "123456",
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const loginSchema = React.useMemo(() => getLoginSchema(t), [t]);

  const form = useForm({
    defaultValues: loginDefaultValues,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onChange: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await dispatch(loginAsyncThunk(value));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>{t("login.title")}</h1>
        <p className={styles.subtitle}>{t("login.subtitle")}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className={styles.form}
        >
          <form.Field
            name="email"
            children={(field) => (
              <Field.Root>
                <Field.Label required>{t("login.emailLabel")}</Field.Label>
                <Field.Control
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder={t("login.emailPlaceholder")}
                />
                <Field.Error match={!field.state.meta.isValid}>
                  {field.state.meta.errors?.[0]?.message}
                </Field.Error>
              </Field.Root>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <Field.Root>
                <Field.Label required>{t("login.passwordLabel")}</Field.Label>
                <Field.Control
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••"
                />
                <Field.Error match={!field.state.meta.isValid}>
                  {field.state.meta.errors?.[0]?.message}
                </Field.Error>
              </Field.Root>
            )}
          />
          <div className={styles.actions}>
            <form.Subscribe selector={(state) => [state.isSubmitting]}>
              {([isSubmitting]) => (
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isSubmitting || isLoading
                    ? t("login.signingIn")
                    : t("login.submitButton")}
                </Button>
              )}
            </form.Subscribe>
            {error && <div className={styles.generalError}>{t(error)}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
