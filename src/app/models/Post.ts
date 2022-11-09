import {Comment} from './Comment';

export interface Post {
  id?: number;
  title: string;
  caption: string;
  image?: File;
  likes?: number;
  userLiked?: string[];
  comment?: Comment [];
  username?: string;
}
