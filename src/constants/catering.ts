import type { CakeItem, SavoryFeastItem } from "@/types";

export const CAKES: CakeItem[] = [
  // Pound Cakes
  {
    name: "Classic Lemon Pound Cake",
    type: "pound",
    description:
      "Tender, moist crumb bursting with fresh lemon zest and coated in our signature sweet citrus glaze.",
  },
  {
    name: "Rich Vanilla Bean Pound Cake",
    type: "pound",
    description:
      "Old-fashioned golden crust with a fragrant, velvety vanilla crumb that melts in your mouth.",
  },
  {
    name: "Southern Golden Butter Pound Cake",
    type: "pound",
    description:
      "Rich, dense, and baked with pure sweet cream butter. Perfectly crisp outer crust and buttery interior.",
  },
  {
    name: "Sweet Potato Pound Cake",
    type: "pound",
    description:
      "Infused with roasted sweet potatoes, warm cinnamon, nutmeg, and drizzled with a light spiced glaze.",
  },
  // Infusion Cakes
  {
    name: "Hennessy Rum Infusion Cake",
    type: "infusion",
    description:
      "Slow-baked bundt soaked with a premium Hennessy reduction, aged rum syrup, and caramelized pecan crumb.",
  },
  {
    name: "Caribbean Coffee Rum Cake",
    type: "infusion",
    description:
      "Deep espresso and Jamaican dark rum fusion, glazed with dark sugar and coffee liqueur drizzle.",
  },
  {
    name: "Midnight Mocha Rum Cake",
    type: "infusion",
    description:
      "Dutch cocoa fudge crumb soaked in dark mocha rum syrup, finished with chocolate ganache drops.",
  },
];

export const SAVORY_FEASTS: SavoryFeastItem[] = [
  {
    title: "Savory Grilled & BBQ Chicken",
    desc: "Slow-marinated chicken quarters or wings fire-grilled and brushed with house sweet & tangy barbecue glaze.",
    serves: "Half Pan (10-12 guests) / Full Pan (20-25 guests)",
  },
  {
    title: "Smoked Tender Barbecue Ribs",
    desc: "Fall-off-the-bone smoked pork ribs seasoned with our secret dry rub and caramelized under open flame.",
    serves: "Half Pan / Full Pan",
  },
  {
    title: "Southern Baked Mac & Cheese",
    desc: "Four cheeses melted into creamy elbow pasta with a golden baked cheddar crust on top.",
    serves: "Half Pan / Full Pan",
  },
  {
    title: "Country Green Beans & Collard Greens",
    desc: "Slow-simmered greens seasoned with smoked turkey, garlic, onions, and flavorful broth.",
    serves: "Half Pan / Full Pan",
  },
  {
    title: "Golden Sweet Cornbread & Potato Salad",
    desc: "Fresh baked honey-butter cornbread squares served alongside our homemade creamy mustard-potato salad.",
    serves: "By the dozen / Pan",
  },
];
