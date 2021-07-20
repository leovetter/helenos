import { Comment } from './comment.model'

export interface Media {
  id: number;
  name: string;
  path: string;
  size: number;
  creationDate: Date;
  updateDate: Date;
  type: string;
  isIntersecting: boolean;
  order: number;
  fromApi: boolean;
  api?: string;
  cover?: string;
  comments?: Array<Comment>;
}
