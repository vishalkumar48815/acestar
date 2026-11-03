/** Result shape shared by admin Server Actions and the forms that call them. */
export type FieldErrors = Partial<Record<string, string[]>>;
export type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors };

export const idle: FormState = { status: "idle" };
