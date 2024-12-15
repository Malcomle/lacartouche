// src/hooks/useOrders.js
import { useState, useEffect } from 'react';

const useOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Exemple de données factices
    const allOrders = [
      { productName: 'Lorem Ipsum', orderId: '#152', date: 'Dec 8th,2024', customerName: 'Kavin', status: 'Delivered', amount: 'XXX.XX€' },
      { productName: 'Lorem Ipsum', orderId: '#151', date: 'Dec 8th,2024', customerName: 'Komael', status: 'Canceled', amount: 'XXX.XX€' },
      { productName: 'Lorem Ipsum', orderId: '#150', date: 'Dec 8th,2024', customerName: 'Nikhil', status: 'Delivered', amount: 'XXX.XX€' },
      { productName: 'Lorem Ipsum', orderId: '#149', date: 'Dec 7th,2024', customerName: 'Shivam', status: 'Canceled', amount: 'XXX.XX€' },
      { productName: 'Lorem Ipsum', orderId: '#148', date: 'Dec 4th,2024', customerName: 'Shadab', status: 'Delivered', amount: 'XXX.XX€' },
      { productName: 'Lorem Ipsum', orderId: '#147', date: 'Dec 4th,2024', customerName: 'Yogesh', status: 'Delivered', amount: 'XXX.XX€' },
      { productName: 'Lorem Ipsum', orderId: '#146', date: 'Dec 2th,2024', customerName: 'Sunita', status: 'Canceled', amount: 'XXX.XX€' },
      { productName: 'Lorem Ipsum', orderId: '#145', date: 'Dec 1th,2024', customerName: 'Priyanka', status: 'Delivered', amount: 'XXX.XX€' },
      // Ajoutez plus d'ordres si nécessaire
    ];

    setOrders(allOrders);
  }, []);

  return orders;
};

export default useOrders;