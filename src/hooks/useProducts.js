import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const allProducts = [
    {
      name: "Geekvape Aegis Legend 2 Kit",
      description:
        '<p><strong>Comprar el Kit Aegis Legend 2 (L200) de GeekVape</strong><br><br>El Geekvape Aegis Legend 2 es un kit conocido por su robustez y durabilidad. Diseñado para resistir al agua, al polvo y a los golpes (certificación IP68), es perfecto para vapeadores que buscan un dispositivo sólido, fiable y potente, incluso en las condiciones más extremas.<br><br>Con una potencia máxima de 200W, funciona con dos baterías 18650 (no incluidas), brindando una gran autonomía para un uso prolongado. Gracias a su chipset avanzado, el calentamiento es rápido y preciso, garantizando una excelente restitución de sabores. El tanque Z Sub Ohm 2021 con capacidad de 2 ml cuenta con un flujo de aire optimizado y resistencias Mesh de alto rendimiento, produciendo una vaporada densa y sabrosa.<br><br>Su diseño ergonómico, su pantalla OLED de 1.08" clara y su sistema de bloqueo A-Lock permiten un uso sencillo y seguro. Independientemente del clima o la situación, el Aegis Legend 2 te acompañará a todas partes, desde las altas montañas hasta las playas soleadas, pasando por entornos urbanos.<br><ul><li><em>Capacidad:</em> 2ml</li><li><em>Potencia:</em> Hasta 200W</li><li><em>Tecnología Tri-proof:</em> Resistente al agua/polvo/golpes</li><li><em>Baterías:</em> 2 x 18650 (no incluidas)</li></ul></p>',
      category: "Kits",
      brand: "Geekvape",
      stock: 50,
      price: 59.99,
      tags: ["vape", "resistente", "200W"],
      image: "https://cdn.vapeo24.com/26a2d2bd-d198-49dd-9d7b-2a291518b600/md",
      gallery: [
        "images/product1_1.jpg",
        "images/product1_2.jpg",
        "images/product1_3.jpg",
      ],
    },
    {
      name: "Vaporesso XROS Mini Pod",
      description:
        "<p><strong>Vaporesso XROS Mini</strong><br><br>El Vaporesso XROS Mini es un pod ultracompacto diseñado para un agarre sencillo y una facilidad de uso máxima. Su batería integrada de 1000mAh, junto con la carga rápida vía USB-C, proporciona una excelente autonomía diaria. Este dispositivo es ideal tanto para principiantes que buscan una transición suave al vapeo, como para usuarios experimentados que deseen un kit portátil y discreto.<br><br>El cartucho de 2ml, equipado con resistencias Mesh, ofrece una excepcional restitución de sabores y una vaporada densa. El flujo de aire está optimizado para una calada MTL (inhalación indirecta) agradable, similar a la sensación de un cigarrillo tradicional. El XROS Mini destaca por su diseño elegante, alta calidad de fabricación y facilidad de mantenimiento. Llévalo en tu bolsillo o bolso, y disfruta de una experiencia de vapeo cómoda y sabrosa, en cualquier momento y lugar.<br><ul><li>Capacidad: 2ml</li><li>Batería: 1000mAh</li><li>Resistencias Mesh para vapor denso</li><li>Formato ultracompacto</li></ul></p>",
      category: "Pods",
      brand: "Vaporesso",
      stock: 120,
      price: 19.99,
      tags: ["pod", "compacto", "mesh"],
      image:
        "https://m.media-amazon.com/images/I/61QdznuSNkL._AC_UF1000,1000_QL80_.jpg",
      gallery: ["images/product2_1.jpg", "images/product2_2.jpg"],
    },
    {
      name: "Elf Bar 1500 Puff Strawberry",
      description:
        "<p><strong>Elf Bar 1500 Puff Fresa</strong><br><br>El Elf Bar 1500 Puff con sabor a fresa es un cigarrillo electrónico desechable pensado para la máxima simplicidad. Sin necesidad de recarga de e-líquido ni de cambiar resistencias: basta con sacarlo de su embalaje y vapear. Ofrece hasta 1500 caladas con un sabor a fresa intenso, dulce y afrutado, perfecto para un momento de placer.<br><br>Compacto y ligero, cabe perfectamente en la mano y se guarda sin problema en un bolsillo o bolso. Es la solución ideal para quienes quieren iniciarse en el vapeo sin complicaciones, o para vapeadores habituales que buscan un dispositivo de apoyo durante viajes o salidas. Su calada cerrada recuerda la de un cigarrillo tradicional, facilitando la transición a nuevos vapeadores.<br><ul><li>Sabor: Fresa</li><li>Hasta 1500 caladas</li><li>Lista para usar, sin ajustes</li></ul></p>",
      category: "Puff",
      brand: "Elf Bar",
      stock: 200,
      price: 7.5,
      tags: ["desechable", "fresa", "1500 puffs"],
      image:
        "https://vapebarmarket.com/img/39990/2138119009274027/elf-bar-1500-puff-strawberry-ice-cream-20mg-disposable-vape.webp",
      gallery: ["images/product3_1.jpg"],
    },
    {
      name: "Uwell Caliburn A2 Pod",
      description:
        "<p><strong>Uwell Caliburn A2</strong><br><br>El Uwell Caliburn A2 es un pod apreciado por su simplicidad y eficacia. Con una batería de 520mAh, se recarga rápidamente mediante USB-C, permitiendo disfrutar de un vapeo sabroso durante todo el día. Su cartucho de 2ml se llena fácilmente desde la parte superior, minimizando el riesgo de fugas.<br><br>La calidad aromática de las resistencias Uwell es reconocida: extraen lo mejor de tu e-líquido, ofreciendo un vapor suave y sabroso, ideal para una calada MTL cómoda. El Caliburn A2 es una opción sensata para el vapeador principiante que busca un kit sin complicaciones, o para el usuario experimentado que desee un pod discreto, fiable y fácil de transportar. Su diseño sobrio y elegante se adapta a todos los estilos.<br><ul><li>Capacidad: 2ml</li><li>Batería: 520mAh</li><li>Rellenado superior</li><li>Excelente restitución de sabores</li></ul></p>",
      category: "Pods",
      brand: "Uwell",
      stock: 90,
      price: 24.99,
      tags: ["pod", "sabores", "portátil"],
      image:
        "https://www.vaperbull.es/wp-content/uploads/2021/10/Uwell-Caliburn-A2-Replacement-Pods.jpg",
      gallery: ["images/product4_1.jpg", "images/product4_2.jpg"],
    },
    {
      name: "Voopoo Drag 3 Kit",
      description:
        "<p><strong>Voopoo Drag 3</strong><br><br>El Voopoo Drag 3 es un kit de vapeo de alta gama, diseñado para ofrecer un rendimiento excepcional. Equipado con el chipset GENE.FAN 2.0, garantiza una respuesta instantánea y una gestión óptima de la potencia hasta 177W. Este kit es compatible con resistencias TPP, conocidas por su durabilidad y restitución aromática impecable.<br><br>Su diseño elegante y su aleación metálica lo hacen resistente y agradable al tacto. El tanque de 2ml, fácil de rellenar, proporciona una vaporada densa y un sabor intenso. El Drag 3 es adecuado tanto para vapeadores experimentados que buscan una máquina potente, como para aficionados que deseen progresar con un dispositivo de calidad. Sus múltiples modos de vapeo (Smart, RBA, Super) permiten personalizar la experiencia según las preferencias de cada usuario.<br><ul><li>Capacidad: 2ml</li><li>Potencia: hasta 177W</li><li>Chipset GENE.FAN 2.0</li><li>Compatibilidad con resistencias TPP</li></ul></p>",
      category: "Kits",
      brand: "Voopoo",
      stock: 40,
      price: 54.9,
      tags: ["kit", "alto rendimiento", "177W"],
      image:
        "https://upload.vapeo24.com/producto/md/voopoo-drag-3-kit-991005.webp",
      gallery: [
        "images/product5_1.jpg",
        "images/product5_2.jpg",
        "images/product5_3.jpg",
      ],
    },
    {
      name: "Maskking High Pro Watermelon",
      description:
        "<p><strong>Maskking High Pro Sandía</strong><br><br>El Maskking High Pro es un cigarrillo electrónico desechable con un delicioso sabor a sandía jugosa. Sin ajustes ni mantenimiento, se utiliza inmediatamente y ofrece hasta 1000 caladas, permitiéndote vapear tranquilamente durante varios días según tu frecuencia de uso.<br><br>Su formato compacto y ligero es muy práctico para llevar durante viajes, salidas o simplemente para iniciarse en el vapeo. El sabor dulce y fresco de la sandía se libera en cada inhalación, brindando una experiencia refrescante y veraniega. Es la opción ideal para quienes buscan un vapeo nómada y sabroso, sin molestarse con accesorios adicionales.<br><ul><li>Sabor: Sandía</li><li>Hasta 1000 caladas</li><li>Sin recarga ni mantenimiento</li></ul></p>",
      category: "Puff",
      brand: "Maskking",
      stock: 180,
      price: 6.99,
      tags: ["desechable", "sandía", "1000 puffs"],
      image:
        "https://radavapes.com/cdn/shop/products/MASKKING-HIGH-PRO-1000HITS_AppleStrawberryWatermelon.png?v=1684773998",
      gallery: ["images/product6_1.jpg"],
    },
    {
      name: "SMOK Nord 4 Pod Kit",
      description:
        "<p><strong>SMOK Nord 4</strong><br><br>El SMOK Nord 4 es un pod versátil y potente. Su batería integrada de 2000mAh proporciona una excelente autonomía, mientras que su sistema de ajuste del flujo de aire permite adaptar la experiencia de vapeo según tus preferencias, desde una calada más cerrada hasta una más aireada.<br><br>Compatible con resistencias RPM y RPM2, ofrece múltiples opciones para diferentes estilos de calada. Su pantalla OLED y botones de control simples facilitan la navegación por los ajustes. Tanto si eres principiante como un vapeador experimentado, el Nord 4 cumplirá tus expectativas gracias a su calidad de fabricación, compacidad y fiabilidad reconocida. Una referencia en el mundo de los pods.<br><ul><li>Capacidad: 2ml</li><li>Batería: 2000mAh</li><li>Flujo de aire ajustable</li><li>Compatibilidad con RPM/RPM2</li></ul></p>",
      category: "Pods",
      brand: "SMOK",
      stock: 100,
      price: 29.99,
      tags: ["pod", "flujo aire ajustable", "2000mAh"],
      image:
        "https://m.media-amazon.com/images/I/51jLOziCa3L._AC_UF1000,1000_QL80_.jpg",
      gallery: ["images/product7_1.jpg", "images/product7_2.jpg"],
    },
    {
      name: "Innokin Kroma-Z Kit",
      description:
        "<p><strong>Innokin Kroma-Z</strong><br><br>El Innokin Kroma-Z es un kit ergonómico y robusto, pensado para adaptarse perfectamente a tu mano. Con potencia ajustable hasta 40W, te permite encontrar fácilmente el punto ideal para tus preferencias de sabor y cantidad de vapor. Compatible con resistencias Z-Coil, asegura una fiel restitución de aromas y una buena longevidad.<br><br>Ligero y elegante, el Kroma-Z se destaca por su facilidad de uso: rellenado limpio y rápido, cambio de resistencia sencillo e interfaz intuitiva. Es un kit versátil que satisfará tanto a principiantes como a vapeadores experimentados, convirtiéndose en una excelente opción para el vapeo diario.<br><ul><li>Capacidad: 2ml</li><li>Potencia: hasta 40W</li><li>Compatibilidad con Z-Coil</li><li>Diseño ergonómico y cuidado</li></ul></p>",
      category: "Kits",
      brand: "Innokin",
      stock: 60,
      price: 45.0,
      tags: ["kit", "ergonómico", "40W"],
      image: "https://m.media-amazon.com/images/I/610WV9H3LcL.jpg",
      gallery: ["images/product8_1.jpg", "images/product8_2.jpg"],
    },
    {
      name: "Nasty Fix Disposable Mango",
      description:
        "<p><strong>Nasty Fix Mango</strong><br><br>La Nasty Fix Mango es una puff desechable que ofrece una experiencia de vapeo simple y deliciosa. Su sabor a mango tropical, dulce y ligeramente azucarado, encanta desde la primera calada. Con aproximadamente 600 caladas por dispositivo, puedes disfrutar de este placer afrutado durante un tiempo sin preocuparte por recargas o ajustes.<br><br>Elegante y compacta, se desliza sin esfuerzo en un bolsillo o bolso. Esta puff es ideal para principiantes que buscan una primera experiencia sin complicaciones, o para vapeadores experimentados que deseen un dispositivo de apoyo durante sus desplazamientos. La Nasty Fix Mango te invita a una escapada exótica, estés donde estés.<br><ul><li>Sabor: Mango</li><li>Hasta 600 caladas</li><li>Uso inmediato, sin mantenimiento</li></ul></p>",
      category: "Puff",
      brand: "Nasty",
      stock: 250,
      price: 5.99,
      tags: ["desechable", "mango", "600 puffs"],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqQXJgjWT20dqvo_dqQ3_UroS9Fl8rclXHw&s",
      gallery: ["images/product9_1.jpg"],
    },
    {
      name: "Aspire Nautilus Prime X",
      description:
        "<p><strong>Aspire Nautilus Prime X</strong><br><br>El Aspire Nautilus Prime X es un pod mod versátil, con potencia ajustable hasta 60W y una pantalla TFT a color que facilita la navegación entre diferentes configuraciones. Compatible con resistencias Nautilus, ofrece una gran variedad de opciones para satisfacer a los entusiastas del MTL como del DL restringido.<br><br>El rellenado es sencillo, el agarre cómodo, y la calidad de los materiales garantiza una larga vida útil. Este dispositivo elegante y fiable destaca por su flexibilidad y capacidad para responder a las necesidades de muchos tipos de vapeadores. Ya busques una calada cerrada y sabrosa, o un vapor más denso, el Nautilus Prime X te convencerá.<br><ul><li>Capacidad: 2ml</li><li>Potencia: hasta 60W</li><li>Compatibilidad con resistencias Nautilus</li><li>Pantalla TFT a color</li></ul></p>",
      category: "Pods",
      brand: "Aspire",
      stock: 70,
      price: 34.9,
      tags: ["pod", "versátil", "60W"],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ9_grTtoEFjTk_vchIJ50ZXugZssaFJc3Fg&s",
      gallery: ["images/product10_1.jpg", "images/product10_2.jpg"],
    },
  ];
  const getProducts = async () => {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    console.log(productsSnapshot.docs);

    setProducts(productsSnapshot.docs.map((doc) => doc.data()));
  };

  const createProduct = async (productData) => {
    try {
      const productsCollection = collection(db, "products");
      const docRef = await addDoc(productsCollection, productData);
      await setDoc(doc(db, "products", docRef.id), {
        ...productData,
        id: docRef.id,
      });
      await getProducts();
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const initDocument = async () => {
    try {
      allProducts.forEach(async (product) => {
        const productsCollection = collection(db, "products");

        const docRef = doc(productsCollection);

        await setDoc(docRef, { ...product, id: docRef.id });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateProduct = async (id, productData) => {
    if (!id) return;
    const productRef = doc(db, "products", id.toString());
    await updateDoc(productRef, productData);
    await getProducts();
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

  const getProductById = async (id) => {
    const productRef = doc(db, "products", id.toString());
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return productSnap.data();
    }
    return null;
  };

  return {
    products,
    initDocument,
    deleteProduct,
    createProduct,
    updateProduct,
    getProductById,
  };
};

export default useProducts;
