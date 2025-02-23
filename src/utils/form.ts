import { SelectInputOption } from "@/src/types";

export const generateSelectOptions = <T>(
  data: Array<T> = [],
  valueKey: keyof T,
  labelKey: keyof T,
  exraKeys?: (keyof T)[]
): SelectInputOption[] =>
  data.map((item) => ({
    value: item[valueKey as keyof T],
    label: item[labelKey as keyof T],
  })) as SelectInputOption[];
