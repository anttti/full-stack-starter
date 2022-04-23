import type { GetType } from 'purify-ts'
import { string } from 'purify-ts'
import { Interface } from 'purify-ts-extra-codec'

import { primaryKey, foreignKey } from './primitives'

const PostCodec = Interface({
  postId: primaryKey,
  title: string,
  body: string,
  authorId: foreignKey,
})
const PostSchema = PostCodec.schema()
type Post = GetType<typeof PostCodec>

export { PostCodec, PostSchema }

export type { Post }
