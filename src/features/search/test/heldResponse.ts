export function heldResponse() {
  let release: (response: Response) => void = () => undefined
  const response = new Promise<Response>((resolve) => {
    release = resolve
  })
  return { response, release }
}
