type StreamingContent = {
  id: number;
  name: string;
  genre: string;
  type: "MOVIE" | "SERIE";
  views: number;
  rating: number;
  streamingMetadata: StreamingMetadata;
};

type StreamingMetadata = {
  id: string;
  user: {
    id: number;
    email: string;
  };
  score: number;
  viewed: boolean;
};

type ContentType = "movies" | "series" | "all";

type Field = "name" | "genre" | "type" | "rating" | "views";
