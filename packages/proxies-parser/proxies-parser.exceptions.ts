export class ProxiesParserInvalidChainingLoadException extends Error {
  constructor() {
    super();
    this.name = 'ProxiesParserInvalidChainingLoadException';
    this.message =
      'Before running the `parse` method, make sure to invoke the `load` method first!';
  }
}
