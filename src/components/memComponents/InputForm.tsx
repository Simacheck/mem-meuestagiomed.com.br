import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";


interface Props {
  formControl: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}
export const InputForm = ({
  formControl,
  type,
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
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={className}
              type={type ? type : "text"}
              placeholder={placeholder && placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};