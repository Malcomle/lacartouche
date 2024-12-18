import { useState, useEffect } from 'react';
import {db} from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const allProducts = [
    {
      "name": "Geekvape Aegis Legend 2 Kit",
      "description": "<p><strong>Acheter le Kit Aegis Legend 2 (L200) de GeekVape</strong><br><br>Le Geekvape Aegis Legend 2 est un kit reconnu pour sa robustesse et sa durabilité. Conçu pour résister à l'eau, à la poussière et aux chocs (certification IP68), il convient parfaitement aux vapoteurs recherchant un matériel solide, fiable et performant, même dans les conditions les plus extrêmes.<br><br>Avec une puissance maximale de 200W, il est alimenté par deux batteries 18650 (non fournies), offrant une autonomie généreuse pour une utilisation prolongée. Grâce à son chipset avancé, la chauffe est rapide et précise, garantissant une restitution des saveurs exceptionnelle. Le réservoir Z Sub Ohm 2021 d'une capacité de 2 ml est doté d'un flux d'air optimisé et de résistances Mesh haute performance, assurant une vapeur dense et savoureuse.<br><br>Son design ergonomique, son écran OLED 1.08\" clair et lisible, ainsi que son système de verrouillage A-Lock permettent une utilisation simple et sécurisée. Peu importe le climat ou la situation, l'Aegis Legend 2 vous accompagnera partout, de la haute montagne aux plages ensoleillées, en passant par les environnements urbains.<br><ul><li><em>Capacité :</em> 2ml</li><li><em>Puissance :</em> Jusqu'à 200W</li><li><em>Technologie Tri-proof :</em> Résistant eau/poussière/chocs</li><li><em>Batteries :</em> 2 x 18650 (non incluses)</li></ul></p>",
      "category": "Kits",
      "brand": "Geekvape",
      "stock": 50,
      "price": 59.99,
      "tags": ["vape", "resistente", "200W"],
      "image": "https://cdn.vapeo24.com/26a2d2bd-d198-49dd-9d7b-2a291518b600/md",
      "gallery": ["images/product1_1.jpg", "images/product1_2.jpg", "images/product1_3.jpg"]
    },
    {
      "name": "Vaporesso XROS Mini Pod",
      "description": "<p><strong>Vaporesso XROS Mini</strong><br><br>Le Vaporesso XROS Mini est un pod ultra-compact conçu pour une prise en main aisée et une simplicité d'utilisation maximale. Sa batterie intégrée de 1000mAh, combinée à une charge rapide via USB-C, vous assure une excellente autonomie au quotidien. L’appareil est idéal pour les débutants souhaitant une transition en douceur vers la vape, mais aussi pour les utilisateurs expérimentés cherchant un kit nomade et discret.<br><br>La cartouche de 2ml, équipée de résistances Mesh, offre une restitution des saveurs remarquable et une vapeur dense. Le flux d’air est optimisé pour un tirage MTL (inhalation indirecte) agréable, proche de la sensation d'une cigarette classique. Le XROS Mini se distingue par un design élégant, une qualité de fabrication exemplaire et une facilité d'entretien appréciable. Glissez-le dans votre poche ou votre sac, et profitez d'une expérience de vape confortable et savoureuse, partout et à tout moment.<br><ul><li>Capacité : 2ml</li><li>Batterie : 1000mAh</li><li>Résistances Mesh pour une vapeur dense</li><li>Format ultra-portable</li></ul></p>",
      "category": "Pods",
      "brand": "Vaporesso",
      "stock": 120,
      "price": 19.99,
      "tags": ["pod", "compacto", "mesh"],
      "image": "https://m.media-amazon.com/images/I/61QdznuSNkL._AC_UF1000,1000_QL80_.jpg",
      "gallery": ["images/product2_1.jpg", "images/product2_2.jpg"]
    },
    {
      "name": "Elf Bar 1500 Puff Strawberry",
      "description": "<p><strong>Elf Bar 1500 Puff Fraise</strong><br><br>L'Elf Bar 1500 Puff au goût de fraise est une cigarette électronique jetable pensée pour la simplicité. Aucune recharge de e-liquide, aucune résistance à changer : il vous suffit de la sortir de son emballage et de vaper. Offrant jusqu'à 1500 bouffées, cette puff propose un goût de fraise intense, sucré et délicieusement fruité, idéal pour une pause gourmande.<br><br>Compacte et légère, elle tient parfaitement dans la main et se glisse sans difficulté dans une poche ou un sac. C'est la solution parfaite pour ceux qui souhaitent s'initier à la vape sans contrainte, ou simplement pour les vapoteurs réguliers cherchant un dispositif d'appoint pour leurs déplacements, soirées ou voyages. Son tirage serré rappelle la cigarette traditionnelle, facilitant la transition pour les nouveaux vapoteurs.<br><ul><li>S saveur : Fraise</li><li>Jusqu'à 1500 bouffées</li><li>Prête à l'emploi, sans réglages</li></ul></p>",
      "category": "Puff",
      "brand": "Elf Bar",
      "stock": 200,
      "price": 7.50,
      "tags": ["desechable", "fresa", "1500 puffs"],
      "image": "https://vapebarmarket.com/img/39990/2138119009274027/elf-bar-1500-puff-strawberry-ice-cream-20mg-disposable-vape.webp",
      "gallery": ["images/product3_1.jpg"]
    },
    {
      "name": "Uwell Caliburn A2 Pod",
      "description": "<p><strong>Uwell Caliburn A2</strong><br><br>Le Uwell Caliburn A2 est un pod apprécié pour sa simplicité et son efficacité. Doté d'une batterie de 520mAh, il se recharge rapidement via USB-C, vous permettant de profiter d'une vape savoureuse tout au long de la journée. Sa cartouche de 2ml est facile à remplir par le haut, limitant les risques de fuites.<br><br>La signature aromatique des résistances Uwell est reconnue : elles extraient le meilleur de votre e-liquide, offrant une vapeur douce et goûteuse, idéale pour un tirage MTL confortable. Le Caliburn A2 est un choix judicieux pour le vapoteur débutant cherchant un kit sans complications, ou pour l'utilisateur confirmé souhaitant un petit pod d'appoint discret, fiable et facile à transporter. Son design sobre et élégant s'adapte à tous les styles.<br><ul><li>Capacité : 2ml</li><li>Batterie : 520mAh</li><li>Remplissage par le haut</li><li>Excellente restitution des saveurs</li></ul></p>",
      "category": "Pods",
      "brand": "Uwell",
      "stock": 90,
      "price": 24.99,
      "tags": ["pod", "sabores", "portátil"],
      "image": "https://www.vaperbull.es/wp-content/uploads/2021/10/Uwell-Caliburn-A2-Replacement-Pods.jpg",
      "gallery": ["images/product4_1.jpg", "images/product4_2.jpg"]
    },
    {
      "name": "Voopoo Drag 3 Kit",
      "description": "<p><strong>Voopoo Drag 3</strong><br><br>Le Voopoo Drag 3 est un kit de vape haut de gamme, conçu pour offrir des performances exceptionnelles. Équipé du chipset GENE.FAN 2.0, il garantit une réactivité instantanée et une gestion de la puissance optimale jusqu'à 177W. Ce kit prend en charge les résistances TPP, réputées pour leur durabilité et leur restitution aromatique impeccable.<br><br>Son design élégant et son alliage de métaux en font un objet robuste et agréable en main. Le réservoir de 2ml, facile à remplir, fournit une vapeur dense et une intensité gustative remarquable. Le Drag 3 conviendra aussi bien aux vapoteurs expérimentés recherchant un matériel performant, qu'aux amateurs souhaitant progresser avec un dispositif de qualité. Les multiples modes de vape (Smart, RBA, Super) permettent de personnaliser l'expérience selon les préférences de chacun.<br><ul><li>Capacité : 2ml</li><li>Puissance : jusqu'à 177W</li><li>Chipset GENE.FAN 2.0</li><li>Compatibilité résistances TPP</li></ul></p>",
      "category": "Kits",
      "brand": "Voopoo",
      "stock": 40,
      "price": 54.90,
      "tags": ["kit", "alto rendimiento", "177W"],
      "image": "https://upload.vapeo24.com/producto/md/voopoo-drag-3-kit-991005.webp",
      "gallery": ["images/product5_1.jpg", "images/product5_2.jpg", "images/product5_3.jpg"]
    },
    {
      "name": "Maskking High Pro Watermelon",
      "description": "<p><strong>Maskking High Pro Pastèque</strong><br><br>Le Maskking High Pro est une cigarette électronique jetable au délicieux goût de pastèque juteuse. Sans réglages, sans entretien, elle s'utilise immédiatement et offre jusqu'à 1000 bouffées, vous permettant de vaper sereinement sur plusieurs jours selon votre fréquence.<br><br>Son format compact et léger la rend très pratique pour les déplacements, les sorties ou simplement pour s'initier à la vape. La saveur douce et sucrée de la pastèque se libère en bouche dès la première inhalation, procurant une expérience fraîche et estivale. C'est l'option idéale pour ceux qui veulent une vape nomade et savoureuse, sans s'encombrer d'accessoires supplémentaires.<br><ul><li>Saveur : Pastèque</li><li>Jusqu'à 1000 bouffées</li><li>Aucun remplissage ou recharge nécessaire</li></ul></p>",
      "category": "Puff",
      "brand": "Maskking",
      "stock": 180,
      "price": 6.99,
      "tags": ["desechable", "sandía", "1000 puffs"],
      "image": "https://radavapes.com/cdn/shop/products/MASKKING-HIGH-PRO-1000HITS_AppleStrawberryWatermelon.png?v=1684773998",
      "gallery": ["images/product6_1.jpg"]
    },
    {
      "name": "SMOK Nord 4 Pod Kit",
      "description": "<p><strong>SMOK Nord 4</strong><br><br>Le SMOK Nord 4 est un pod polyvalent et performant. Sa batterie intégrée de 2000mAh vous offre une excellente autonomie, tandis que son système de réglage du flux d'air permet d'adapter l'expérience de vape selon vos préférences, du plus serré au plus aérien.<br><br>Compatible avec les résistances RPM et RPM2, il offre une variété de choix pour différents styles de tirages. Son écran OLED et ses boutons de contrôle simplifiés facilitent la navigation dans les réglages. Que vous soyez débutant ou vapoteur confirmé, le Nord 4 saura répondre à vos attentes grâce à sa qualité de fabrication, sa compacité et sa fiabilité reconnue. Une référence dans le monde des pods.<br><ul><li>Capacité : 2ml</li><li>Batterie : 2000mAh</li><li>Flux d'air ajustable</li><li>Compatibilité RPM/RPM2</li></ul></p>",
      "category": "Pods",
      "brand": "SMOK",
      "stock": 100,
      "price": 29.99,
      "tags": ["pod", "flujo aire ajustable", "2000mAh"],
      "image": "https://m.media-amazon.com/images/I/51jLOziCa3L._AC_UF1000,1000_QL80_.jpg",
      "gallery": ["images/product7_1.jpg", "images/product7_2.jpg"]
    },
    {
      "name": "Innokin Kroma-Z Kit",
      "description": "<p><strong>Innokin Kroma-Z</strong><br><br>L'Innokin Kroma-Z est un kit ergonomique et robuste, pensé pour s'adapter parfaitement à votre main. Doté d'une puissance ajustable jusqu'à 40W, il permet de trouver facilement le réglage idéal pour vos préférences gustatives et la quantité de vapeur souhaitée. Compatible avec les résistances Z-Coil, il assure une restitution fidèle des arômes et une bonne longévité.<br><br>Léger et élégant, le Kroma-Z se distingue par sa simplicité d'utilisation : remplissage propre et rapide, changement de résistance aisé, et interface intuitive. C'est un kit polyvalent qui satisfera aussi bien les débutants que les vapoteurs expérimentés, faisant de lui un excellent choix pour une vape de tous les jours.<br><ul><li>Capacité : 2ml</li><li>Puissance : jusqu'à 40W</li><li>Compatibilité Z-Coil</li><li>Design ergonomique et soigné</li></ul></p>",
      "category": "Kits",
      "brand": "Innokin",
      "stock": 60,
      "price": 45.00,
      "tags": ["kit", "ergonómico", "40W"],
      "image": "https://m.media-amazon.com/images/I/610WV9H3LcL.jpg",
      "gallery": ["images/product8_1.jpg", "images/product8_2.jpg"]
    },
    {
      "name": "Nasty Fix Disposable Mango",
      "description": "<p><strong>Nasty Fix Mango</strong><br><br>La Nasty Fix Mango est une puff jetable offrant une expérience de vape simple et délicieuse. Sa saveur de mangue tropicale, douce et légèrement sucrée, séduit dès la première inhalation. Avec environ 600 bouffées par appareil, vous pouvez profiter de ce plaisir fruité pendant un certain temps, sans vous soucier de recharges ou de réglages.<br><br>Élégante et compacte, elle se glisse sans effort dans une poche ou une sacoche. Cette puff convient parfaitement aux débutants cherchant une première expérience sans contrainte, ou aux vapoteurs confirmés souhaitant un dispositif d'appoint lors de déplacements. La Nasty Fix Mango vous invite à une parenthèse exotique, où que vous soyez.<br><ul><li>S saveur : Mangue</li><li>Jusqu'à 600 bouffées</li><li>Utilisation immédiate, aucun entretien</li></ul></p>",
      "category": "Puff",
      "brand": "Nasty",
      "stock": 250,
      "price": 5.99,
      "tags": ["desechable", "mango", "600 puffs"],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqQXJgjWT20dqvo_dqQ3_UroS9Fl8rclXHw&s",
      "gallery": ["images/product9_1.jpg"]
    },
    {
      "name": "Aspire Nautilus Prime X",
      "description": "<p><strong>Aspire Nautilus Prime X</strong><br><br>L'Aspire Nautilus Prime X est un pod mod polyvalent, offrant une puissance ajustable jusqu'à 60W et un écran TFT couleur qui rend la navigation entre les différents réglages plus agréable. Compatible avec les résistances Nautilus, il propose une multitude d'options pour satisfaire les adeptes du MTL comme du DL restreint.<br><br>Le remplissage est aisé, la prise en main confortable, et la qualité des matériaux assure une bonne longévité. Ce dispositif élégant et fiable se démarque par sa flexibilité et sa capacité à répondre aux besoins de nombreux profils de vapoteurs. Que vous recherchiez un tirage serré et savoureux, ou une vapeur plus dense, le Nautilus Prime X saura vous combler.<br><ul><li>Capacité : 2ml</li><li>Puissance : jusqu'à 60W</li><li>Compatibilité résistances Nautilus</li><li>Écran TFT couleur</li></ul></p>",
      "category": "Pods",
      "brand": "Aspire",
      "stock": 70,
      "price": 34.90,
      "tags": ["pod", "versátil", "60W"],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ9_grTtoEFjTk_vchIJ50ZXugZssaFJc3Fg&s",
      "gallery": ["images/product10_1.jpg", "images/product10_2.jpg"]
    }
  ]
  const getProducts = async () => {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    console.log(productsSnapshot.docs);
    
    setProducts(productsSnapshot.docs.map(doc => doc.data()));
  } 

  const createProduct = async (productData) => {
    try {
      const productsCollection = collection(db, "products");
      const docRef = await addDoc(productsCollection, productData);
      await setDoc(doc(db, "products", docRef.id), { ...productData, id: docRef.id });
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
      allProducts.forEach(async product => {
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

  return {products, initDocument, deleteProduct, createProduct, updateProduct, getProductById};
};

export default useProducts;