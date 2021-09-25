export default function value<T>(value: T) {
  return (...args: any[]) => value
}
