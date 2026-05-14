export type BookModel = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  price: string;
  cover_url: string;
  short_description: string;
  long_description: string;
};

export type CartItem = {
  id: number;
  quantity: number;
};
