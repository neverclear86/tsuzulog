import type Database from "tauri-plugin-sql-api"
import type { Diary } from "./types.ts"
import { arrayToParams } from "./query-util.ts"

export async function createDiary(connection: Database, diary: Diary) {
  await transaction(connection, async (conn) => {
    const diaryId = await insertDiary(conn, diary.content)
    if (diary.tags.length > 0) {
      const tagRecords = await fetchTagRecords(conn, diary.tags)
      const newTags = diary.tags.filter(
        (t) => !tagRecords.find((v) => v.name === t)
      )
      const tagIds = tagRecords.map((t) => t.id)
      if (newTags.length > 0) {
        const insertedTagIds = await insertTags(conn, newTags)
        tagIds.push(...insertedTagIds)
      }

      await insertDiaryTags(conn, diaryId, tagIds)
    }
  })
}

async function transaction<T>(
  conn: Database,
  queryFunc: (connection: Database) => Promise<T>
): Promise<T> {
  await conn.execute("BEGIN TRANSACTION createDiary")
  try {
    const result = await queryFunc(conn)
    await conn.execute("COMMIT TRANSACTION createDiary")
    return result
  } catch (e) {
    await conn.execute("ROLLBACK TRANSACTION createDiary")
    throw e
  }
}

async function insertDiary(conn: Database, content: string): Promise<number> {
  const { lastInsertId } = await conn.execute(
    "INSERT INTO diaries (content) VALUES ($1)",
    [content]
  )
  return lastInsertId
}

async function fetchTagRecords(
  conn: Database,
  tags: string[]
): Promise<{ id: number; name: string }[]> {
  return conn.select(
    `SELECT id, name FROM tags WHERE name in (${arrayToParams(tags)})`,
    tags
  )
}

async function insertTags(conn: Database, tags: string[]): Promise<number[]> {
  const insertedTagIds = (await conn.select(
    `INSERT INTO tags (name)
     VALUES ${arrayToParams(tags, { startsWith: "(", endsWith: ")" })}
     RETURNING id`,
    tags
  )) as { id: number }[]
  return insertedTagIds.map((v) => v.id)
}

async function insertDiaryTags(
  conn: Database,
  diaryId: number,
  tagIds: number[]
): Promise<void> {
  await conn.execute(
    `INSERT INTO diary_tags (diary_id, tag_id)
     VALUES ${arrayToParams(tagIds, { startsWith: "($1,", endsWith: ")", baseNumber: 2 })}`,
    [diaryId, ...tagIds]
  )
}
