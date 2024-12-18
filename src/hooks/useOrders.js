import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const useOrders = () => {
  const [orders, setOrders] = useState([]);

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

  // Récupérer toutes les commandes
  const getOrders = async () => {
    const ordersCollection = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersCollection);
    setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Créer une nouvelle commande
  const createOrder = async (orderData) => {
    try {
      const ordersCollection = collection(db, "orders");
      const docRef = await addDoc(ordersCollection, orderData);
      await setDoc(doc(db, "orders", docRef.id), { ...orderData, id: docRef.id });
      await getOrders();
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
    }
  };

  // Initialiser la table "orders" avec des données par défaut
  const initOrders = async () => {
    try {
      allOrders.forEach(async order => {
        const ordersCollection = collection(db, "orders");
        const docRef = doc(ordersCollection);
        await setDoc(docRef, { ...order, id: docRef.id });
      });
    } catch (e) {
      console.error("Erreur lors de l'initialisation des commandes: ", e);
    }
  };

  // Mettre à jour une commande
  const updateOrder = async (id, orderData) => {
    if (!id) return;
    const orderRef = doc(db, "orders", id.toString());
    await updateDoc(orderRef, orderData);
    await getOrders();
  };

  // Supprimer une commande
  const deleteOrder = async (id) => {
    if (!id) {
      console.error("L'ID est invalide ou manquant");
      return;
    }

    try {
      const orderRef = doc(db, "orders", id.toString());
      await deleteDoc(orderRef);
      console.log("Commande supprimée avec succès :", id);
      await getOrders();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Récupérer une commande par son ID
  const getOrderById = async (id) => {
    const orderRef = doc(db, "orders", id.toString());
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      return orderSnap.data();
    }
    return null;
  };

  useEffect(() => {
    getOrders();
  }, []);

  return { orders, initOrders, createOrder, updateOrder, deleteOrder, getOrderById };
};

export default useOrders;