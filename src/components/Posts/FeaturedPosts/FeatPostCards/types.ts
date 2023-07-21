export interface FeatPostCardsTypes {
  key: string;
  uid?: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date?: string;
  metadata?: {
    date: string;
    slug: string;
  };
}
