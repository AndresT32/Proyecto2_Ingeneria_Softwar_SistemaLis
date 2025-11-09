import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import EditarPacienteView from '../components/Paciente/EditarPacienteView.vue'
import PacienteView from '../components/Paciente/PacienteView.vue'
import CrearPacienteView from '../components/Paciente/CrearPacienteView.vue'
import CrearResultadosMedicosView from '../components/ResultadosMedicos/CrearResultadosMedicosView.vue'
import EditarResultadosMedicosView from '../components/ResultadosMedicos/EditarResultadosMedicosView.vue'
import ResultadosMedicosView from '../components/ResultadosMedicos/ResultadosMedicosView.vue'
import LoginU from '@/components/Login/LoginU.vue'
import RegistrarU from '@/components/Login/RegistrarU.vue'
import CrearLaboratorista from '@/components/Laboratorista/CrearLaboratorista.vue'
import EditarLaboratorista from '@/components/Laboratorista/EditarLaboratorista.vue'
import ListLaboratoristas from '@/components/Laboratorista/ListLaboratoristas.vue'

const routes = [
  // Root: redirige CONDICIONALMENTE según localStorage
  {
    path: '/',
    redirect: () => {
      try {
        const raw = localStorage.getItem('usuario')
        const obj = raw ? JSON.parse(raw) : null
        const loggedIn = !!(obj && Object.keys(obj).length > 0)
        return loggedIn ? '/Home' : '/LoginU'
      } catch (e) {
        return '/LoginU'
      }
    }
  },

  // Home ahora en /Home (no en '/')
  {
    path: '/Home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },

  // Resto de rutas protegidas
  {
    path: '/PacienteView',
    name: 'PacienteView',
    component: PacienteView,
    meta: { requiresAuth: true }
  },
  {
    path: '/CrearPacienteView',
    name: 'CrearPacienteView',
    component: CrearPacienteView,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarPacienteView/:cod_ingreso',
    name: 'EditarPacienteView',
    component: EditarPacienteView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/CrearResultadosMedicosView',
    name: 'CrearResultadosMedicosView',
    component: CrearResultadosMedicosView,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarResultadosMedicosView/:ID_EM',
    name: 'EditarResultadosMedicosView',
    component: EditarResultadosMedicosView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/ResultadosMedicosView',
    name: 'ResultadosMedicosView',
    component: ResultadosMedicosView,
    meta: { requiresAuth: true }
  },
  {
    path: '/ListLaboratoristas',
    name: 'ListLaboratoristas',
    component: ListLaboratoristas,
    meta: { requiresAuth: true }
  },
  {
    path: '/CrearLaboratorista',
    name: 'CrearLaboratorista',
    component: CrearLaboratorista,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarLaboratorista/:cod_laboratorista',
    name: 'EditarLaboratorista',
    component: EditarLaboratorista,
    props: true,
    meta: { requiresAuth: true }
  },

  // Auth pages
  {
    path: '/LoginU',
    name: 'LoginU',
    component: LoginU
  },
  {
    path: '/RegistrarU',
    name: 'RegistrarU',
    component: RegistrarU
  },

  // catch all
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'LoginU' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Guard: protege rutas
router.beforeEach((to, from, next) => {
  // debug rápido (puedes comentar después)
  console.log('[ROUTER] to:', to.path)

  let usuarioRaw = localStorage.getItem('usuario')
  let usuarioObj = null
  try { usuarioObj = usuarioRaw ? JSON.parse(usuarioRaw) : null } catch { usuarioObj = null }
  const isLoggedIn = !!(usuarioObj && Object.keys(usuarioObj).length > 0)
  console.log('[ROUTER] isLoggedIn:', isLoggedIn, 'usuarioObj:', usuarioObj)

  // Si intenta entrar a login/registro y ya está logueado -> Home
  if ((to.path === '/LoginU' || to.path === '/RegistrarU') && isLoggedIn) {
    next('/Home')
    return
  }

  // Si la ruta requiere auth y no está logueado -> Login
  if (to.meta && to.meta.requiresAuth && !isLoggedIn) {
    next('/LoginU')
    return
  }

  next()
})

export default router
