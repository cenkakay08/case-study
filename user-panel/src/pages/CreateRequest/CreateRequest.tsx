import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Field, Select, Button } from "@case-study/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createTaskAsync } from "@/store/slices/taskSlice";
import styles from "./CreateRequest.module.css";
import { useTranslation } from "react-i18next";

const requestSchema = z.object({
  title: z.string().min(3, "createRequest.validation.titleMin"),
  description: z.string().min(10, "createRequest.validation.descriptionMin"),
  category: z.string().min(1, "createRequest.validation.categoryRequired"),
  priority: z.enum(["low", "normal", "high", "urgent"] as const, {
    message: "createRequest.validation.priorityRequired",
  }),
});

const CATEGORIES = [
  "Purchasing",
  "Technical Support",
  "Leave Request",
  "Other",
];

const PRIORITIES = ["low", "normal", "high", "urgent"] as const;

const createRequestDefaultValues = {
  title: "",
  description: "",
  category: "",
  priority: "" as any,
};

export default function CreateRequest() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.tasks);

  const form = useForm({
    defaultValues: createRequestDefaultValues,
    validators: {
      onChange: requestSchema,
      onSubmit: requestSchema,
    },
    onSubmit: async ({ value }) => {
      const resultAction = await dispatch(createTaskAsync(value));
      if (createTaskAsync.fulfilled.match(resultAction)) {
        form.reset();
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t("createRequest.title")}</h1>
          <p className={styles.subtitle}>{t("createRequest.subtitle")}</p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className={styles.form}
        >
          <form.Field
            name="title"
            children={(field) => (
              <Field.Root className={styles.fullWidth}>
                <Field.Label required>
                  {t("createRequest.form.titleLabel")}
                </Field.Label>
                <Field.Control
                  placeholder={t("createRequest.form.titlePlaceholder")}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <Field.Error match={field.state.meta.errors.length > 0}>
                  {t(field.state.meta.errors?.[0]?.message ?? "")}
                </Field.Error>
              </Field.Root>
            )}
          />

          <form.Field
            name="category"
            children={(field) => (
              <Field.Root>
                <Field.Label required>
                  {t("createRequest.form.categoryLabel")}
                </Field.Label>
                <Select.Root
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val ?? "")}
                >
                  <Select.Trigger>
                    <Select.Value
                      placeholder={t("createRequest.form.categoryPlaceholder")}
                    >
                      {field.state.value
                        ? t(`categories.${field.state.value}`)
                        : ""}
                    </Select.Value>
                    <Select.Icon>
                      <Select.ChevronUpDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner sideOffset={8}>
                      <Select.Popup>
                        <Select.List>
                          {CATEGORIES.map((cat) => (
                            <Select.Item key={cat} value={cat}>
                              <Select.ItemText>
                                {t(`categories.${cat}`)}
                              </Select.ItemText>
                              <Select.ItemIndicator>
                                <Select.CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
                <Field.Error match={field.state.meta.errors.length > 0}>
                  {t(field.state.meta.errors?.[0]?.message ?? "")}
                </Field.Error>
              </Field.Root>
            )}
          />

          <form.Field
            name="priority"
            children={(field) => (
              <Field.Root>
                <Field.Label required>
                  {t("createRequest.form.priorityLabel")}
                </Field.Label>
                <Select.Root
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange((val as any) ?? "")
                  }
                >
                  <Select.Trigger>
                    <Select.Value
                      placeholder={t("createRequest.form.priorityPlaceholder")}
                    >
                      {field.state.value
                        ? t(`priorities.${field.state.value}`)
                        : ""}
                    </Select.Value>
                    <Select.Icon>
                      <Select.ChevronUpDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner sideOffset={8}>
                      <Select.Popup>
                        <Select.List>
                          {PRIORITIES.map((p) => (
                            <Select.Item key={p} value={p}>
                              <Select.ItemText>
                                {t(`priorities.${p}`)}
                              </Select.ItemText>
                              <Select.ItemIndicator>
                                <Select.CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
                <Field.Error match={field.state.meta.errors.length > 0}>
                  {t(field.state.meta.errors?.[0]?.message ?? "")}
                </Field.Error>
              </Field.Root>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <Field.Root className={styles.fullWidth}>
                <Field.Label required>
                  {t("createRequest.form.descriptionLabel")}
                </Field.Label>
                <Field.Control
                  render={
                    <textarea
                      style={{
                        minHeight: "8rem",
                        resize: "vertical",
                        padding: "0.75rem",
                      }}
                    />
                  }
                  placeholder={t("createRequest.form.descriptionPlaceholder")}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: any) => field.handleChange(e.target.value)}
                />
                <Field.Error match={field.state.meta.errors.length > 0}>
                  {t(field.state.meta.errors?.[0]?.message ?? "")}
                </Field.Error>
              </Field.Root>
            )}
          />

          <div className={styles.actions}>
            <form.Subscribe selector={(state) => [state.isSubmitting]}>
              {(state) => {
                const [isSubmitting] = state;
                return (
                  <Button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    style={{ width: "100%" }}
                  >
                    {isSubmitting || isLoading
                      ? t("createRequest.form.submitting")
                      : t("createRequest.form.submitButton")}
                  </Button>
                );
              }}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
