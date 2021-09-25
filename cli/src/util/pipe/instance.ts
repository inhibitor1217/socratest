export default function instance<Class, Args>(clazz: new (args: Args) => Class) {
  return (args: Args) => new clazz(args)
}
