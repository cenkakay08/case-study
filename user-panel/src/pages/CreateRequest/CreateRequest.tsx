import { revalidateLogic, useForm } from "@tanstack/react-form";
import { z } from "zod";
import * as Field from "@/components/Field/Field";
import * as Select from "@/components/Select/Select";
import { Button } from "@/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createTaskAsync } from "@/store/slices/taskSlice";
import styles from "./CreateRequest.module.css";

const requestSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  category: z.string().min(1, "Kategori seçilmelidir"),
  priority: z.enum(["low", "normal", "high", "urgent"], "Öncelik seçilmelidir"),
});

const CATEGORIES = ["Satın Alma", "Teknik Destek", "İzin Talebi", "Diğer"];

const PRIORITIES = [
  { value: "low", label: "Düşük" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "Yüksek" },
  { value: "urgent", label: "Acil" },
];

const createRequestDefaultValues = {
  title: "",
  description: "",
  category: "",
  priority: "" as any,
};

export default function CreateRequest() {
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
          <h1 className={styles.title}>Talep Oluştur</h1>
          <p className={styles.subtitle}>İhtiyacınız olan desteği belirtin</p>
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
                <Field.Label required>Başlık</Field.Label>
                <Field.Control
                  placeholder="Talep başlığı..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <Field.Error match={field.state.meta.errors.length > 0}>
                  {field.state.meta.errors?.[0]?.message}
                </Field.Error>
              </Field.Root>
            )}
          />

          <form.Field
            name="category"
            children={(field) => (
              <Field.Root>
                <Field.Label required>Kategori</Field.Label>
                <Select.Root
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val ?? "")}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Kategori seçin" />
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
                              <Select.ItemText>{cat}</Select.ItemText>
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
                  {field.state.meta.errors?.[0]?.message}
                </Field.Error>
              </Field.Root>
            )}
          />

          <form.Field
            name="priority"
            children={(field) => (
              <Field.Root>
                <Field.Label required>Öncelik</Field.Label>
                <Select.Root
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange((val as any) ?? "")
                  }
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Öncelik seçin">
                      {
                        PRIORITIES.find((p) => p.value === field.state.value)
                          ?.label
                      }
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
                            <Select.Item key={p.value} value={p.value}>
                              <Select.ItemText>{p.label}</Select.ItemText>
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
                  {field.state.meta.errors?.[0]?.message}
                </Field.Error>
              </Field.Root>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <Field.Root className={styles.fullWidth}>
                <Field.Label required>Açıklama</Field.Label>
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
                  placeholder="Talebiniz hakkında detaylı bilgi verin..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: any) => field.handleChange(e.target.value)}
                />
                <Field.Error match={field.state.meta.errors.length > 0}>
                  {field.state.meta.errors?.[0]?.message}
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
                      ? "Oluşturuluyor..."
                      : "Talep Gönder"}
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
