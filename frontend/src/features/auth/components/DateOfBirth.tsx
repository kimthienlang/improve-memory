"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateOfBirthProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  error?: string;
}

export function DateOfBirth({ value, onChange, error }: DateOfBirthProps) {
  const [open, setOpen] = React.useState(false);
  const date = value ? new Date(value) : undefined;

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date">Date of birth</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "w-full justify-start font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive",
            )}
          >
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (selectedDate) {
                // Format to YYYY-MM-DD for the schema
                const formattedDate = format(selectedDate, "yyyy-MM-dd");
                onChange?.(formattedDate);
              } else {
                onChange?.(undefined);
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </Field>
  );
}
