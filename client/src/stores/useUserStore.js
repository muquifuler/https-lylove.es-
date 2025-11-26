import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
  user: null,
  cart: [],
  products: [],

  initUser: async (auth0User) => {
    console.log(import.meta.env.VITE_SERVER)
    const responseGet = await fetch(import.meta.env.VITE_SERVER + 'api/get-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub: auth0User.sub })
    });

    const exists = await responseGet.json();
    console.log(exists)
    if (exists.message === 'Usuario no encontrado') {
      await fetch(import.meta.env.VITE_SERVER + 'api/set-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...auth0User,
          bio: "",
          type: "User",
          name: auth0User.given_name + " " + auth0User.family_name,
          email: auth0User.email,
          picture: auth0User.picture.replace(/=s\d{2}-c/, ''),
          last_session: new Date(),
          created_at: new Date(),
          settings: {
            notificationsByMail: false,
            publicosPorDefecto: false,
            darkMode: false,
            autoSave: true
          },
          plan: null,
          subscriptionActive: false,
          CVs: [],
          creditos: 3
        }),
      });
      return get().initUser(auth0User);
    }

    //await useLogrosStore.getState().getLogrosUser(exists);
    set({ user: exists });
  },

  updateUser: async (user) => {
    await fetch(import.meta.env.VITE_SERVER + 'api/set-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    await get().refreshUser();
  },

  refreshUser: async () => {
    const user = get().user;
    if (!user) return;
    const res = await fetch(import.meta.env.VITE_SERVER + 'api/get-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub: user.sub })
    });
    const updatedUser = await res.json();
    set({ user: updatedUser });
  },

  // ----- PRODUCT

  setProducts: (newProducts) => set({ products: newProducts }),

  fetchProducts: async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + 'api/get-products');
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al cargar productos");

      // data.products es el array que devuelve la API
      set({ products: data.products || [] });
    } catch (err) {
      console.error("❌ Error fetchProducts:", err);
    }
  },

  updateProductsDB: async () => {
    try {
      const { products } = get();
      const res = await fetch(import.meta.env.VITE_SERVER + 'api/update-products', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar DB");
      alert("✅ Productos actualizados en la base de datos");
    } catch (err) {
      console.error("❌ Error updateProductsDB:", err);
      alert("❌ Error al actualizar productos");
    }
  },

  // ----- CART

  addProduct: (product, quantity, aditionalData) => {
    set(state => {
      const cart = [...state.cart]; // ✅ nuevo array

      const index = cart.findIndex(item => item.product._id === product._id);
      
      if (index !== -1) {
        // ✅ si ya existe, actualizamos cantidad
        cart[index].quantity += quantity;
      } else {
        // ✅ si no existe, lo añadimos
        cart.push({ product, quantity, aditionalData });
      }

      return { cart };
    });
  },

  removeProduct: (productId) => {
    set(state => ({
      cart: state.cart.filter(item => item.product._id !== productId)
    }));
  },

  increaseQuantity: (productId) => {
    set(state => {
      const cart = state.cart.map(item => {
        if (item.product._id === productId) {
          const newQuantity = Math.min(item.quantity + 1, item.product.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return { cart };
    });
  },

  decreaseQuantity: (productId) => {
    set(state => {
      const cart = state.cart
        .map(item =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0); // ✅ elimina si queda en 0
      return { cart };
    });
  },

}));
