import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { searchAction } from "./actions";
import { Combobox } from "./facility-combobox";
import { FACILITIES } from "@/data";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Book() {
  return (
    <main className="p-4">
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
            <Combobox items={[...FACILITIES]} />
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
    </main>
  );
}
