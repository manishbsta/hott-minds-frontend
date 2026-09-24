export type CakeCategory = "pound" | "infusion";

export type CakeFilterCategory = "all" | CakeCategory;

export interface CakeItem {
  name: string;
  type: CakeCategory;
  flavor: string;
  description: string;
  notes?: string;
  tag?: string;
}

export interface SavoryFeastItem {
  title: string;
  desc: string;
  serves: string;
}
