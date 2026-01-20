import React from "react";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { z } from "zod";
import * as Field from "@/components/Field/Field";
import styles from "./Login.module.css";
import { Button } from "@/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAsyncThunk } from "@/store/slices/authSlice";

const userSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-posta alanı zorunludur" })
    .pipe(z.email({ message: "Geçerli bir e-posta adresi giriniz" })),
  password: z
    .string()
    .min(1, { message: "Şifre alanı zorunludur" })
    .min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const form = useForm({
    defaultValues: {
      email: "user1@test.com",
      password: "123456",
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onChange: userSchema,
      onSubmit: userSchema,
    },
    onSubmit: async ({ value }) => {
      await dispatch(loginAsyncThunk(value));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Hoş Geldiniz</h1>
        <p className={styles.subtitle}>
          Kullanıcı panelinize erişmek için giriş yapın
        </p>
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
                <Field.Label required>E-posta</Field.Label>
                <Field.Control
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="örnek@eposta.com"
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
                <Field.Label required>Şifre</Field.Label>
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
                    ? "Giriş Yapılıyor..."
                    : "Giriş Yap"}
                </Button>
              )}
            </form.Subscribe>
            {error && <div className={styles.generalError}>{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
