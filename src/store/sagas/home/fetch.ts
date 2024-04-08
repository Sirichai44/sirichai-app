export function* helloSaga() {
  console.log('Hello Sagas!');
}

export function* IntervalSliceName() {
  const name = 'Software Developer';

  for (let index = 0; index < name.length; index++) {
    const element = name[index];
    console.log(element);
  }
}
