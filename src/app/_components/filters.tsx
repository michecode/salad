"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const MUSEUMS = {
  tepapa: 'Museum of New Zealand Te Papa Tongarewa',
  artchicago: 'Art Institute of Chicago',
  bostonpubliclibrary: 'Boston Public Library',
  libraryofcongress: 'Library of Congress',
  birminghammuseumstrust: 'Birmingham Museums Trust',
  europeana: 'Europeana',
  nasa: 'NASA',
}

export const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const museumParam = searchParams.get('museum');

  const handleCheck = async (event: ChangeEvent<HTMLInputElement>) => {
    if (page) {
      router.push(`${pathname}?page=${page}&museum=${event.target.value}`)
    } else {
      router.push(`${pathname}?museum=${event.target.value}`);
    }
  }

  return (
    <div className="border flex flex-col">
      <p>Museums</p>
      {Object.entries(MUSEUMS).map(([ museumKey, museumName ]) => (
        <div className="flex space-x-3" key={museumName}>
          <input type="radio" onChange={handleCheck} value={museumKey} />
          <p>{museumName}</p>
        </div>
      ))}
    </div>
  );
};