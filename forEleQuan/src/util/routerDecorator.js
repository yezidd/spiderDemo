export default function routerDecorator(path) {
  console.log(path);
  return (WrapComponent) => {
    console.log(WrapComponent.name);
  }
}