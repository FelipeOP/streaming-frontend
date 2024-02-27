"use server";

import { getAuthCredentials } from "../auth/actions";

function mapContent(data: any, email: string | undefined): StreamingContent {
  const { id, name, genre, type, views, rating, streamingMetadata } = data;
  const metadata = streamingMetadata.find(
    (metadata: any) => metadata.user.email === email
  );
  return {
    id,
    name,
    genre,
    type,
    views,
    rating,
    streamingMetadata: metadata,
  };
}

export async function getAllByType(
  type: "movies" | "series" | "all",
  order: Field,
  direction: "ASC" | "DESC"
): Promise<StreamingContent[]> {
  const endpoint = `http://localhost:8080/api/v1/streaming/${type}`;
  const url = new URL(endpoint);
  url.searchParams.append("orderBy", order);
  url.searchParams.append("direction", direction);

  const { token, email } = await getAuthCredentials();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const status = response.status;
  if (status === 403) {
    return [];
  }
  const data: [] = await response.json();
  return data.map((row) => {
    return mapContent(row, email);
  });
}

export async function getRandomContent(
  type: "movie" | "serie"
): Promise<StreamingContent[]> {
  const endpoint = `http://localhost:8080/api/v1/streaming/random-${type}`;

  const { token, email } = await getAuthCredentials();
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const status = response.status;

  if (status === 403) {
    return [];
  }
  const data = await response.json();
  return [mapContent(data, email)];
}

export async function searchContentBy(
  field: Field,
  value: string
): Promise<StreamingContent[]> {
  const endpoint = `http://localhost:8080/api/v1/streaming/search`;
  const url = new URL(endpoint);
  url.searchParams.append("field", field);
  url.searchParams.append("value", value);

  const { token, email } = await getAuthCredentials();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const status = response.status;
  if (status === 403) {
    return [];
  }
  const data: [] = await response.json();
  return data.map((row) => {
    return mapContent(row, email);
  });
}

export async function changeViewed(
  content: StreamingContent,
  viewed: boolean
): Promise<StreamingContent> {
  const endpoint = "http://localhost:8080/api/v1/streaming/mark";
  const { token, userId, email } = await getAuthCredentials();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      contentId: content.id,
      userId: userId,
      viewed,
    }),
  });

  const status = response.status;
  if (status === 403) {
    return content;
  }

  const updatedContent = await response.json();
  return mapContent(updatedContent, email);
}

export async function changeScore(
  content: StreamingContent,
  score: number
): Promise<StreamingContent> {
  const endpoint = "http://localhost:8080/api/v1/streaming/rate";
  const { token, userId, email } = await getAuthCredentials();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      contentId: content.id,
      userId: userId,
      score,
    }),
  });

  const status = response.status;
  if (status === 403) {
    return content;
  }

  const updatedContent = await response.json();
  return mapContent(updatedContent, email);
}
