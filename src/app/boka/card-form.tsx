"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FACILITIES } from "@/data";
import Form from "next/form";
import { searchAction } from "./actions";
import { Combobox } from "./facility-combobox";
import { useState } from "react";
import { X } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type Facility = { id: string; text: string };
export function CardForm() {
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);

  return (
    <Card className="max-w-sm m-auto">
      <CardHeader>
        <CardTitle>Search Available slots</CardTitle>
        <CardDescription>
          Find available slots for your favorite activities in your favorite
          places.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          action={searchAction}
          id="search_form"
          className="flex flex-col gap-4"
        >
          <Input
            type="search"
            name="place"
            placeholder="What place do you want to book?"
          />
          <Combobox
            items={[...FACILITIES]}
            triggerText="Select facility"
            searchPlaceholder="Search facility..."
            emptyText="No facilities found"
            selectedItems={selectedFacilities}
            onItemsSelect={setSelectedFacilities}
          />
          <ul className="flex flex-wrap gap-1">
            {selectedFacilities.map((facility) => (
              <Button
                key={facility.id}
                size="sm"
                tw="h-1"
                className="text-[10px] h-5 px-1"
                onClick={() => {
                  setSelectedFacilities((prev) =>
                    prev.filter((f) => f.id !== facility.id),
                  );
                }}
              >
                <X />
                {facility.text}
                <input name="facility" value={facility.text} type="hidden" />
              </Button>
            ))}
          </ul>
          <Input
            type="search"
            name="sport"
            placeholder="What activity do you want to book?"
          />
          <Input type="date" name="date" />
          <Input type="time" name="time" />
          <div className="flex gap-1 text-sm">
            {DAYS.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <Input
                  type="checkbox"
                  name="weekdays"
                  value={day.toLowerCase()}
                />
                {day}
              </label>
            ))}
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild>
          <input type="submit" form="search_form" value="Search" />
        </Button>
      </CardFooter>
    </Card>
  );
}
