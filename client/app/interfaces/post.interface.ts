export interface IPost {
  id: string;
  pst_title: string;
  pst_slug: string;
  pst_excerpt: string;
  pst_thumbnail: string;
  pst_tags: Array<string>;
  pst_views: number;
  updatedAt: string;
  createdAt: string;
}

export interface IPostDetail extends IPost {
  pst_content: string;
}
