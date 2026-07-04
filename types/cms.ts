export type CmsImage = {
  alt: string;
  height?: number;
  src: string;
  width?: number;
};

export type SeoFields = {
  description?: string;
  image?: CmsImage;
  title?: string;
};

export type CmsPage<TBlocks = unknown> = {
  id: string;
  slug: string;
  seo?: SeoFields;
  title: string;
  updatedAt?: string;
  blocks?: TBlocks[];
};
