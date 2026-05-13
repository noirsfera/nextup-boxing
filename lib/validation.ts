const EMAIL_REGEX =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i

const MAX_EMAIL_LENGTH = 320

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export function isValidEmail(value: string) {
  const normalizedValue = normalizeEmail(value)

  return (
    normalizedValue.length > 0 &&
    normalizedValue.length <= MAX_EMAIL_LENGTH &&
    EMAIL_REGEX.test(normalizedValue)
  )
}
