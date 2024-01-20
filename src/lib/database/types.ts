export interface Diary {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  content: string
  tags: string[]
}

export interface Tag {
  id?: number
  name: string
}
