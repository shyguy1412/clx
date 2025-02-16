export interface OutStream {
  write(content: string, pos?: number): void;
}