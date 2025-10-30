"use client";

export class FakeStorage {
  static getItem(key: string) {
    // @ts-ignore
    return this[key];
  }

  static setItem(key: string, value: string) {
    // @ts-ignore
    this[key] = value;
  }

  static removeItem(key: string) {
    // @ts-ignore
    delete this[key];
  }
}

export function persistOnSessionStorage(key: string, value?: string) {
  if (typeof window === "undefined") return;

  const storage = window["sessionStorage"]
    ? window.sessionStorage
    : FakeStorage;

  if (!value) {
    return storage.removeItem(key);
  }

  storage.setItem(
    key,
    typeof value !== "string" ? JSON.stringify(value) : value
  );
}

export function getPersistedValue(key: string | string[]): any {
  if (typeof window === "undefined") return;

  const storage = window["sessionStorage"]
    ? window.sessionStorage
    : FakeStorage;

  if (Array.isArray(key)) {
    return key.reduce((acc, k) => acc || getPersistedValue(k), "");
  } else {
    const valueFromStorage = storage.getItem(key);

    return valueFromStorage ?? undefined;
  }
}

export function clearFromStorage(key: string) {
  if (typeof window === "undefined") return;

  const storage = window["sessionStorage"]
    ? window.sessionStorage
    : FakeStorage;

  storage.removeItem(key);
}
