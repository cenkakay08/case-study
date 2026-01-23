import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Field, Select, Button, Tooltip } from "@case-study/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createTaskAsync } from "@/store/slices/taskSlice";
import { TASK_PRIORITY } from "@/api/tasks/taskController";
import styles from "./CreateTask.module.css";
import { useTranslation } from "react-i18next";

const requestSchema = z.object({
  title: z.string().min(3, "createTask.validation.titleMin"),
  description: z.string().min(10, "createTask.validation.descriptionMin"),
  category: z.string().min(1, "createTask.validation.categoryRequired"),
  priority: z.enum(
    [
      TASK_PRIORITY.LOW,
      TASK_PRIORITY.NORMAL,
      TASK_PRIORITY.HIGH,
      TASK_PRIORITY.URGENT,
    ] as const,
    {
      message: "createTask.validation.priorityRequired",
    },
  ),
});

const CATEGORIES = ["purchase", "technical_support", "leave_request", "other"];

const PRIORITIES = [
  TASK_PRIORITY.LOW,
  TASK_PRIORITY.NORMAL,
  TASK_PRIORITY.HIGH,
  TASK_PRIORITY.URGENT,
] as const;

const createRequestDefaultValues = {
  title: "",
  description: "",
  category: "",
  priority:
    TASK_PRIORITY.NORMAL as (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY],
};

export default function CreateTask() {
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
          <h1 className={styles.title}>{t("createTask.title")}</h1>
          <p className={styles.subtitle}>{t("createTask.subtitle")}</p>
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
                  {t("createTask.form.titleLabel")}
                </Field.Label>
                <Field.Control
                  placeholder={t("createTask.form.titlePlaceholder")}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <Field.Error
                  match={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
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
                  {t("createTask.form.categoryLabel")}
                </Field.Label>
                <Select.Root
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val ?? "")}
                >
                  <Select.Trigger>
                    <Select.Value
                      placeholder={t("createTask.form.categoryPlaceholder")}
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
                <Field.Error
                  match={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
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
                  {t("createTask.form.priorityLabel")}
                </Field.Label>
                <Select.Root
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange(val ?? TASK_PRIORITY.NORMAL)
                  }
                >
                  <Select.Trigger>
                    <Select.Value
                      placeholder={t("createTask.form.priorityPlaceholder")}
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
                <Field.Error
                  match={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
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
                  {t("createTask.form.descriptionLabel")}
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
                  placeholder={t("createTask.form.descriptionPlaceholder")}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <Field.Error
                  match={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  {t(field.state.meta.errors?.[0]?.message ?? "")}
                </Field.Error>
              </Field.Root>
            )}
          />

          <div className={styles.actions}>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => {
                return (
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger
                        render={(props, triggerState) => (
                          <span {...props} {...triggerState} tabIndex={-1}>
                            <Button
                              type="submit"
                              data-variant="success"
                              disabled={!canSubmit || isSubmitting || isLoading}
                              style={{ width: "100%" }}
                            >
                              {isSubmitting || isLoading
                                ? t("createTask.form.submitting")
                                : t("createTask.form.submitButton")}
                            </Button>
                          </span>
                        )}
                      />
                      <Tooltip.Portal>
                        <Tooltip.Positioner>
                          <Tooltip.Popup>
                            <Tooltip.Arrow />
                            {canSubmit
                              ? t("createTask.form.submitButton")
                              : t("common.formInvalid")}
                          </Tooltip.Popup>
                        </Tooltip.Positioner>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                );
              }}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
