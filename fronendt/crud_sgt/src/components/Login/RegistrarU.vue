<template>
  <div class="container mt-5" style="max-width: 400px;">
    <div class="card shadow">
      <div class="card-header text-center bg-success text-white">
        <h4>Registrar Usuario</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="registrar">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input v-model="usuario" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>          
          <button class="btn btn-success w-100" type="submit">Registrar</button>
        </form>

        <div
          v-if="mensaje"
          class="alert mt-3"
          :class="{'alert-success': exito, 'alert-danger': !exito}"
        >
          {{ mensaje }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: "",
      password: "",
      rol: "",
      mensaje: "",
      exito: false,
    };
  },
  methods: {
    registrar() {
  fetch("http://127.0.0.1:8081/api/login/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      accion: "registro",       
      username: this.usuario,
      password: this.password
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        this.mensaje = "Usuario registrado correctamente";
        this.exito = true;

        this.usuario = "";
        this.password = "";

        setTimeout(() => {
          this.$router.push({ name: "LoginU" });
        }, 1500);

      } else {
        this.mensaje = data.error || "No se pudo registrar";
        this.exito = false;
      }
    })
    .catch(() => {
      this.mensaje = "Error de conexión al servidor";
      this.exito = false;
    });
}


  },
};
</script>
