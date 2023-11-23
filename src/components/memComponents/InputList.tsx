import { useState } from "react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { ShieldCloseIcon, X } from "lucide-react";

interface Props {
  formControl: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  maxL: number;
}
export const InputList = ({
  formControl,
  name,
  label,
  placeholder,
  description,
  className,
  maxL
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState<string[]>([]);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => {
        const addValue = (value: string) => {
          const novoObj = values;

          novoObj.push(value);

          setTwoStates(novoObj);

          console.log("valor novo", novoObj);

          return;
        };

        const setTwoStates = (values:any) => {
          setValues(values);
          field.onChange(values);
        }
        console.log(field.value ? field.value.length : 0)
        return (
          <FormItem className={className}>
            {label && <FormLabel htmlFor={name}>{label} ({field.value ? field.value.length :  0} / {maxL})</FormLabel>}

            <div className="rounded-lg border flex flex-col p-2 flex max-w-[20rem]">
              {values.length > 0 && <div className="flex gap-2 py-2 flex-wrap">
                {values?.map((x: string, i: number) => (
                  <Badge
                    variant={"outline"}
                    className="flex gap-3 min-w-[4rem] align-center"
                    aria-disabled
                    key={i}
                  >
                    {x}

                    <X className="w-6 p-1 cursor-pointer" onClick={() => {
                      const obj = values.filter(y => y != x)

                      setTwoStates(obj)

                    }}/>
                  </Badge>
                ))}
              </div>}
              <div className="flex gap-2 items-center ">
                <Input
                  type={"text"}
                  placeholder={placeholder && placeholder}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                  size={'sm'}
                  className="flex  justify-center"
                  disabled={field.value ? field.value.length >= maxL : false}
                  onClick={(e) => (e.preventDefault(), addValue(inputValue))}
                >
                  <p className="text-xs">
                    Adicionar
                  </p>
                </Button>
              </div>
            </div>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
