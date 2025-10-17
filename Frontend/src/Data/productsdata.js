import { getAllProducts, getProductsByCategory } from "../api/Productapi";

//  This will act like your old static object, but it fetches from backend now
const products = {
  all: async () => await getAllProducts(),
  tech: async () => await getProductsByCategory("tech"),
  fashion: async () => await getProductsByCategory("fashion"),
  baby: async () => await getProductsByCategory("baby"),
  fast: async () => await getProductsByCategory("fast"),
  dinner: async () => await getProductsByCategory("dinner"),
  rollbacks: async () => await getProductsByCategory("rollbacks"),
  halloween: async () => await getProductsByCategory("halloween"),
};


export default products;
