export type CakeCategory = "pound" | "infusion";

export type CakeFilterCategory = "all" | CakeCategory;

export interface CakeItem {
  name: string;
  type: CakeCategory;
  description: string;
}

export interface SavoryFeastItem {
  title: string;
  desc: string;
  serves: string;
}
