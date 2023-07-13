
export function useLocalStorage<T>(key: string) {
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return undefined
      return JSON.parse(item) as T
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const removeValue = () => {
    window.localStorage.removeItem(key)
  }

  return { getValue, setValue, removeValue }
}

export const OVOFLOW_TECHNICIAN_VISIT_KEY = 'ovoflow-technician-visit'
export const OVOFLOW_JOURNAL_KEY = 'ovoflow-journal'