import { PaymentForm } from "./types";

const STORAGE_KEY = "payment_forms";

export function saveForms(forms: PaymentForm[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  }
}

export function getForms(): PaymentForm[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function getFormById(id: string): PaymentForm | undefined {
  const forms = getForms();
  return forms.find((f) => f.id === id);
}

export function addForm(form: PaymentForm): void {
  const forms = getForms();
  forms.push(form);
  saveForms(forms);
}

export function deleteForm(id: string): void {
  const forms = getForms();
  saveForms(forms.filter((f) => f.id !== id));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}
