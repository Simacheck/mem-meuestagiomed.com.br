import { ChangeEvent, useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = () => reject(new Error("error on tranform to base64"));
  });
};


interface Props {
  formControl: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  accept?: string;
}
export const InputImageForm = ({
  formControl,
  accept,
  name,
  label,
  placeholder,
  description,
  className,
}: Props) => {
  const [base64, setBase64] = useState<string | null>(null);
  const handleChangeInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const files = target.files;

    if (!files) return;

    const file = files[0];

    try {
      const base64File = await convertToBase64(file);
      setBase64(base64File);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Input
              name={"picture"}
              type="file"
              accept={accept}
              onChange={handleChangeInput}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};