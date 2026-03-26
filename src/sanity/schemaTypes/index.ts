import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import blogPost from '../schemas/blogPost'
import project from '../schemas/project'
import pressArticle from '../schemas/pressArticle'
import certificate from '../schemas/certificate'
import experience from '../schemas/experience'
import review from '../schemas/review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, blogPost, project, pressArticle, certificate, experience, review],
}
