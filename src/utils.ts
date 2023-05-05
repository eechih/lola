export const sleep = async (milliseconds: number = 1000): Promise<void> => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, milliseconds)
  })
}
