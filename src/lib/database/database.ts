import TauriDatabase from "tauri-plugin-sql-api"
import type { Diary } from "./types.ts"
import { createDiary } from "./query.ts"

export class Database {
  private connection: TauriDatabase | undefined
  private dbFile: string = "tsuzulog.db"

  constructor() {}

  private async load() {
    return await TauriDatabase.load(`sqlite:${this.dbFile}`)
  }

  /**
   * save
   */
  public async save(diary: Diary) {
    this.connection ??= await this.load()
    if (diary.id == null) {
      console.time("create")
      await createDiary(this.connection, diary)
      console.timeEnd("create")
    }
  }
}
