import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Exemples de produits, remplacez par vos vraies données
    const allProducts = [
      { id: 1, name: 'Kit Pod Feelin 2 - Nevoks', price: '22.90€', category: 'Kits', image: '/images/products/feelin2.png' },
      { id: 2, name: 'Pod Luxe XR Max Vaporesso', price: '30.12€', category: 'Pods', image: '/images/products/luxexr.png' },
      { id: 3, name: 'Pod Drag X2 Voopoo', price: '36.46€', category: 'Pods', image: '/images/products/dragx2.png' },
      { id: 4, name: 'Pod Drag S2 Voopoo', price: '38.16€', category: 'Pods', image: '/images/products/geekvape.png' },
      { id: 5, name: 'Kit Pod Feelin 2 - Nevoks', price: '22.90€', category: 'Kits', image: '/images/products/feelin2.png' },
      { id: 6, name: 'Pod Luxe XR Max Vaporesso', price: '30.12€', category: 'Pods', image: '/images/products/luxexr.png' },
      { id: 7, name: 'Pod Drag X2 Voopoo', price: '36.46€', category: 'Puff', image: '/images/products/dragx2.png' },
      { id: 8, name: 'Pod Drag S2 Voopoo', price: '38.16€', category: 'Puff', image: '/images/products/geekvape.png' },
      { id: 9, name: 'Kit Pod Feelin 2 - Nevoks', price: '22.90€', category: 'Kits', image: '/images/products/feelin2.png' },
      { id: 10, name: 'Pod Luxe XR Max Vaporesso', price: '30.12€', category: 'Pods', image: '/images/products/luxexr.png' },
      { id: 11, name: 'Pod Drag X2 Voopoo', price: '36.46€', category: 'Pods', image: '/images/products/dragx2.png' },
      { id: 12, name: 'Pod Drag S2 Voopoo', price: '38.16€', category: 'Pods', image: '/images/products/geekvape.png' },
      // Ajoutez autant de produits que nécessaire
    ];

    setProducts(allProducts);
  }, []);

  return products;
};

export default useProducts;