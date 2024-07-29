"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useState } from "react";

const MUSEUMS = {
  tepapa: "Museum of New Zealand Te Papa Tongarewa",
  artchicago: "Art Institute of Chicago",
  bostonpubliclibrary: "Boston Public Library",
  libraryofcongress: "Library of Congress",
  birminghammuseumstrust: "Birmingham Museums Trust",
  europeana: "Europeana",
  nasa: "NASA",
};

export const Filters = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const museumParam = searchParams.get("museum");

  const handleCheck = async (newValue: string) => {
    if (newValue === selectedValue) {
      setSelectedValue(undefined);
      if (page) {
        return router.push(`${pathname}?page=${page}`);
      } else {
        return router.push(`${pathname}`);
      }
    }

    setSelectedValue(newValue);
    if (page) {
      router.push(`${pathname}?page=${page}&museum=${newValue}`);
    } else {
      router.push(`${pathname}?museum=${newValue}`);
    }
  };

  return (
    <div className="flex flex-col border p-2">
      <p className="mb-2 text-xl">Museums</p>
      <RadioGroup value={selectedValue}>
        {Object.entries(MUSEUMS).map(([museumKey, museumName]) => (
          <div className="flex items-center space-x-3" key={museumName}>
            <RadioGroupItem
              value={museumKey}
              id={`radio-${museumName}`}
              onClick={() => handleCheck(museumKey)}
              checked={museumKey === selectedValue}
            />
            <Label htmlFor={`radio-${museumName}`}>{museumName}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
