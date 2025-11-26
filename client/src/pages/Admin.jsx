
import './styles/Admin.css'

import { useState, useEffect } from 'react'
import { useUserStore } from '../stores/useUserStore'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

/**
 * 
 * @returns Poner botones en las cards -> 
 * Para editar
 * Para poner su informacion en el formulario de añadir producto
 */

function Admin() {

  const products = useUserStore((state) => state.products);
  const setProductsStore = useUserStore((state) => state.setProducts);

    useEffect(() => {
        useUserStore.getState().fetchProducts();
    }, []);

    useEffect(() => {
      console.log(addP)
    })

  const [addP, setAddP] = useState({
      sort: 0,
      superName: "",
      tag: "New",
      type: "product",
      name: "",
      desc: "",
      price: 0,
      lastPrice: 0,
      stock: 999,
      customText: "0",
      customImg: "N",
      img: "",
      items: [
        {
          name: "",
          desc: "",
          prob: 0,
          rare: "",
          img: ""
        }
      ]
    });

  // -------------------- PRODUCTOS --------------------

  const saveProduct = () => {
    setProductsStore([...products, addP]);
    resetForm();
  };

  const deleteProduct = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProductsStore(updated);
  };

  const handleProductChange = (e) => {
    setAddP({ ...addP, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...addP.items];
    newItems[index][e.target.name] = e.target.value;
    setAddP({ ...addP, items: newItems });
  };

  const addItem = () => {
    setAddP({
      ...addP,
      items: [...addP.items, { name: "", desc: "", prob: 0, rare: "", img: "" }]
    });
  };

  const removeItem = (index) => {
    const newItems = addP.items.filter((_, i) => i !== index);
    setAddP({ ...addP, items: newItems });
  };

  const resetForm = () => {
    setAddP({
      sort: 0,
      superName: "",
      tag: "",
      type: "",
      name: "",
      desc: "",
      price: 0,
      lastPrice: 0,
      stock: 0,
      customText: "0",
      customImg: "N",
      img: "",
      items: [
        {
          name: "",
          desc: "",
          prob: 0,
          rare: "",
          img: ""
        }
      ]
    });
  };

  const [passAdmin, setPassAdmin] = useState("")

  return (
    <div className='Admin'>
      {passAdmin != import.meta.env.VITE_PASS_ADMIN &&<>
        <input type="password" value={passAdmin} onChange={(e) => setPassAdmin(e.target.value)} />
      </>}
      {passAdmin == import.meta.env.VITE_PASS_ADMIN &&<>
        {/* ✅ Mostrar productos existentes */}
        <h2>Todos los productos</h2>
        <div className='productsList'>
          {products.length === 0 ? (
            <p>No hay productos aún...</p>
          ) : (
            products.map((p, i) => (
              <div key={i} className='productCard' onClick={() => {
                const copyP = {...p}
                delete copyP._id
                setAddP(copyP)
              }}>
                <img src={p.img} alt='' width={60} />
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <p>€{p.price} | Stock: {p.stock}</p>
                <button onClick={() => deleteProduct(i)}>❌ Eliminar</button>
              </div>
            ))
          )}
        </div>


        {/* ✅ Añadir producto */}
        <h2>Añadir Producto</h2>
        <div className='addProduct'>
          <div>
            <p>sort:</p>
            <input type="number" name="sort" value={addP.sort} onChange={handleProductChange} placeholder='0 / 1 -> proridad)'/>
          </div>
          <div>
            <p>customText:</p>
            <input type="text" name="customText" value={addP.customText} onChange={handleProductChange} placeholder='0 / 1 / 2'/>
          </div>
          <div>
            <p>customImg:</p>
            <input type="text" name="customImg" value={addP.customImg} onChange={handleProductChange} placeholder='Y / N'/>
          </div>
          <div>
            <p>SuperName:</p>
            <input type="text" name="superName" value={addP.superName} onChange={handleProductChange} />
          </div>

          <div>
            <p>type:</p>
            <input type="text" name="type" value={addP.type} onChange={handleProductChange} placeholder='product / pack / kit' />
          </div>

          <div>
            <p>tag:</p>
            <input type="text" name="tag" value={addP.tag} onChange={handleProductChange} />
          </div>

          <div>
            <p>Name:</p>
            <input type="text" name="name" value={addP.name} onChange={handleProductChange} />
          </div>

          <div>
            <p>Desc:</p>
            <textarea name="desc" value={addP.desc} onChange={handleProductChange} />
          </div>
          
          <div>
            <p>Last Price:</p>
            <input type="number" name="lastPrice" value={addP.lastPrice} onChange={handleProductChange} />
          </div>

          <div>
            <p>Price:</p>
            <input type="number" name="price" value={addP.price} onChange={handleProductChange} />
          </div>

          <div>
            <p>Stock:</p>
            <input type="number" name="stock" value={addP.stock} onChange={handleProductChange} />
          </div>

          <div>
            <p>Img:</p>
            <input type="text" name="img" value={addP.img} onChange={handleProductChange} />
          </div>

          <h2>Items:</h2>

          {addP.items.map((item, i) => (
            <div className='item' key={i}>
              <div>
                <p>Name:</p>
                <input type="text" name="name" value={item.name} onChange={(e) => handleItemChange(i, e)} />
              </div>

              <div>
                <p>Desc:</p>
                <textarea name="desc" value={item.desc} onChange={(e) => handleItemChange(i, e)} />
              </div>

              <div>
                <p>Prob:</p>
                <input type="number" name="prob" value={item.prob} onChange={(e) => handleItemChange(i, e)} />
              </div>

              <div>
                <p>Rare:</p>
                <input type="text" name="rare" value={item.rare} onChange={(e) => handleItemChange(i, e)} />
              </div>

              <div>
                <p>Img:</p>
                <input type="text" name="img" value={item.img} onChange={(e) => handleItemChange(i, e)} />
              </div>

              <button onClick={() => removeItem(i)}>❌ Eliminar</button>
            </div>
          ))}

          <button onClick={addItem}>➕ Añadir Item</button>
          <button onClick={saveProduct}>✅ Guardar Producto</button>

        </div>

        <button 
              onClick={() => useUserStore.getState().updateProductsDB()} 
              style={{ background: "green", marginTop: "10px" }}
              >
              📤 Actualizar Base de Datos
        </button>
      </>}


    </div>
  );
}

export default Admin