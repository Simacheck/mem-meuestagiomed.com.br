import { ChangeEvent } from "react";
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


interface Props {
  formControl: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

const convertToBase64 = async (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = () => reject(new Error("error on tranform to base64"));
  });
};


export const InputDocForm = ({
  formControl,
  name,
  label,
  description,
  className,
}: Props) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Input
              name={"picture"}
              type="file"
              accept="application/pdf"
              onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                const { target } = event;
                const files = target.files;

                if (!files) return;

                const file = files[0];

                try {
                  const base64File = await convertToBase64(file);
                  field.onChange(base64File);
                } catch (e) {
                  console.log(e);
                }
              }}
            />
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );}}
    />
  );
};
