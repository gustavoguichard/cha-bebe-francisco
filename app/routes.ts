import { get, post, route } from 'remix/routes'

export const routes = route({
  home: '/',
  reservar: post('/presentes/:slug/reservar'),
  desfazer: post('/reservas/:id/desfazer'),
  confirmarPresenca: post('/confirmar-presenca'),
  admin: get('/admin/:chave'),
  removerReserva: post('/admin/:chave/reservas/:id/remover'),
  removerPresenca: post('/admin/:chave/presencas/:id/remover'),
  og: get('/og'),
})
