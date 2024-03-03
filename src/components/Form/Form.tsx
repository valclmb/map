"use client";

import { Delete } from "lucide-react";

type FormProps = {
  currentCountry: any;
  handleChange: (e: any) => void;
  refs: {
    countryRef: any;
    capitalRef: any;
  };
};

export const Form = ({ currentCountry, handleChange, refs }: FormProps) => {
  return (
    <section className="absolute right-1/2 bottom-10 translate-x-1/2 m-auto border rounded-md shadow-md p-5 w-96">
      <div className="flex flex-col">
        <label htmlFor="name">Pays</label>
        <input
          ref={refs.countryRef}
          autoFocus
          disabled={currentCountry.name.valid}
          id="name"
          type="text"
          className="p-1 text-black rounded-sm border disabled:bg-green-100 disabled:border disabled:border-green-500"
          value={currentCountry.name.value}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="capital">Capitale</label>
        <input
          ref={refs.capitalRef}
          disabled={currentCountry.capital.valid}
          id="capital"
          type="text"
          className="p-1 text-black rounded-sm border disabled:bg-green-100 disabled:border disabled:border-green-500"
          value={currentCountry.capital.value}
          onChange={handleChange}
        />
      </div>
      <div className="flex mt-2 gap-1">
        Ctrl + <Delete strokeWidth={1.5} /> pour passer au pays suivant
      </div>
    </section>
  );
};
