"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ValueProps {
  value: string;
  label: string;
}

interface ComponenteProps {
  itens: ValueProps[];
  placeholder: string;
  width: string;
}

export function SelectFilter({ itens, placeholder, width }: ComponenteProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<ValueProps[] | any>();

  const validation = (obj: ValueProps) => {
    return values?.find((x: ValueProps) => x.value === obj.value);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`"w-full justify-between`}
        >
          {values?.length > 0
            ? values?.length > 2
              ? "Multiplos"
              : values?.map(
                  (value: ValueProps) =>{
                    console.log(value)
                    return `${value.label} ${values?.length > 1 ? "," : ""}`}
                )
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-full p-0 bg-white`}>
        <Command>
          <CommandInput placeholder={`Procure por ${placeholder}`} />
          <CommandEmpty>Não há opções.</CommandEmpty>
          <CommandGroup>
            {itens.map((framework) => (
              <CommandItem
                key={framework.label}
                onSelect={(currentValueLow) => {
                    const currentValue = currentValueLow.toLocaleUpperCase()
                    console.log(currentValue)
                  const validacao = values?.find(
                    (arr: ValueProps) =>
                      arr.label.toLocaleUpperCase() == currentValue
                  );

                  if (validacao) {
                    const newValues = values?.filter(
                      (el: ValueProps) =>
                        el.label.toLocaleUpperCase() !== currentValue
                    );

                    setValues(newValues);
                  } else {
                    const objSelecionado = itens.find(
                      (arr) => arr.label.toLocaleUpperCase() == currentValue
                    );
                    const novoObj = values ? values : [];
                    novoObj.push(objSelecionado);
                    console.log(novoObj)
                    setValues(novoObj);
                  }

                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    validation(framework) ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
