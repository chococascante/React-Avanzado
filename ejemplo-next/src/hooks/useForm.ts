'use client';

import { useState, useCallback, ChangeEvent, FocusEvent, FormEvent } from 'react';

type FormValues = Record<string, unknown>;
type FormErrors = Record<string, string>;
type FormTouched = Record<string, boolean>;

interface UseFormConfig<T extends FormValues> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T) => void | Promise<void>;
}

/**
 * useForm — hook de formularios con useState (sin useReducer).
 * Maneja values, errors, touched e isSubmitting.
 */
export function useForm<T extends FormValues>({
  initialValues,
  validate = () => ({}),
  onSubmit,
}: UseFormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = e.target as HTMLInputElement;
      const { name, type } = target;
      const fieldValue =
        type === 'checkbox' ? target.checked : target.value;

      setValues((prev) => ({ ...prev, [name]: fieldValue } as T));
      setErrors((prev) => ({ ...prev, [name]: '' }));
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors = validate(values);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
        setValues(initialValues);
        setErrors({});
        setTouched({});
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        setErrors({ submit: message });
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit, initialValues]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  };
}
