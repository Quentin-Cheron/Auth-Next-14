import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface CardStepInputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  isPending: boolean;
  control: any;
}

export function CardStepInput({
  name,
  label,
  type,
  placeholder,
  isPending,
  control,
}: CardStepInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              placeholder={placeholder}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface CardStepSelectProps {
  name: string;
  label: string;
  placeholder: string;
  fields: Array<string>;
  isPending: boolean;
  control: any;
}

export function CardStepSelect({
  name,
  label,
  placeholder,
  control,
  isPending,
  fields,
}: CardStepSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={isPending}
            onValueChange={(value) => field.onChange(value)}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {fields.map((field, index) => (
                <SelectItem key={index} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
