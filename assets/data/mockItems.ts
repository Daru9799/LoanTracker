import { Item } from '../../src/types/item';

export const mockItems: Item[] = [
  {
    id: '1',
    owner_id: 'user_123',
    borrower_user_id: 'user_456',
    title: 'Wiertarka Bosch',
    image_url: 'https://media.adeo.com/media/2884334/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds',
    quantity: 1,
    category_id: 'tools',
    description: 'Mocna wiertarka z udarem',
    borrowed_at: new Date('2025-07-01'),
    return_at: new Date('2025-07-15'),
    is_returned: false,
  },
  {
    id: '2',
    owner_id: 'user_123',
    borrower_contact_id: 'contact_789',
    title: 'Książka "Finansowy Ninja"',
    quantity: 1,
    category_id: 'books',
    borrowed_at: new Date('2025-06-20'),
    return_at: new Date('2025-07-05'),
    is_returned: false,
  },
  {
    id: '3',
    owner_id: 'user_456',
    borrower_user_id: 'user_123',
    title: 'GoPro Hero 8',
    image_url: 'https://m.media-amazon.com/images/I/51y0lP0BEEL.jpg',
    quantity: 1,
    category_id: 'electronics',
    borrowed_at: new Date('2025-07-03'),
    return_at: new Date('2025-07-12'),
    is_returned: false,
  },
  {
    id: '4',
    owner_id: 'user_789',
    borrower_user_id: 'user_456',
    title: 'Rower górski',
    image_url: 'https://sprint-rowery.pl/media/catalog/product/r/o/rower-elektryczny-trek-top-fuel-8-gx-axs-t-type-czarny-01_1.jpg',
    quantity: 1,
    category_id: 'sports',
    description: 'Lekki rower górski na trudny teren',
    borrowed_at: new Date('2025-06-28'),
    return_at: new Date('2025-07-20'),
    is_returned: false,
  },
  {
    id: '5',
    owner_id: 'user_123',
    borrower_contact_id: 'contact_456',
    title: 'Lampa biurkowa',
    quantity: 2,
    category_id: 'home',
    description: 'Regulowana lampa LED',
    borrowed_at: new Date('2025-07-04'),
    return_at: new Date('2025-07-18'),
    is_returned: false,
  },
  {
    id: '6',
    owner_id: 'user_456',
    borrower_user_id: 'user_789',
    title: 'Kamera cyfrowa Nikon',
    image_url: 'https://example.com/nikon.jpg',
    quantity: 1,
    category_id: 'electronics',
    borrowed_at: new Date('2025-06-15'),
    return_at: new Date('2025-07-01'),
    is_returned: true,
  },
  {
    id: '7',
    owner_id: 'user_789',
    borrower_contact_id: 'contact_123',
    title: 'Zestaw narzędzi',
    quantity: 1,
    category_id: 'tools',
    description: 'Kompletny zestaw narzędzi dla majsterkowicza',
    borrowed_at: new Date('2025-07-05'),
    return_at: new Date('2025-07-22'),
    is_returned: false,
  },
  {
    id: '8',
    owner_id: 'user_123',
    borrower_user_id: 'user_789',
    title: 'Konsola PlayStation 5',
    image_url: 'https://example.com/ps5.jpg',
    quantity: 1,
    category_id: 'electronics',
    borrowed_at: new Date('2025-06-30'),
    is_returned: false,
  },
  {
    id: '9',
    owner_id: 'user_456',
    borrower_contact_id: 'contact_789',
    title: 'Książka "Clean Code"',
    quantity: 1,
    category_id: 'books',
    borrowed_at: new Date('2025-07-02'),
    return_at: new Date('2025-07-16'),
    is_returned: false,
  },
  {
    id: '10',
    owner_id: 'user_789',
    borrower_user_id: 'user_123',
    title: 'Deska do snowboardu',
    image_url: 'https://example.com/snowboard.jpg',
    quantity: 1,
    category_id: 'sports',
    borrowed_at: new Date('2025-07-01'),
    return_at: new Date('2025-07-20'),
    is_returned: false,
  },
  {
    id: '11',
    owner_id: 'user_123',
    borrower_user_id: 'user_456',
    title: 'Laptop Dell XPS',
    image_url: 'https://example.com/dellxps.jpg',
    quantity: 1,
    category_id: 'electronics',
    borrowed_at: new Date('2025-06-01'),
    return_at: new Date('2025-06-15'),
    is_returned: false,
  },
  {
    id: '12',
    owner_id: 'user_456',
    borrower_contact_id: 'contact_123',
    title: 'Książka "Harry Potter"',
    quantity: 1,
    category_id: 'books',
    borrowed_at: new Date('2025-05-20'),
    return_at: new Date('2025-06-05'),
    is_returned: true,
  },
  {
    id: '13',
    owner_id: 'user_789',
    borrower_user_id: 'user_123',
    title: 'Zestaw do malowania',
    image_url: 'https://example.com/painting-set.jpg',
    quantity: 1,
    category_id: 'hobby',
    borrowed_at: new Date('2025-06-10'),
    return_at: new Date('2025-06-25'),
    is_returned: true,
  },
  {
    id: '14',
    owner_id: 'user_123',
    borrower_contact_id: 'contact_789',
    title: 'Projektor multimedialny',
    image_url: 'https://example.com/projector.jpg',
    quantity: 1,
    category_id: 'electronics',
    borrowed_at: new Date('2025-05-30'),
    return_at: new Date('2025-06-14'),
    is_returned: true,
  },
  {
    id: '15',
    owner_id: 'user_123',
    borrower_user_id: 'user_456',
    title: 'Projektor Epson',
    image_url: 'https://example.com/epson.jpg',
    quantity: 1,
    category_id: 'electronics',
    description: 'Projektor HD z funkcją Wi-Fi',
    borrowed_at: new Date('2025-06-01'),
    return_at: new Date('2025-06-10'),
    is_returned: true,
  },
  {
    id: '16',
    owner_id: 'user_789',
    borrower_contact_id: 'contact_111',
    title: 'Młotek Stanley',
    quantity: 1,
    category_id: 'tools',
    borrowed_at: new Date('2025-05-15'),
    return_at: new Date('2025-05-25'),
    is_returned: true,
  },
  {
    id: '17',
    owner_id: 'user_456',
    borrower_user_id: 'user_123',
    title: 'Gra planszowa Catan',
    image_url: 'https://example.com/catan.jpg',
    quantity: 1,
    category_id: 'hobby',
    borrowed_at: new Date('2025-06-05'),
    return_at: new Date('2025-06-20'),
    is_returned: true,
  },
  {
    id: '18',
    owner_id: 'user_321',
    borrower_contact_id: 'contact_222',
    title: 'Książka "Złodziejka książek"',
    quantity: 1,
    category_id: 'books',
    borrowed_at: new Date('2025-05-10'),
    return_at: new Date('2025-05-30'),
    is_returned: true,
  },
  {
    id: '19',
    owner_id: 'user_654',
    borrower_user_id: 'user_789',
    title: 'Tablet graficzny Wacom',
    image_url: 'https://example.com/wacom.jpg',
    quantity: 1,
    category_id: 'electronics',
    borrowed_at: new Date('2025-06-12'),
    return_at: new Date('2025-06-22'),
    is_returned: true,
  }
];