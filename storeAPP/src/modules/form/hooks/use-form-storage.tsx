"use client";

import { FocusEvent, useCallback, useEffect, useMemo } from "react";
import {
  FieldValues,
  UseFormReturn,
  UseFormProps,
  useForm,
  UseFormRegister,
  DefaultValues,
  UseFormSetValue,
} from "react-hook-form";

import { persistOnSessionStorage, getPersistedValue } from "./storage";

const PACKAGE_NAME = "@store";

type UseFormStorageProps<T extends FieldValues> = {
  instance: string;
} & UseFormProps<T>;

type UseFormReturnProps<T extends FieldValues> = UseFormProps<T> &
  UseFormReturn<T>;

export function useFormStorage<T extends FieldValues>(
  props: UseFormStorageProps<T>
): UseFormReturnProps<T> {
  const { instance, defaultValues: defaultValuesForm, ...rest } = props;

  const KEY = `${PACKAGE_NAME}:${instance}`;

  const getStoreValues = useCallback(() => {
    try {
      const store = getPersistedValue(KEY);
      if (!store) return {};
      return JSON.parse(store);
    } catch (error) {
      console.error("Erro ao parsear valores do storage:", error);
      return {};
    }
  }, [KEY]);

  const defaultValues = useMemo(() => {
    const storeValues = getStoreValues();

    const cleanStoreValues = Object.keys(storeValues).reduce((prev, key) => {
      const value = storeValues[key as keyof typeof storeValues];
      // Garante que o valor não seja undefined, null ou NaN
      if (value !== undefined && value !== null && !Number.isNaN(value)) {
        return {
          ...prev,
          [key]: value,
        };
      }
      return prev;
    }, {});

    const values = { ...defaultValuesForm, ...cleanStoreValues };

    return Object.keys(values).reduce((current, fieldName) => {
      const value = values[fieldName as keyof typeof values];
      // Garante que o valor não seja undefined, null ou NaN
      if (value !== undefined && value !== null && !Number.isNaN(value)) {
        return {
          ...current,
          // @ts-ignore
          [fieldName]: value,
        };
      }
      return current;
    }, {} as DefaultValues<T>);
  }, [getStoreValues, defaultValuesForm]);

  useEffect(() => {
    try {
      persistOnSessionStorage(KEY, JSON.stringify(defaultValues));
    } catch (error) {
      console.error("Erro ao persistir valores no storage:", error);
    }
  }, [defaultValues, KEY]);

  const form = useForm<T>({
    ...rest,
    defaultValues,
  });
  const { formState, setValue } = form;
  const { dirtyFields } = formState;

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    // @ts-ignore
    if (dirtyFields[fieldName] && fieldValue !== undefined && fieldValue !== null) {
      try {
        const values = getStoreValues();

        const newValues = {
          ...values,
          [fieldName]: fieldValue,
        };

        persistOnSessionStorage(KEY, JSON.stringify(newValues));
      } catch (error) {
        console.error("Erro ao persistir valor no blur:", error);
      }
    }
  }

  const register: UseFormRegister<T> = (name, options) => {
    return form.register(name, {
      ...options,
      onBlur: handleBlur,
    });
  };

  form.control.register = register;

  const updateValue: UseFormSetValue<T> = (fieldName, value, options) => {
    try {
      const values = getStoreValues();

      const newValues = {
        ...values,
        [fieldName]: value,
      };

      persistOnSessionStorage(KEY, JSON.stringify(newValues));
      setValue(fieldName, value, options);
    } catch (error) {
      console.error("Erro ao atualizar valor:", error);
      setValue(fieldName, value, options);
    }
  };

  return {
    ...form,
    setValue: updateValue,
    register,
  };
}
