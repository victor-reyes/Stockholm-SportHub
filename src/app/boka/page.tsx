import Form from "next/form";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Book() {
  return (
    <>
      <div className="max-w-xs m-auto">
        <h1>Search Available slots</h1>
        <Form action="" className="flex flex-col gap-4">
          <input
            type="search"
            name="place"
            placeholder="What place do you want to book?"
          />
          <input
            type="search"
            name="sport"
            placeholder="What activity do you want to book?"
          />
          <input type="date" name="date" />
          <input type="time" name="time" />
          <div className="flex gap-1 text-sm">
            {DAYS.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="weekdays"
                  value={day.toLowerCase()}
                />
                {day}
              </label>
            ))}
          </div>
        </Form>
      </div>
    </>
  );
}
