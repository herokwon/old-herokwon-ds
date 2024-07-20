import type { ContentWithElement, ContentWithId } from '..';

export type FloatingItem<Props = {}> = ContentWithId &
  ContentWithElement &
  Props;

export type FloatingItemGroup = {
  id: string;
  heading?: string;
  items: FloatingItem[];
};
