import { DevilFruit } from '../types'

export const DEVIL_FRUITS: DevilFruit[] = [
  // Logia
  { id: 'magu', name: 'Magu Magu no Mi', type: 'Logia', user: 'Sakazuki (Akainu)', power: 'Controla y se transforma en magma', arc: 'Marineford', emoji: '🌋' },
  { id: 'hie', name: 'Hie Hie no Mi', type: 'Logia', user: 'Kuzan (Aokiji)', power: 'Controla y se transforma en hielo', arc: 'Marineford', emoji: '❄️' },
  { id: 'pika', name: 'Pika Pika no Mi', type: 'Logia', user: 'Borsalino (Kizaru)', power: 'Controla y se transforma en luz', arc: 'Sabaody', emoji: '✨' },
  { id: 'mera', name: 'Mera Mera no Mi', type: 'Logia', user: 'Sabo (antes Ace)', power: 'Controla y se transforma en fuego', arc: 'Marineford / Dressrosa', emoji: '🔥' },
  { id: 'yami', name: 'Yami Yami no Mi', type: 'Logia', user: 'Marshall D. Teach', power: 'Controla la oscuridad y anula Frutas del Diablo', arc: 'Marineford', emoji: '🌑' },
  { id: 'moku', name: 'Moku Moku no Mi', type: 'Logia', user: 'Smoker', power: 'Controla y se transforma en humo', arc: 'Loguetown', emoji: '💨' },
  { id: 'suna', name: 'Suna Suna no Mi', type: 'Logia', user: 'Crocodile', power: 'Controla y se transforma en arena', arc: 'Alabasta', emoji: '🏜️' },
  { id: 'goro', name: 'Goro Goro no Mi', type: 'Logia', user: 'Enel', power: 'Controla y se transforma en relámpago', arc: 'Skypiea', emoji: '⚡' },
  { id: 'yuki', name: 'Yuki Yuki no Mi', type: 'Logia', user: 'Monet', power: 'Controla y se transforma en nieve', arc: 'Punk Hazard', emoji: '❄️' },
  { id: 'gasu', name: 'Gasu Gasu no Mi', type: 'Logia', user: 'Caesar Clown', power: 'Controla y se transforma en gas', arc: 'Punk Hazard', emoji: '☁️' },
  { id: 'mori', name: 'Mori Mori no Mi', type: 'Logia', user: 'Ryokugyu (Aramaki)', power: 'Controla vegetación y absorbe nutrientes', arc: 'Egghead', emoji: '🌿' },

  // Paramecia
  { id: 'gomu', name: 'Hito Hito no Mi: Nika', type: 'Paramecia', user: 'Monkey D. Luffy', power: 'Cuerpo de goma, Gear Five (Sun God)', arc: 'Romance Dawn / Wano', emoji: '⚡' },
  { id: 'ope', name: 'Ope Ope no Mi', type: 'Paramecia', user: 'Trafalgar Law', power: 'Crea una "Room" donde puede manipular todo', arc: 'Dressrosa', emoji: '💊' },
  { id: 'ito', name: 'Ito Ito no Mi', type: 'Paramecia', user: 'Donquixote Doflamingo', power: 'Crea y controla hilos', arc: 'Dressrosa', emoji: '🕸️' },
  { id: 'hana', name: 'Hana Hana no Mi', type: 'Paramecia', user: 'Nico Robin', power: 'Hace florecer partes del cuerpo en cualquier superficie', arc: 'Alabasta', emoji: '🌸' },
  { id: 'gura', name: 'Gura Gura no Mi', type: 'Paramecia', user: 'Barbanegra (antes Barba Blanca)', power: 'Crea terremotos y vibraciones sísmicas', arc: 'Marineford', emoji: '🌊' },
  { id: 'mero', name: 'Mero Mero no Mi', type: 'Paramecia', user: 'Boa Hancock', power: 'Petrifica a quienes sienten atracción por ella', arc: 'Amazon Lily', emoji: '💘' },
  { id: 'bari', name: 'Bari Bari no Mi', type: 'Paramecia', user: 'Bartolomeo', power: 'Crea barreras indestructibles', arc: 'Dressrosa', emoji: '🛡️' },
  { id: 'kage', name: 'Kage Kage no Mi', type: 'Paramecia', user: 'Gecko Moria', power: 'Controla sombras, las roba e inserta en cadáveres', arc: 'Thriller Bark', emoji: '👥' },
  { id: 'horo', name: 'Horo Horo no Mi', type: 'Paramecia', user: 'Perona', power: 'Crea fantasmas que generan depresión extrema', arc: 'Thriller Bark', emoji: '👻' },
  { id: 'soru', name: 'Soru Soru no Mi', type: 'Paramecia', user: 'Big Mom (Charlotte Linlin)', power: 'Manipula almas, roba años de vida', arc: 'Whole Cake Island', emoji: '👻' },
  { id: 'buku', name: 'Buku Buku no Mi', type: 'Paramecia', user: 'Charlotte Mont-d\'Or', power: 'Puede meter personas y objetos dentro de libros', arc: 'Whole Cake Island', emoji: '📚' },
  { id: 'nagi', name: 'Nagi Nagi no Mi', type: 'Paramecia', user: 'Donquixote Rosinante (Corazon)', power: 'Crea zonas de silencio absoluto', arc: 'Dressrosa (flashback)', emoji: '🤫' },
  { id: 'pamu', name: 'Pamu Pamu no Mi', type: 'Paramecia', user: 'Gladius', power: 'Puede inflar y hacer explotar cualquier cosa', arc: 'Dressrosa', emoji: '💥' },
  { id: 'zushi', name: 'Zushi Zushi no Mi', type: 'Paramecia', user: 'Fujitora (Issho)', power: 'Manipula la gravedad', arc: 'Dressrosa', emoji: '🪐' },
  { id: 'mochi', name: 'Mochi Mochi no Mi', type: 'Paramecia', user: 'Charlotte Katakuri', power: 'Controla mochi (se comporta casi como Logia)', arc: 'Whole Cake Island', emoji: '🍡' },
  { id: 'jiki', name: 'Jiki Jiki no Mi', type: 'Paramecia', user: 'Eustass "Captain" Kid', power: 'Controla y atrae objetos metálicos', arc: 'Sabaody / Wano', emoji: '🧲' },

  // Zoan
  { id: 'tori_phoenix', name: 'Tori Tori no Mi: Fénix', type: 'Zoan', user: 'Marco el Fénix', power: 'Se transforma en fénix, llamas azules regenerativas', arc: 'Marineford', emoji: '🔵' },
  { id: 'inu_okuchi', name: 'Inu Inu no Mi: Okuchi no Makami', type: 'Zoan', user: 'Yamato', power: 'Se transforma en lobo divino legendario con poderes de hielo', arc: 'Wano', emoji: '🐺' },
  { id: 'uo_seiryuu', name: 'Uo Uo no Mi: Seiryuu', type: 'Zoan', user: 'Kaido', power: 'Se transforma en dragón serpiente celestial', arc: 'Wano', emoji: '🐉' },
  { id: 'hito_chopper', name: 'Hito Hito no Mi', type: 'Zoan', user: 'Tony Tony Chopper', power: 'Reno que puede adoptar forma humana y variantes', arc: 'Drum Island', emoji: '🦌' },
  { id: 'neko_leopard', name: 'Neko Neko no Mi: Leopardo', type: 'Zoan', user: 'Rob Lucci', power: 'Se transforma en leopardo de manchas oscuras', arc: 'Enies Lobby', emoji: '🐆' },
  { id: 'zou_mammoth', name: 'Zou Zou no Mi: Mamut', type: 'Zoan', user: 'Jack el Sequía', power: 'Se transforma en mamut prehistórico', arc: 'Zou', emoji: '🦣' },
  { id: 'ryu_ryu_brachiosaurus', name: 'Ryu Ryu no Mi: Braquiosaurio', type: 'Zoan', user: 'Queen la Plaga', power: 'Se transforma en braquiosaurio', arc: 'Wano', emoji: '🦕' },
]
