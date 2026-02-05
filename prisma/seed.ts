import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed de datos extendido para el sistema de restaurantes
 * Version 2.0 - 3x mas datos de prueba
 * Ejecutar con: npx prisma db seed
 */
async function main() {
  console.log('🌱 Iniciando seed de datos extendido...');

  // ===========================================
  // 1. CATEGORIAS (10 categorias)
  // ===========================================
  console.log('📁 Creando categorias...');

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'mexicana' },
      update: {},
      create: {
        name: 'Mexicana',
        slug: 'mexicana',
        description: 'Cocina tradicional mexicana',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'italiana' },
      update: {},
      create: {
        name: 'Italiana',
        slug: 'italiana',
        description: 'Autentica cocina italiana',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'japonesa' },
      update: {},
      create: {
        name: 'Japonesa',
        slug: 'japonesa',
        description: 'Cocina japonesa tradicional y fusion',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'americana' },
      update: {},
      create: {
        name: 'Americana',
        slug: 'americana',
        description: 'Comida americana clasica',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'mariscos' },
      update: {},
      create: {
        name: 'Mariscos',
        slug: 'mariscos',
        description: 'Especialidad en mariscos y pescados',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'china' },
      update: {},
      create: {
        name: 'China',
        slug: 'china',
        description: 'Autentica cocina china tradicional',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'peruana' },
      update: {},
      create: {
        name: 'Peruana',
        slug: 'peruana',
        description: 'Gastronomia peruana de clase mundial',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'francesa' },
      update: {},
      create: {
        name: 'Francesa',
        slug: 'francesa',
        description: 'Alta cocina francesa',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'vegetariana' },
      update: {},
      create: {
        name: 'Vegetariana',
        slug: 'vegetariana',
        description: 'Opciones vegetarianas y veganas',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cafeteria' },
      update: {},
      create: {
        name: 'Cafeteria',
        slug: 'cafeteria',
        description: 'Cafe, postres y reposteria',
      },
    }),
  ]);

  console.log(`✅ ${categories.length} categorias creadas`);

  // ===========================================
  // 2. RESTAURANTES (9 restaurantes)
  // ===========================================
  console.log('🍽️ Creando restaurantes...');

  const restaurant1 = await prisma.restaurant.upsert({
    where: { slug: 'la-casa-de-tono' },
    update: {},
    create: {
      name: 'La Casa de Tono',
      slug: 'la-casa-de-tono',
      description: 'Autentica cocina mexicana con los mejores pozoles de la ciudad',
      phone: '+52 55 1234 5678',
      email: 'contacto@casadetono.mx',
      priceRange: '$$',
      rating: 4.5,
      isActive: true,
      openingYear: 1995,
    },
  });

  const restaurant2 = await prisma.restaurant.upsert({
    where: { slug: 'sushi-zen' },
    update: {},
    create: {
      name: 'Sushi Zen',
      slug: 'sushi-zen',
      description: 'La mejor experiencia de sushi japones en un ambiente minimalista',
      phone: '+52 55 8765 4321',
      email: 'reservaciones@sushizen.mx',
      priceRange: '$$$',
      rating: 4.8,
      isActive: true,
      openingYear: 2010,
    },
  });

  const restaurant3 = await prisma.restaurant.upsert({
    where: { slug: 'la-trattoria' },
    update: {},
    create: {
      name: 'La Trattoria',
      slug: 'la-trattoria',
      description: 'Pasta fresca y pizzas artesanales al estilo italiano',
      phone: '+52 55 2468 1357',
      email: 'info@latrattoria.mx',
      priceRange: '$$',
      rating: 4.3,
      isActive: true,
      openingYear: 2005,
    },
  });

  const restaurant4 = await prisma.restaurant.upsert({
    where: { slug: 'burger-palace' },
    update: {},
    create: {
      name: 'Burger Palace',
      slug: 'burger-palace',
      description: 'Las mejores hamburguesas gourmet con ingredientes premium',
      phone: '+52 55 3333 4444',
      email: 'hola@burgerpalace.mx',
      priceRange: '$$',
      rating: 4.2,
      isActive: true,
      openingYear: 2018,
    },
  });

  const restaurant5 = await prisma.restaurant.upsert({
    where: { slug: 'el-pescador' },
    update: {},
    create: {
      name: 'El Pescador',
      slug: 'el-pescador',
      description: 'Mariscos frescos directamente del Pacifico mexicano',
      phone: '+52 55 5555 6666',
      email: 'reservas@elpescador.mx',
      priceRange: '$$$',
      rating: 4.6,
      isActive: true,
      openingYear: 2000,
    },
  });

  const restaurant6 = await prisma.restaurant.upsert({
    where: { slug: 'dragon-dorado' },
    update: {},
    create: {
      name: 'Dragon Dorado',
      slug: 'dragon-dorado',
      description: 'Autentica cocina cantonesa preparada por chefs de Hong Kong',
      phone: '+52 55 7777 8888',
      email: 'info@dragondorado.mx',
      priceRange: '$$',
      rating: 4.4,
      isActive: true,
      openingYear: 2012,
    },
  });

  const restaurant7 = await prisma.restaurant.upsert({
    where: { slug: 'cevicheria-lima' },
    update: {},
    create: {
      name: 'Cevicheria Lima',
      slug: 'cevicheria-lima',
      description: 'Los autenticos sabores de Peru con ceviches y tiraditos frescos',
      phone: '+52 55 9999 0000',
      email: 'contacto@cevicherialima.mx',
      priceRange: '$$$',
      rating: 4.7,
      isActive: true,
      openingYear: 2015,
    },
  });

  const restaurant8 = await prisma.restaurant.upsert({
    where: { slug: 'le-petit-bistro' },
    update: {},
    create: {
      name: 'Le Petit Bistro',
      slug: 'le-petit-bistro',
      description: 'Refinada cocina francesa en un ambiente intimo y elegante',
      phone: '+52 55 1111 2222',
      email: 'reservations@lepetitbistro.mx',
      priceRange: '$$$$',
      rating: 4.9,
      isActive: true,
      openingYear: 2008,
    },
  });

  const restaurant9 = await prisma.restaurant.upsert({
    where: { slug: 'verde-natural' },
    update: {},
    create: {
      name: 'Verde Natural',
      slug: 'verde-natural',
      description: 'Cocina vegetariana y vegana con ingredientes organicos locales',
      phone: '+52 55 4444 5555',
      email: 'hola@verdenatural.mx',
      priceRange: '$$',
      rating: 4.5,
      isActive: true,
      openingYear: 2020,
    },
  });

  const restaurants = [restaurant1, restaurant2, restaurant3, restaurant4, restaurant5, restaurant6, restaurant7, restaurant8, restaurant9];
  console.log(`✅ ${restaurants.length} restaurantes creados`);

  // ===========================================
  // 3. CATEGORIAS DE RESTAURANTES
  // ===========================================
  console.log('🔗 Asignando categorias a restaurantes...');

  const categoryAssignments = [
    { restaurant: restaurant1, categoryIndex: 0, isPrimary: true }, // La Casa de Tono - Mexicana
    { restaurant: restaurant2, categoryIndex: 2, isPrimary: true }, // Sushi Zen - Japonesa
    { restaurant: restaurant3, categoryIndex: 1, isPrimary: true }, // La Trattoria - Italiana
    { restaurant: restaurant4, categoryIndex: 3, isPrimary: true }, // Burger Palace - Americana
    { restaurant: restaurant5, categoryIndex: 4, isPrimary: true }, // El Pescador - Mariscos
    { restaurant: restaurant6, categoryIndex: 5, isPrimary: true }, // Dragon Dorado - China
    { restaurant: restaurant7, categoryIndex: 6, isPrimary: true }, // Cevicheria Lima - Peruana
    { restaurant: restaurant7, categoryIndex: 4, isPrimary: false }, // Cevicheria Lima - Mariscos
    { restaurant: restaurant8, categoryIndex: 7, isPrimary: true }, // Le Petit Bistro - Francesa
    { restaurant: restaurant9, categoryIndex: 8, isPrimary: true }, // Verde Natural - Vegetariana
    { restaurant: restaurant9, categoryIndex: 9, isPrimary: false }, // Verde Natural - Cafeteria
  ];

  for (const assignment of categoryAssignments) {
    await prisma.restaurantCategory.upsert({
      where: {
        restaurantId_categoryId: {
          restaurantId: assignment.restaurant.id,
          categoryId: categories[assignment.categoryIndex].id,
        },
      },
      update: {},
      create: {
        restaurantId: assignment.restaurant.id,
        categoryId: categories[assignment.categoryIndex].id,
        isPrimary: assignment.isPrimary,
      },
    });
  }

  console.log('✅ Categorias asignadas');

  // ===========================================
  // 4. DIRECCIONES (9 direcciones principales + 3 secundarias)
  // ===========================================
  console.log('📍 Creando direcciones...');

  const addressData = [
    { id: 'addr-1', restaurantId: restaurant1.id, streetAddress: 'Av. Insurgentes Sur 1234', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '03100', isMain: true },
    { id: 'addr-2', restaurantId: restaurant2.id, streetAddress: 'Masaryk 456, Polanco', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '11560', isMain: true },
    { id: 'addr-3', restaurantId: restaurant3.id, streetAddress: 'Calle Roma 789, Roma Norte', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '06700', isMain: true },
    { id: 'addr-4', restaurantId: restaurant4.id, streetAddress: 'Av. Revolucion 321, San Angel', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '01000', isMain: true },
    { id: 'addr-5', restaurantId: restaurant5.id, streetAddress: 'Blvd. de la Luz 567, Jardines', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '01900', isMain: true },
    { id: 'addr-6', restaurantId: restaurant6.id, streetAddress: 'Calle Dolores 88, Centro', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '06050', isMain: true },
    { id: 'addr-7', restaurantId: restaurant7.id, streetAddress: 'Av. Presidente Masaryk 111', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '11560', isMain: true },
    { id: 'addr-8', restaurantId: restaurant8.id, streetAddress: 'Calle Campos Eliseos 222', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '11560', isMain: true },
    { id: 'addr-9', restaurantId: restaurant9.id, streetAddress: 'Av. Amsterdam 333, Condesa', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '06100', isMain: true },
    { id: 'addr-10', restaurantId: restaurant1.id, streetAddress: 'Av. Coyoacan 1500, Del Valle', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '03100', isMain: false },
    { id: 'addr-11', restaurantId: restaurant2.id, streetAddress: 'Av. Santa Fe 400, Santa Fe', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '01210', isMain: false },
    { id: 'addr-12', restaurantId: restaurant4.id, streetAddress: 'Centro Comercial Perisur Local 45', city: 'Ciudad de Mexico', stateProvince: 'CDMX', postalCode: '14010', isMain: false },
  ];

  for (const addr of addressData) {
    await prisma.address.upsert({
      where: { id: addr.id },
      update: {},
      create: {
        id: addr.id,
        restaurantId: addr.restaurantId,
        streetAddress: addr.streetAddress,
        city: addr.city,
        stateProvince: addr.stateProvince,
        postalCode: addr.postalCode,
        country: 'Mexico',
        isMain: addr.isMain,
      },
    });
  }

  console.log('✅ 12 direcciones creadas');

  // ===========================================
  // 5. HORARIOS (para todos los restaurantes)
  // ===========================================
  console.log('🕐 Creando horarios...');

  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]; // Domingo a Sabado
  const scheduleConfigs = [
    { restaurant: restaurant1, openTime: '08:00', closeTime: '22:00', closedDays: [] },
    { restaurant: restaurant2, openTime: '13:00', closeTime: '23:00', closedDays: [1] }, // Cerrado lunes
    { restaurant: restaurant3, openTime: '12:00', closeTime: '23:00', closedDays: [] },
    { restaurant: restaurant4, openTime: '11:00', closeTime: '22:00', closedDays: [] },
    { restaurant: restaurant5, openTime: '11:00', closeTime: '20:00', closedDays: [1] }, // Cerrado lunes
    { restaurant: restaurant6, openTime: '12:00', closeTime: '22:00', closedDays: [] },
    { restaurant: restaurant7, openTime: '12:00', closeTime: '21:00', closedDays: [0] }, // Cerrado domingo
    { restaurant: restaurant8, openTime: '19:00', closeTime: '23:30', closedDays: [0, 1] }, // Cerrado domingo y lunes
    { restaurant: restaurant9, openTime: '07:00', closeTime: '21:00', closedDays: [] },
  ];

  for (const config of scheduleConfigs) {
    for (const day of daysOfWeek) {
      const isClosed = config.closedDays.includes(day);
      await prisma.schedule.upsert({
        where: {
          restaurantId_dayOfWeek: {
            restaurantId: config.restaurant.id,
            dayOfWeek: day,
          },
        },
        update: {},
        create: {
          restaurantId: config.restaurant.id,
          dayOfWeek: day,
          openTime: isClosed ? null : config.openTime,
          closeTime: isClosed ? null : config.closeTime,
          isClosed: isClosed,
        },
      });
    }
  }

  console.log('✅ 63 horarios creados');

  // ===========================================
  // 6. PRODUCTOS (30+ productos)
  // ===========================================
  console.log('🍔 Creando productos...');

  // Productos para La Casa de Tono
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant1.id, name: 'Pozole Rojo', description: 'Pozole tradicional con carne de cerdo', price: 145.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant1.id, name: 'Pozole Verde', description: 'Pozole con salsa verde de pepita', price: 155.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant1.id, name: 'Tacos de Carnitas', description: 'Orden de 4 tacos de carnitas', price: 85.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant1.id, name: 'Enchiladas Suizas', description: 'Enchiladas con salsa verde y crema', price: 120.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant1.id, name: 'Agua de Horchata', description: 'Vaso de agua fresca (500ml)', price: 35.00, category: 'bebida', isAvailable: true },
      { restaurantId: restaurant1.id, name: 'Flan Napolitano', description: 'Flan casero con caramelo', price: 55.00, category: 'postre', isAvailable: true },
    ],
  });

  // Productos para Sushi Zen
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant2.id, name: 'Roll Dragon', description: 'Roll de camaron tempura con aguacate', price: 285.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant2.id, name: 'Sashimi Mixto', description: '12 piezas de sashimi fresco', price: 350.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant2.id, name: 'Roll Philadelphia', description: 'Roll de salmon y queso crema', price: 195.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant2.id, name: 'Ramen Tonkotsu', description: 'Ramen de cerdo con huevo', price: 225.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant2.id, name: 'Edamames', description: 'Vainas de soya con sal de mar', price: 75.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant2.id, name: 'Sake Caliente', description: 'Botella de sake premium', price: 320.00, category: 'bebida', isAvailable: true },
    ],
  });

  // Productos para La Trattoria
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant3.id, name: 'Pizza Margherita', description: 'Tomate, mozzarella y albahaca', price: 195.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant3.id, name: 'Pizza Quattro Formaggi', description: 'Cuatro quesos italianos', price: 235.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant3.id, name: 'Pasta Carbonara', description: 'Spaghetti con guanciale y huevo', price: 175.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant3.id, name: 'Lasagna Bolognesa', description: 'Lasagna tradicional con ragu', price: 195.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant3.id, name: 'Tiramisu', description: 'Postre clasico con cafe y mascarpone', price: 95.00, category: 'postre', isAvailable: true },
      { restaurantId: restaurant3.id, name: 'Vino Chianti', description: 'Copa de vino tinto italiano', price: 125.00, category: 'bebida', isAvailable: true },
    ],
  });

  // Productos para Burger Palace
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant4.id, name: 'Classic Burger', description: 'Hamburguesa clasica con queso cheddar', price: 165.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant4.id, name: 'Bacon BBQ Burger', description: 'Con tocino y salsa BBQ', price: 195.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant4.id, name: 'Mushroom Swiss', description: 'Con champinones y queso suizo', price: 185.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant4.id, name: 'Papas Fritas', description: 'Porcion grande de papas', price: 65.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant4.id, name: 'Malteada de Chocolate', description: 'Malteada cremosa de chocolate', price: 85.00, category: 'bebida', isAvailable: true },
    ],
  });

  // Productos para El Pescador
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant5.id, name: 'Ceviche de Camaron', description: 'Camarones frescos en jugo de limon', price: 195.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant5.id, name: 'Pescado Zarandeado', description: 'Huachinango a las brasas', price: 385.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant5.id, name: 'Aguachile Rojo', description: 'Camarones en salsa de chile', price: 225.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant5.id, name: 'Tacos de Marlin', description: 'Orden de 3 tacos', price: 145.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant5.id, name: 'Michelada', description: 'Cerveza preparada con mariscos', price: 95.00, category: 'bebida', isAvailable: true },
    ],
  });

  // Productos para Dragon Dorado
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant6.id, name: 'Pato Pekin', description: 'Pato laqueado tradicional', price: 485.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant6.id, name: 'Dim Sum Variado', description: 'Canasta de 8 piezas surtidas', price: 175.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant6.id, name: 'Arroz Frito Especial', description: 'Con camaron y cerdo', price: 145.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant6.id, name: 'Chow Mein', description: 'Fideos salteados con vegetales', price: 135.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant6.id, name: 'Te de Jazmin', description: 'Tetera de te premium', price: 55.00, category: 'bebida', isAvailable: true },
    ],
  });

  // Productos para Cevicheria Lima
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant7.id, name: 'Ceviche Clasico', description: 'Pescado del dia en leche de tigre', price: 225.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant7.id, name: 'Tiradito Nikkei', description: 'Pescado con salsa de aji y soya', price: 245.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant7.id, name: 'Lomo Saltado', description: 'Lomo de res salteado con papas', price: 275.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant7.id, name: 'Causa Limena', description: 'Papa amarilla con atun y palta', price: 155.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant7.id, name: 'Pisco Sour', description: 'Coctel peruano tradicional', price: 145.00, category: 'bebida', isAvailable: true },
    ],
  });

  // Productos para Le Petit Bistro
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant8.id, name: 'Foie Gras', description: 'Con reduccion de Oporto', price: 485.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant8.id, name: 'Filet Mignon', description: 'Con salsa de pimienta verde', price: 595.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant8.id, name: 'Bouillabaisse', description: 'Sopa de mariscos provenzal', price: 425.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant8.id, name: 'Creme Brulee', description: 'Postre clasico frances', price: 145.00, category: 'postre', isAvailable: true },
      { restaurantId: restaurant8.id, name: 'Champagne Brut', description: 'Copa de champagne frances', price: 285.00, category: 'bebida', isAvailable: true },
    ],
  });

  // Productos para Verde Natural
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { restaurantId: restaurant9.id, name: 'Buddha Bowl', description: 'Quinoa, aguacate y vegetales asados', price: 175.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant9.id, name: 'Hamburguesa Vegana', description: 'Con proteina de soya y hongos', price: 165.00, category: 'plato fuerte', isAvailable: true },
      { restaurantId: restaurant9.id, name: 'Ensalada Verde', description: 'Mix de hojas con aderezo de tahini', price: 125.00, category: 'entrada', isAvailable: true },
      { restaurantId: restaurant9.id, name: 'Smoothie Energetico', description: 'Platano, espinaca y proteina', price: 85.00, category: 'bebida', isAvailable: true },
      { restaurantId: restaurant9.id, name: 'Cheesecake Vegano', description: 'Base de nuez y crema de anacardo', price: 95.00, category: 'postre', isAvailable: true },
    ],
  });

  console.log('✅ 48 productos creados');

  // ===========================================
  // 7. MESAS (30+ mesas)
  // ===========================================
  console.log('🪑 Creando mesas...');

  const tableData = [
    // La Casa de Tono (6 mesas)
    { restaurantId: restaurant1.id, tableNumber: 'M-01', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant1.id, tableNumber: 'M-02', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant1.id, tableNumber: 'M-03', capacity: 6, location: 'Terraza' },
    { restaurantId: restaurant1.id, tableNumber: 'M-04', capacity: 2, location: 'Barra' },
    { restaurantId: restaurant1.id, tableNumber: 'M-05', capacity: 8, location: 'Privado' },
    { restaurantId: restaurant1.id, tableNumber: 'M-06', capacity: 4, location: 'Interior' },
    // Sushi Zen (5 mesas)
    { restaurantId: restaurant2.id, tableNumber: 'T-01', capacity: 2, location: 'Barra Sushi' },
    { restaurantId: restaurant2.id, tableNumber: 'T-02', capacity: 4, location: 'Salon' },
    { restaurantId: restaurant2.id, tableNumber: 'T-03', capacity: 6, location: 'Privado' },
    { restaurantId: restaurant2.id, tableNumber: 'T-04', capacity: 2, location: 'Barra Sushi' },
    { restaurantId: restaurant2.id, tableNumber: 'T-05', capacity: 8, location: 'Tatami' },
    // La Trattoria (4 mesas)
    { restaurantId: restaurant3.id, tableNumber: 'A-01', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant3.id, tableNumber: 'A-02', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant3.id, tableNumber: 'A-03', capacity: 8, location: 'Terraza' },
    { restaurantId: restaurant3.id, tableNumber: 'A-04', capacity: 2, location: 'Ventana' },
    // Burger Palace (4 mesas)
    { restaurantId: restaurant4.id, tableNumber: 'B-01', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant4.id, tableNumber: 'B-02', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant4.id, tableNumber: 'B-03', capacity: 6, location: 'Terraza' },
    { restaurantId: restaurant4.id, tableNumber: 'B-04', capacity: 2, location: 'Barra' },
    // El Pescador (4 mesas)
    { restaurantId: restaurant5.id, tableNumber: 'P-01', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant5.id, tableNumber: 'P-02', capacity: 6, location: 'Terraza' },
    { restaurantId: restaurant5.id, tableNumber: 'P-03', capacity: 8, location: 'Privado' },
    { restaurantId: restaurant5.id, tableNumber: 'P-04', capacity: 4, location: 'Interior' },
    // Dragon Dorado (3 mesas)
    { restaurantId: restaurant6.id, tableNumber: 'D-01', capacity: 6, location: 'Salon Principal' },
    { restaurantId: restaurant6.id, tableNumber: 'D-02', capacity: 10, location: 'Mesa Redonda' },
    { restaurantId: restaurant6.id, tableNumber: 'D-03', capacity: 4, location: 'Interior' },
    // Cevicheria Lima (3 mesas)
    { restaurantId: restaurant7.id, tableNumber: 'L-01', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant7.id, tableNumber: 'L-02', capacity: 2, location: 'Barra' },
    { restaurantId: restaurant7.id, tableNumber: 'L-03', capacity: 6, location: 'Terraza' },
    // Le Petit Bistro (3 mesas)
    { restaurantId: restaurant8.id, tableNumber: 'F-01', capacity: 2, location: 'Intimo' },
    { restaurantId: restaurant8.id, tableNumber: 'F-02', capacity: 4, location: 'Salon' },
    { restaurantId: restaurant8.id, tableNumber: 'F-03', capacity: 6, location: 'Privado' },
    // Verde Natural (3 mesas)
    { restaurantId: restaurant9.id, tableNumber: 'V-01', capacity: 4, location: 'Interior' },
    { restaurantId: restaurant9.id, tableNumber: 'V-02', capacity: 2, location: 'Barra' },
    { restaurantId: restaurant9.id, tableNumber: 'V-03', capacity: 6, location: 'Jardin' },
  ];

  await prisma.table.createMany({
    skipDuplicates: true,
    data: tableData.map(t => ({ ...t, isAvailable: true, isActive: true })),
  });

  console.log(`✅ ${tableData.length} mesas creadas`);

  // ===========================================
  // 8. MENUS (18 menus)
  // ===========================================
  console.log('📋 Creando menus...');

  const menuData = [
    { restaurantId: restaurant1.id, name: 'Menu Principal', description: 'Nuestra carta completa', displayOrder: 1 },
    { restaurantId: restaurant1.id, name: 'Menu de Temporada', description: 'Platillos especiales', displayOrder: 2 },
    { restaurantId: restaurant2.id, name: 'Menu Omakase', description: 'Seleccion del chef', displayOrder: 1 },
    { restaurantId: restaurant2.id, name: 'Menu a la Carta', description: 'Sushi y rolls individuales', displayOrder: 2 },
    { restaurantId: restaurant3.id, name: 'Menu del Dia', description: 'Menu ejecutivo', displayOrder: 1 },
    { restaurantId: restaurant3.id, name: 'Menu Italiano', description: 'Platos tradicionales', displayOrder: 2 },
    { restaurantId: restaurant4.id, name: 'Menu Burgers', description: 'Todas nuestras hamburguesas', displayOrder: 1 },
    { restaurantId: restaurant4.id, name: 'Menu Combos', description: 'Hamburguesa + papas + bebida', displayOrder: 2 },
    { restaurantId: restaurant5.id, name: 'Menu Mariscos', description: 'Pescados y mariscos frescos', displayOrder: 1 },
    { restaurantId: restaurant5.id, name: 'Menu Ceviches', description: 'Variedad de ceviches', displayOrder: 2 },
    { restaurantId: restaurant6.id, name: 'Menu Cantones', description: 'Cocina cantonesa tradicional', displayOrder: 1 },
    { restaurantId: restaurant6.id, name: 'Menu Dim Sum', description: 'Variedad de dim sum', displayOrder: 2 },
    { restaurantId: restaurant7.id, name: 'Menu Degustacion', description: 'Experiencia peruana completa', displayOrder: 1 },
    { restaurantId: restaurant7.id, name: 'Menu Nikkei', description: 'Fusion peruano-japonesa', displayOrder: 2 },
    { restaurantId: restaurant8.id, name: 'Menu Degustation', description: 'Menu de 7 tiempos', displayOrder: 1 },
    { restaurantId: restaurant8.id, name: 'Menu a la Carte', description: 'Seleccion individual', displayOrder: 2 },
    { restaurantId: restaurant9.id, name: 'Menu Verde', description: 'Opciones vegetarianas', displayOrder: 1 },
    { restaurantId: restaurant9.id, name: 'Menu Vegano', description: 'Sin productos animales', displayOrder: 2 },
  ];

  await prisma.menu.createMany({
    skipDuplicates: true,
    data: menuData.map(m => ({ ...m, isActive: true })),
  });

  console.log(`✅ ${menuData.length} menus creados`);

  // ===========================================
  // 9. USUARIOS (6 usuarios)
  // ===========================================
  console.log('👤 Creando usuarios de prueba...');

  const usersData = [
    { email: 'admin@restaurant.com', firstName: 'Admin', lastName: 'Sistema', role: 'admin', phone: '+52 55 0000 0001' },
    { email: 'gerente@restaurant.com', firstName: 'Carlos', lastName: 'Mendoza', role: 'manager', phone: '+52 55 0000 0002' },
    { email: 'mesero@restaurant.com', firstName: 'Luis', lastName: 'Garcia', role: 'staff', phone: '+52 55 0000 0003' },
    { email: 'cliente@test.com', firstName: 'Ana', lastName: 'Martinez', role: 'customer', phone: '+52 55 1111 2222' },
    { email: 'cliente2@test.com', firstName: 'Roberto', lastName: 'Sanchez', role: 'customer', phone: '+52 55 3333 4444' },
    { email: 'cliente3@test.com', firstName: 'Maria', lastName: 'Lopez', role: 'customer', phone: '+52 55 5555 6666' },
  ];

  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        passwordHash: '$2b$10$placeholder_hash_' + user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        isActive: true,
        isVerified: true,
      },
    });
  }

  console.log(`✅ ${usersData.length} usuarios creados`);

  // ===========================================
  // 10. RESERVACIONES DE EJEMPLO (6 reservaciones)
  // ===========================================
  console.log('📅 Creando reservaciones de ejemplo...');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const reservationsData = [
    { restaurantId: restaurant1.id, guestName: 'Juan Perez', guestEmail: 'juan@email.com', guestPhone: '+52 55 1234 5678', partySize: 4, reservationDate: tomorrow, reservationTime: '14:00', status: 'confirmed' },
    { restaurantId: restaurant2.id, guestName: 'Maria Garcia', guestEmail: 'maria@email.com', guestPhone: '+52 55 8765 4321', partySize: 2, reservationDate: tomorrow, reservationTime: '20:00', status: 'confirmed' },
    { restaurantId: restaurant3.id, guestName: 'Carlos Lopez', guestEmail: 'carlos@email.com', guestPhone: '+52 55 1111 2222', partySize: 6, reservationDate: nextWeek, reservationTime: '19:00', status: 'pending' },
    { restaurantId: restaurant5.id, guestName: 'Ana Martinez', guestEmail: 'ana@email.com', guestPhone: '+52 55 3333 4444', partySize: 4, reservationDate: tomorrow, reservationTime: '13:00', status: 'confirmed' },
    { restaurantId: restaurant7.id, guestName: 'Pedro Ramirez', guestEmail: 'pedro@email.com', guestPhone: '+52 55 5555 6666', partySize: 3, reservationDate: nextWeek, reservationTime: '14:30', status: 'pending' },
    { restaurantId: restaurant8.id, guestName: 'Laura Hernandez', guestEmail: 'laura@email.com', guestPhone: '+52 55 7777 8888', partySize: 2, reservationDate: nextWeek, reservationTime: '20:30', status: 'confirmed' },
  ];

  for (let i = 0; i < reservationsData.length; i++) {
    const res = reservationsData[i];
    await prisma.reservation.upsert({
      where: { id: `res-${i + 1}` },
      update: {},
      create: {
        id: `res-${i + 1}`,
        restaurantId: res.restaurantId,
        guestName: res.guestName,
        guestEmail: res.guestEmail,
        guestPhone: res.guestPhone,
        partySize: res.partySize,
        reservationDate: res.reservationDate,
        reservationTime: res.reservationTime,
        status: res.status,
      },
    });
  }

  console.log(`✅ ${reservationsData.length} reservaciones creadas`);

  // ===========================================
  // 11. RESENAS DE EJEMPLO (9 resenas)
  // ===========================================
  console.log('⭐ Creando resenas de ejemplo...');

  // Obtener usuarios clientes
  const cliente1 = await prisma.user.findUnique({ where: { email: 'cliente@test.com' } });
  const cliente2 = await prisma.user.findUnique({ where: { email: 'cliente2@test.com' } });
  const cliente3 = await prisma.user.findUnique({ where: { email: 'cliente3@test.com' } });

  if (cliente1 && cliente2 && cliente3) {
    const reviewsData = [
      { restaurantId: restaurant1.id, userId: cliente1.id, rating: 5, title: 'Excelente pozole!', comment: 'El mejor pozole que he probado en la ciudad.' },
      { restaurantId: restaurant2.id, userId: cliente1.id, rating: 5, title: 'Sushi de calidad', comment: 'Pescado muy fresco y buen servicio.' },
      { restaurantId: restaurant3.id, userId: cliente1.id, rating: 4, title: 'Buena pasta', comment: 'La carbonara estaba deliciosa.' },
      { restaurantId: restaurant1.id, userId: cliente2.id, rating: 4, title: 'Muy recomendable', comment: 'Buen ambiente familiar.' },
      { restaurantId: restaurant4.id, userId: cliente2.id, rating: 4, title: 'Hamburguesas jugosas', comment: 'Las papas podrian mejorar.' },
      { restaurantId: restaurant5.id, userId: cliente2.id, rating: 5, title: 'Mariscos fresquisimos', comment: 'El ceviche estaba increible.' },
      { restaurantId: restaurant7.id, userId: cliente3.id, rating: 5, title: 'Sabores autenticos', comment: 'Como estar en Lima!' },
      { restaurantId: restaurant8.id, userId: cliente3.id, rating: 5, title: 'Alta cocina', comment: 'Experiencia gastronomica unica.' },
      { restaurantId: restaurant9.id, userId: cliente3.id, rating: 4, title: 'Opciones saludables', comment: 'Muy bueno para vegetarianos.' },
    ];

    for (const review of reviewsData) {
      await prisma.review.upsert({
        where: {
          restaurantId_userId: {
            restaurantId: review.restaurantId,
            userId: review.userId,
          },
        },
        update: {},
        create: review,
      });
    }

    console.log(`✅ ${reviewsData.length} resenas creadas`);
  }

  // ===========================================
  // RESUMEN FINAL
  // ===========================================
  console.log('\n========================================');
  console.log('🎉 Seed extendido completado!');
  console.log('========================================');
  console.log('Datos creados:');
  console.log('  - 10 Categorias');
  console.log('  - 9 Restaurantes');
  console.log('  - 12 Direcciones');
  console.log('  - 63 Horarios');
  console.log('  - 48 Productos');
  console.log('  - 35 Mesas');
  console.log('  - 18 Menus');
  console.log('  - 6 Usuarios');
  console.log('  - 6 Reservaciones');
  console.log('  - 9 Resenas');
  console.log('----------------------------------------');
  console.log('  TOTAL: ~216 registros');
  console.log('========================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
