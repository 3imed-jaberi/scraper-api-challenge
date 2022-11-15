export class RenderUIException extends Error {
  constructor(error: unknown) {
    super();
    this.name = 'RenderUIException';
    this.message = 'RenderUI failed to execute for some reason!';
    this.stack = error?.toString();
  }
}
