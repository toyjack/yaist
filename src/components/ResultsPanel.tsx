"use client";

import { settingsAtom, termAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { ResponseJson } from "@/types";

export default function ResultsPanel() {
  const [term] = useAtom(termAtom);
  const [settings, setSettings] = useAtom(settingsAtom);
  const [results, setResults] = useState<ResponseJson>();
  useEffect(() => {
    fetch(`/api/idsfind?term=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data as unknown as ResponseJson);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSettings({ ...settings, searchBtnLoading: false });
      });
  }, [term]);

  return (
    <div className="px-2 md:px-4 w-full flex flex-row flex-wrap gap-1 md:gap-4">
      {results?.results?.map((result) => (
        <CharacterCard key={result} character={result} />
      ))}
    </div>
  );
}
