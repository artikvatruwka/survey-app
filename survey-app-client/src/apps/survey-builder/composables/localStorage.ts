import { ref, watchEffect } from "vue";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storedValue = ref<T>(initialValue);

  if (localStorage.getItem(key)) {
    storedValue.value = JSON.parse(localStorage.getItem(key)!) as T;
  }

  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue.value));
  });

  return storedValue;
}
