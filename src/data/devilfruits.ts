import { DevilFruit } from '../types'

export const DEVIL_FRUITS: DevilFruit[] = [
  // Logia
  { id: 'magu', name: 'Magu Magu no Mi', type: 'Logia', user: 'Sakazuki (Akainu)', power: 'Controls and transforms into magma', arc: 'Marineford', emoji: '🌋' },
  { id: 'hie', name: 'Hie Hie no Mi', type: 'Logia', user: 'Kuzan (Aokiji)', power: 'Controls and transforms into ice', arc: 'Marineford', emoji: '❄️' },
  { id: 'pika', name: 'Pika Pika no Mi', type: 'Logia', user: 'Borsalino (Kizaru)', power: 'Controls and transforms into light', arc: 'Sabaody', emoji: '✨' },
  { id: 'mera', name: 'Mera Mera no Mi', type: 'Logia', user: 'Sabo (formerly Ace)', power: 'Controls and transforms into fire', arc: 'Marineford / Dressrosa', emoji: '🔥' },
  { id: 'yami', name: 'Yami Yami no Mi', type: 'Logia', user: 'Marshall D. Teach', power: 'Controls darkness and nullifies other Devil Fruits', arc: 'Marineford', emoji: '🌑' },
  { id: 'moku', name: 'Moku Moku no Mi', type: 'Logia', user: 'Smoker', power: 'Controls and transforms into smoke', arc: 'Loguetown', emoji: '💨' },
  { id: 'suna', name: 'Suna Suna no Mi', type: 'Logia', user: 'Crocodile', power: 'Controls and transforms into sand', arc: 'Alabasta', emoji: '🏜️' },
  { id: 'goro', name: 'Goro Goro no Mi', type: 'Logia', user: 'Enel', power: 'Controls and transforms into lightning', arc: 'Skypiea', emoji: '⚡' },
  { id: 'yuki', name: 'Yuki Yuki no Mi', type: 'Logia', user: 'Monet', power: 'Controls and transforms into snow', arc: 'Punk Hazard', emoji: '❄️' },
  { id: 'gasu', name: 'Gasu Gasu no Mi', type: 'Logia', user: 'Caesar Clown', power: 'Controls and transforms into gas', arc: 'Punk Hazard', emoji: '☁️' },
  { id: 'mori', name: 'Mori Mori no Mi', type: 'Logia', user: 'Ryokugyu (Aramaki)', power: 'Controls vegetation and absorbs nutrients from victims', arc: 'Egghead', emoji: '🌿' },

  // Paramecia
  { id: 'gomu', name: 'Hito Hito no Mi: Nika', type: 'Paramecia', user: 'Monkey D. Luffy', power: 'Rubber body, Gear Five (Sun God Nika)', arc: 'Romance Dawn / Wano', emoji: '⚡' },
  { id: 'ope', name: 'Ope Ope no Mi', type: 'Paramecia', user: 'Trafalgar Law', power: 'Creates a "Room" in which he can manipulate everything', arc: 'Dressrosa', emoji: '💊' },
  { id: 'ito', name: 'Ito Ito no Mi', type: 'Paramecia', user: 'Donquixote Doflamingo', power: 'Creates and controls razor-sharp strings', arc: 'Dressrosa', emoji: '🕸️' },
  { id: 'hana', name: 'Hana Hana no Mi', type: 'Paramecia', user: 'Nico Robin', power: 'Sprouts copies of body parts on any surface', arc: 'Alabasta', emoji: '🌸' },
  { id: 'gura', name: 'Gura Gura no Mi', type: 'Paramecia', user: 'Blackbeard (formerly Whitebeard)', power: 'Creates earthquakes and seismic vibrations', arc: 'Marineford', emoji: '🌊' },
  { id: 'mero', name: 'Mero Mero no Mi', type: 'Paramecia', user: 'Boa Hancock', power: 'Petrifies anyone who feels attraction toward her', arc: 'Amazon Lily', emoji: '💘' },
  { id: 'bari', name: 'Bari Bari no Mi', type: 'Paramecia', user: 'Bartolomeo', power: 'Creates indestructible barriers', arc: 'Dressrosa', emoji: '🛡️' },
  { id: 'kage', name: 'Kage Kage no Mi', type: 'Paramecia', user: 'Gecko Moria', power: 'Controls shadows — steals them and inserts them into corpses', arc: 'Thriller Bark', emoji: '👥' },
  { id: 'horo', name: 'Horo Horo no Mi', type: 'Paramecia', user: 'Perona', power: 'Creates ghosts that fill targets with extreme despair', arc: 'Thriller Bark', emoji: '👻' },
  { id: 'soru', name: 'Soru Soru no Mi', type: 'Paramecia', user: 'Big Mom (Charlotte Linlin)', power: 'Manipulates souls and steals years of life', arc: 'Whole Cake Island', emoji: '👻' },
  { id: 'buku', name: 'Buku Buku no Mi', type: 'Paramecia', user: "Charlotte Mont-d'Or", power: 'Can trap people and objects inside books', arc: 'Whole Cake Island', emoji: '📚' },
  { id: 'nagi', name: 'Nagi Nagi no Mi', type: 'Paramecia', user: 'Donquixote Rosinante (Corazon)', power: 'Creates zones of absolute silence', arc: 'Dressrosa (flashback)', emoji: '🤫' },
  { id: 'pamu', name: 'Pamu Pamu no Mi', type: 'Paramecia', user: 'Gladius', power: 'Can inflate and explode anything', arc: 'Dressrosa', emoji: '💥' },
  { id: 'zushi', name: 'Zushi Zushi no Mi', type: 'Paramecia', user: 'Fujitora (Issho)', power: 'Manipulates gravity', arc: 'Dressrosa', emoji: '🪐' },
  { id: 'mochi', name: 'Mochi Mochi no Mi', type: 'Paramecia', user: 'Charlotte Katakuri', power: 'Controls mochi (behaves almost like a Logia)', arc: 'Whole Cake Island', emoji: '🍡' },
  { id: 'jiki', name: 'Jiki Jiki no Mi', type: 'Paramecia', user: 'Eustass "Captain" Kid', power: 'Controls and attracts metallic objects', arc: 'Sabaody / Wano', emoji: '🧲' },

  // Zoan
  { id: 'tori_phoenix', name: 'Tori Tori no Mi: Phoenix', type: 'Zoan', user: 'Marco the Phoenix', power: 'Transforms into a phoenix; regenerative blue flames', arc: 'Marineford', emoji: '🔵' },
  { id: 'inu_okuchi', name: 'Inu Inu no Mi: Okuchi no Makami', type: 'Zoan', user: 'Yamato', power: 'Transforms into a legendary divine wolf with ice powers', arc: 'Wano', emoji: '🐺' },
  { id: 'uo_seiryuu', name: 'Uo Uo no Mi: Seiryuu', type: 'Zoan', user: 'Kaido', power: 'Transforms into a celestial serpent dragon', arc: 'Wano', emoji: '🐉' },
  { id: 'hito_chopper', name: 'Hito Hito no Mi', type: 'Zoan', user: 'Tony Tony Chopper', power: 'Reindeer that can take human form and various hybrid forms', arc: 'Drum Island', emoji: '🦌' },
  { id: 'neko_leopard', name: 'Neko Neko no Mi: Leopard', type: 'Zoan', user: 'Rob Lucci', power: 'Transforms into a dark-spotted leopard', arc: 'Enies Lobby', emoji: '🐆' },
  { id: 'zou_mammoth', name: 'Zou Zou no Mi: Mammoth', type: 'Zoan', user: 'Jack the Drought', power: 'Transforms into a prehistoric mammoth', arc: 'Zou', emoji: '🦣' },
  { id: 'ryu_ryu_brachiosaurus', name: 'Ryu Ryu no Mi: Brachiosaurus', type: 'Zoan', user: 'Queen the Plague', power: 'Transforms into a brachiosaurus', arc: 'Wano', emoji: '🦕' },
]
