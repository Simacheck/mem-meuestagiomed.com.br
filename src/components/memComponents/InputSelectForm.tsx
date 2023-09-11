import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
export const InputSelectForm = ({
  formControl,
  itens,
  name,
  label,
  placeholder,
  description,
  className,
}: Props) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ? placeholder : ""} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white max-h-[150px] overflow-auto">
              {itens?.map((x) => (
                <SelectItem key={x.value} value={x.value}>
                  {x.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
