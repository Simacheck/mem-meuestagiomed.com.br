"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface OptionsProps {
  value: string;
  label: string;
}

interface Props {
  formControl: any;
  name: string;
  label?: string;
  itens: OptionsProps[];
  placeholder?: string;
  description?: string;
  className?: string;
}
export const InputMultiSelectForm = ({
  formControl,
  itens,
  name,
  label,
  placeholder,
  description,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => {

        const validation = (obj: OptionsProps) => {
            return field.value?.find(
              (x: OptionsProps) => x.value === obj.value
            );
        };

        return (
          <FormItem className={cn(className, 'h-full')}>
            {label && (
              <FormLabel htmlFor={name} className="p-0 m-0">
                {label}
              </FormLabel>
            )}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                asChild
                className="w-full m-0 flex-wrap h-full gap-2"
              >
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`"w-full justify-between`}
                >
                  <div className="max-w-[80%] flex flex-wrap gap-2">
                    {field.value?.length > 0 ? (
                      field.value?.map((value: any) => {
                        return (
                          <Badge key={value.value} className="mr-1">
                            {value.label}
                          </Badge>
                        );
                      })
                    ) : placeholder ? (
                      placeholder
                    ) : (
                      <span className="w-full">{}</span>
                    )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={`w-full min-w-[20rem] p-0 bg-white`}
                align="start"
              >
                <Command>
                  <CommandInput placeholder={`Procure por ${placeholder}`} />
                  <CommandEmpty>Não há opções.</CommandEmpty>
                  <CommandGroup>
                    {itens.map((framework) => (
                      <CommandItem
                        key={framework.label}
                        onSelect={(currentValueLow) => {
                          const currentValue =
                            currentValueLow.toLocaleUpperCase();
                          const validacao = field?.value
                            ? field.value?.find(
                                (arr: any) =>
                                  arr.label.toLocaleUpperCase() == currentValue
                              )
                            : null;

                          if (validacao) {
                            const newValues = field.value?.filter(
                              (el: any) =>
                                el.label.toLocaleUpperCase() !== currentValue
                            );

                            field.onChange(newValues);
                          } else {
                            const objSelecionado = itens.find(
                              (arr) =>
                                arr.label.toLocaleUpperCase() == currentValue
                            );
                            const novoObj = field.value ? field.value : [];
                            novoObj.push(objSelecionado);
                            field.onChange(novoObj);
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
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );}}
    />
  );
};
