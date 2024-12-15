import { useState, useEffect } from 'react';
import {db} from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const allProducts = [
    { name: 'Kit Pod Feelin 2 - Nevoks', price: '22.90€', category: 'Kits', image: '/images/products/feelin2.png' },
    { name: 'Pod Luxe XR Max Vaporesso', price: '30.12€', category: 'Pods', image: '/images/products/luxexr.png' },
    { name: 'Pod Drag X2 Voopoo', price: '36.46€', category: 'Pods', image: '/images/products/dragx2.png' },
    { name: 'Pod Drag S2 Voopoo', price: '38.16€', category: 'Pods', image: '/images/products/geekvape.png' },
    { name: 'Kit Pod Feelin 2 - Nevoks', price: '22.90€', category: 'Kits', image: '/images/products/feelin2.png' },
    { name: 'Pod Luxe XR Max Vaporesso', price: '30.12€', category: 'Pods', image: '/images/products/luxexr.png' },
    { name: 'Pod Drag X2 Voopoo', price: '36.46€', category: 'Puff', image: '/images/products/dragx2.png' },
    { name: 'Pod Drag S2 Voopoo', price: '38.16€', category: 'Puff', image: '/images/products/geekvape.png' },
    { name: 'Kit Pod Feelin 2 - Nevoks', price: '22.90€', category: 'Kits', image: '/images/products/feelin2.png' },
    {  name: 'Pod Luxe XR Max Vaporesso', price: '30.12€', category: 'Pods', image: '/images/products/luxexr.png' },
    {  name: 'Pod Drag X2 Voopoo', price: '36.46€', category: 'Pods', image: '/images/products/dragx2.png' },
    {  name: 'Pod Drag S2 Voopoo', price: '38.16€', category: 'Pods', image: '/images/products/geekvape.png' },
  ];

  const getProducts = async () => {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    console.log(productsSnapshot.docs);
    
    setProducts(productsSnapshot.docs.map(doc => doc.data()));
  } 

  useEffect(() => {   
    getProducts();
  }, []);

  const initDocument = async () => {
    try {
      allProducts.forEach(async product => {
        const productsCollection = collection(db, "products");

        const docRef = doc(productsCollection);

        await setDoc(docRef, { ...product, id: docRef.id });
      });
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteProduct = async (id) => {
    if (!id) {
        console.error("L'ID est invalide ou manquant");
        return;
    }

    console.log("ID reçu :", id);
    const productRef = doc(db, "products", id.toString());
    console.log("Référence du document :", productRef);

    try {
        await deleteDoc(productRef);
        console.log("Produit supprimé avec succès :", id);
        await getProducts(); // Recharger les produits après suppression
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
};

  return {products, initDocument, deleteProduct};
};

export default useProducts;