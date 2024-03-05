"use client";

import { Delete } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormProps = {
  currentCountry: any;
  handleChange: (e: any) => void;
  refs: {
    countryRef: any;
    capitalRef: any;
  };
  changeIndex: (valid?: boolean) => void;
};

export const Form = ({
  currentCountry,
  handleChange,
  refs,
  changeIndex,
}: FormProps) => {
  return (
    <Card className="absolute right-1/2 bottom-10 translate-x-1/2">
      <CardContent className="p-5 space-y-3">
        <div className="flex flex-col">
          <Label htmlFor="name">Pays</Label>
          <Input
            ref={refs.countryRef}
            autoFocus
            disabled={currentCountry.name.valid}
            id="name"
            type="text"
            className="p-1 mt-1 text-black rounded-sm border disabled:bg-green-100 disabled:border disabled:border-green-500"
            value={currentCountry.name.value}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="capital">Capitale</Label>
          <Input
            ref={refs.capitalRef}
            disabled={currentCountry.capital.valid}
            id="capital"
            type="text"
            className="p-1 mt-1 text-black rounded-sm border disabled:bg-green-100 disabled:border disabled:border-green-500"
            value={currentCountry.capital.value}
            onChange={handleChange}
          />
        </div>
        <Button
          onClick={() => changeIndex()}
          variant="outline"
          className="flex mt-2 gap-1"
        >
          Passer au pays suivant Ctrl + <Delete strokeWidth={1.5} />
        </Button>
      </CardContent>
    </Card>
  );
};
