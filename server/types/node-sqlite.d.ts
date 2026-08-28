declare module "node:sqlite" {
  export type SQLInputValue = string | number | bigint | Buffer | null | undefined;

  export class StatementSync {
    run(...params: SQLInputValue[]): { lastInsertRowid: number | bigint; changes: number | bigint };
    get(...params: SQLInputValue[]): Record<string, unknown> | undefined;
    all(...params: SQLInputValue[]): Record<string, unknown>[];
  }

  export class DatabaseSync {
    constructor(location: string, options?: { open?: boolean });
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
