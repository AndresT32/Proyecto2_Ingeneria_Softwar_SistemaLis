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

        <div v-if="mensaje" class="alert mt-3" :class="exito ? 'alert-success' : 'alert-danger'">
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
  name: "LoginView",
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
      try {//puerto del backend cambiado a 8081
        const response = await axios.post("http://127.0.0.1:8081/api/login/users/", {
          username: this.usuario,
          password: this.password,
        });

        console.log("Respuesta del servidor:", response.data);

        if (response.data.success) {
          this.mensaje = `Bienvenido, ${response.data.usuario}`;
          this.exito = true;

          // Guardar sesión en localStorage
          localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
                window.dispatchEvent(new Event("userLoggedIn"));

          // Redirigir a la vista de pacientes
          this.$router.push({ name: "home" });
        } else {
          this.mensaje = response.data.error || "Credenciales incorrectas";
          this.exito = false;
        }
      } catch (error) {
        console.error("Error en login:", error);

          if (error.response) {
            // El servidor respondió, pero con un código fuera del rango 2xx
            if (error.response.status === 401) {
              this.mensaje = error.response.data.error || "Contraseña incorrecta";
            } else if (error.response.status === 404) {
              this.mensaje = "Usuario no encontrado";
            } else {
              this.mensaje = "Error del servidor: " + (error.response.data.error || "Intenta más tarde");
            }
          } else if (error.request) {
            // No hubo respuesta del servidor
            this.mensaje = "No se pudo contactar con el servidor";
          } else {
            // Algo más falló al configurar la solicitud
            this.mensaje = "Error al preparar la solicitud";
          }

          this.exito = false;
        }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.card {
  border-radius: 12px;
}
.btn {
  border-radius: 8px;
}
</style>