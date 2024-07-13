export class Commit {
  public keyword: string = "";
  private _messages: string[] = [];

  public static getInstance() {}

  get messages() {
    return this._messages;
  }

  collect = (message: string) => this.messages.push(message);
}
