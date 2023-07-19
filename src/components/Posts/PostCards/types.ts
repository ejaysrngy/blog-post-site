export interface PostCardsTypes {
  date: string;
  excerpt: string;
  image: string;
  key?: any;
  title: string;
  slug: string;
  content: string;
  documentKey?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}
