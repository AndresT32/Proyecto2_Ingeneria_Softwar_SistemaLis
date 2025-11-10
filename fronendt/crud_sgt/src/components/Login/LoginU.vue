<template>
  <div class="container mt-5" style="max-width: 400px;">
    <div class="card shadow">
      <div class="card-header text-center bg-primary text-white">
        <h3>Iniciar sesión</h3>
      </div>

      <div class="card-body">
        <div class="form-group mb-3">
          <label for="usuario">Usuario</label>
          <input
            v-model="usuario"
            type="text"
            class="form-control"
            id="usuario"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label for="password">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <button @click="login" class="btn btn-success w-100">Entrar</button>
        <button @click="$router.push({ name: 'RegistrarU' })"
                class="btn btn-secondary w-100 mt-2">
          Registrar usuario
        </button>

        <div v-if="mensaje" class="alert mt-3"
             :class="exito ? 'alert-success' : 'alert-danger'">
          {{ mensaje }}
        </div>
      </div>

      <div class="card-footer text-muted text-center">
        @IngdeSw
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuario: "",
      password: "",
      mensaje: "",
      exito: false,
    };
  },

  methods: {
    async login() {
      try {
        const response = await axios.post("http://127.0.0.1:8081/api/login/users/", {
          accion: "login",
          username: this.usuario,
          password: this.password,
        });

        console.log("Respuesta del servidor:", response.data);

        if (response.data.success) {
          this.mensaje = `Bienvenido, ${response.data.usuario}`;
          this.exito = true;

          // Limpia antes de guardar
          const usuarioActual = response.data.usuario;
          this.password = "";

          // Guarda la sesión
          sessionStorage.setItem(
            "usuario",
            JSON.stringify({ usuario: usuarioActual })
          );

          // Notifica a App.vue
          window.dispatchEvent(new Event("userLoggedIn"));

          // Navega con pequeña pausa para evitar conflictos de router
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 50);

        } else {
          this.mensaje = response.data.error || "Credenciales incorrectas";
          this.exito = false;
        }
      } catch (error) {
        console.error("Error en login:", error);

        if (error.response) {
          if (error.response.status === 401) {
            this.mensaje = "Contraseña incorrecta";
          } else if (error.response.status === 404) {
            this.mensaje = "Usuario no encontrado";
          } else {
            this.mensaje = "Error en el servidor";
          }
        } else {
          this.mensaje = "No se pudo contactar con el servidor";
        }

        this.exito = false;
        this.password = "";
      }
    },
  },
};
</script>
