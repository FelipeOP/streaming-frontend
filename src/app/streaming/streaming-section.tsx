"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JSX, SVGProps, useState } from "react";
import {
  changeScore,
  changeViewed,
  getAllByType,
  getRandomContent,
  searchContentBy,
} from "./actions";
import { Button } from "@/components/ui/button";

export default function StreamingSection({
  data,
}: Readonly<{
  data: StreamingContent[];
}>) {
  const [streamingContent, setStreamingContent] =
    useState<StreamingContent[]>(data);
  const [type, setType] = useState<ContentType>("all");
  const [order, setOrder] = useState<Field>("name");
  const [direction, setDirection] = useState<"ASC" | "DESC">("ASC");
  const [searchingField, setSearchingField] = useState<Field>("name");

  const onSearch = async (field: Field, value: string) => {
    const response = await searchContentBy(field, value);
    setStreamingContent(response);
  };

  const onChangeOrder = async (order: Field) => {
    const response = await getAllByType(type, order, direction);
    setOrder(order);
    setStreamingContent(response);
  };

  const onChangeSearchField = async (field: Field) => {
    setSearchingField(field);
  };

  const onRequest = async (type: ContentType) => {
    const response = await getAllByType(type, order, direction);
    setType(type);
    setStreamingContent(response);
  };

  const onRandomRequest = async (type: "movie" | "serie") => {
    const response = await getRandomContent(type);
    setStreamingContent(response);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-2 py-6 px-6 md:px-8">
          <div className="grid gap-1">
            <a href="/">
              <h1 className="text-4xl font-bold">Mis series y películas</h1>
            </a>
            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
              Mantén una lista de seguimiento de las series & películas que ves
              y deja tu calificación.
            </p>
          </div>
          <div className="ml-auto flex gap-4 md:gap-8">
            <div className="flex items-center rounded-lg border">
              <FilterIcon className="w-4 h-4 ml-2 mr-2 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-[150px] text-xs"
                placeholder="Buscar"
                type="search"
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  onSearch(searchingField, value);
                }}
              />
              <Select onValueChange={onChangeSearchField}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="⚙️" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="genre">Género</SelectItem>
                  <SelectItem value="type">Tipo</SelectItem>
                  <SelectItem value="rating">Puntaje</SelectItem>
                  <SelectItem value="views">Vistas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center rounded-lg border">
              <Button
                className="rounded-lg"
                onClick={() => {
                  setDirection(direction === "ASC" ? "DESC" : "ASC");
                }}
              >
                {direction === "ASC" ? <SortIconAsc /> : <SortIconDesc />}
              </Button>

              <Select onValueChange={onChangeOrder}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="genre">Género</SelectItem>
                  <SelectItem value="type">Tipo</SelectItem>
                  <SelectItem value="rating">Puntaje</SelectItem>
                  <SelectItem value="views">Vistas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select onValueChange={onRequest}>
              <SelectTrigger className="w-[150px] bg-primary text-white">
                <SelectValue placeholder="Todo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Mostrar todo</SelectItem>
                <SelectItem value="movies">Películas</SelectItem>
                <SelectItem value="series">Series</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={onRandomRequest}>
              <SelectTrigger className="w-[65px]">
                <SelectValue placeholder="⚔️" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="movie">Película</SelectItem>
                <SelectItem value="serie">Serie</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[700px] w-auto rounded-md border">
            <div className="flex flex-col gap-4 p-4">
              {streamingContent?.map((content) => (
                <CardColumn key={content.id} {...content} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function CardColumn(originalContent: StreamingContent) {
  const [content, setContent] = useState<StreamingContent>(originalContent);
  const [score, setScore] = useState<number>(
    content.streamingMetadata?.score || 0
  );
  const [viewed, setViewed] = useState<boolean>(
    content.streamingMetadata?.viewed || false
  );

  const onChangeViewed = async () => {
    setViewed(!viewed);
    const newContent = await changeViewed(content, !viewed);
    setContent(newContent);
  };

  const onChangeScore = async (value: string) => {
    const number = parseInt(value);
    setScore(number);
    const newContent = await changeScore(content, number);
    setContent(newContent);
  };

  return (
    <div className="flex items-center gap-4">
      <Image
        alt="Avatar"
        height={40}
        className="rounded-full"
        src={`https://ui-avatars.com/api/?name=${content.name.replace(
          " ",
          "+"
        )}&background=random&color=fff&size=40&rounded=true&bold=true`}
        width={40}
      />

      <div className="flex-1 border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold">{content.name}</h3>
          <small className="text-xs text-gray-500 dark:text-gray-400">
            {content.type}
          </small>
        </div>
        <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
          {content.genre}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <p className="text-xs">{content.rating}</p>
          </div>
          <p className="text-xs ml-auto text-gray-500 dark:text-gray-400">
            {content.views} vistas
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Select onValueChange={onChangeScore}>
            <SelectTrigger className="w-[65px]">
              <SelectValue placeholder={score} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Switch
          className="ml-auto shrink-0"
          checked={viewed}
          onCheckedChange={onChangeViewed}
        />
      </div>
    </div>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function FilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SortIconAsc() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M20 8h-5" />
      <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
      <path d="M15 14h5l-5 6h5" />
    </svg>
  );
}

function SortIconDesc() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
      <path d="M15 4h5l-5 6h5" />
      <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
      <path d="M20 18h-5" />
    </svg>
  );
}
