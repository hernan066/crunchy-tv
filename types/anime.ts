export interface AnimeItem {
  _id?: string;
  id: string;
  title: string;
  cover: string;
  synopsis?: string;
  chapter?: number;
  type?: string;
  position?: number;
  year?: number;
  url?: string;
  rating?: number;
  episodes?: number;
  date?: string | Date;
  genres?: [string];
}
