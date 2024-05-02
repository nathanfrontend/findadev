import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CommandList, Command as CommandPrimitive } from "cmdk";
import { TAGS, FRAMEWORKS } from "@/data-access/FRAMEWORKS";
import { useState } from "react";
import { form } from "@/app/create-room/create-room-form";
import { UseFormReturn } from "react-hook-form";

type propsTags = {
  form: UseFormReturn<form>;
  edit?: boolean;
};

export function FancyMultiSelect({ form, edit }: propsTags) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const tags = form.getValues("tags");
  const [selected, setSelected] = useState<TAGS[]>(
    !edit ? [] : tags.map((tags) => ({ label: tags, value: tags, count: "" })),
  );
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((framework: TAGS) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
    const filter = form
      .getValues("tags")
      .filter((s: string) => s.toLowerCase() !== framework.value.toLowerCase());
    form.setValue("tags", filter, {
      shouldValidate: true,
    });
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
            const newSelected = [...form.getValues("tags")];
            newSelected.pop();
            form.setValue("tags", newSelected, {
              shouldValidate: true,
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = FRAMEWORKS.filter(
    (framework) => !framework.value.includes(inputValue),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select frameworks..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                        form.setValue(
                          "tags",
                          [...form.getValues("tags"), value],
                          {
                            shouldValidate: true,
                          },
                        );
                      }}
                      className={"cursor-pointer"}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
