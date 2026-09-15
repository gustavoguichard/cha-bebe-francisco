export const event = {
  babyName: 'Francisco',
  title: 'Chá de bênçãos do Francisco',
  date: new Date('2026-09-19T00:00:00-03:00'),
  dateLabel: '19 de setembro',
  weekdayLabel: 'sábado',
  time: '16h30',
  adminKey: process.env.ADMIN_KEY || 'bastidores-do-chico',
  venue: {
    name: 'Povo em Pé',
    address: 'Av. Beira Rio, 1135',
    neighborhood: 'Belém Novo, Porto Alegre',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Povo+em+P%C3%A9%2C+Av.+Beira+Rio%2C+1135+-+Bel%C3%A9m+Novo%2C+Porto+Alegre',
    wazeUrl: 'https://waze.com/ul?ll=-30.212493,-51.1965999&navigate=yes',
    description: 'Um refúgio verde à beira do Guaíba.',
  },
  delivery: {
    name: 'Gabriel de Menezes Guichard',
    street: 'Rua Thiago Borges da Rosa, 156',
    neighborhood: 'Vila Esperança, Praia da Ribanceira',
    city: 'Imbituba, SC',
    cep: '88780-000',
  },
  pix: {
    key: '48991109013',
    keyLabel: '(48) 99110-9013',
    holder: 'Ana Laura Prass', whatsappUrl: 'https://wa.me/5548991109013',
  },
}
