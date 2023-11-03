"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useAtom } from "jotai";
import { settingsAtom, termAtom } from "@/store";

export default function SearchPanel() {
  const [inputingTerm, setInputingTerm] = useState("");
  const [, setTerm] = useAtom(termAtom);
  const [settings,setSettings] = useAtom(settingsAtom)

  const handleDecompose = () => {};

  const hanldSearch = () => {
    setTerm(inputingTerm);
    setSettings({...settings,searchBtnLoading:true})
  };
  return (
    <div className="w-full">
      <div className="py-4 md:px-2 flex flex-col">
        <Input
          type="text"
          name="searching_term"
          label="部品と残り画数"
          labelPlacement="outside"
          description="部品と残り画数を入力してください"
          value={inputingTerm}
          onValueChange={setInputingTerm}
        />
        <div className="w-full flex justify-end gap-2 md:gap-4">
          <Button color="danger" onClick={handleDecompose} isLoading={settings.decomposeBtnLoading} isDisabled>分解</Button>
          <Button color="primary" onClick={hanldSearch} isLoading={settings.searchBtnLoading}>
            検索
          </Button>
        </div>
      </div>
    </div>
  );
}
