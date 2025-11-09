<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-warning text-dark text-center">
        <h4>Editar Laboratorista</h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="actualizarRegistro">
          <div class="mb-3">
            <label>Código (no editable)</label>
            <input :value="codigoResp" class="form-control" disabled />
          </div>

          <div class="mb-3">
            <label>Nombre</label>
            <input v-model="laboratorista.nombre" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Apellido</label>
            <input v-model="laboratorista.apellido" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Profesión</label>
            <input v-model="laboratorista.profesion" class="form-control" />
          </div>

          <div class="mb-3">
            <label>Teléfono</label>
            <input v-model="laboratorista.telefono" class="form-control" />
          </div>

          <div class="btn-group w-100" role="group">
            <button type="submit" class="btn btn-success">Guardar</button>
            <router-link :to="{ name: 'ListLaboratoristas' }" class="btn btn-secondary">
              Cancelar
            </router-link>
          </div>
        </form>
      </div>

      <div class="card-footer text-center text-muted">@IngdeSw</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditarLaboratorista",
  props: ["cod_laboratorista"],
  data() {
    return {
      laboratorista: {
        nombre: "",
        apellido: "",
        profesion: "",
        telefono: "",
      },
    };
  },
  computed: {
    codigoResp() {
      return this.cod_laboratorista || this.$route.params.cod_laboratorista;
    },
  },
  created() {
    this.obtenerLaboratorista();
  },
  methods: {
    async obtenerLaboratorista() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8081/api/laboratoristas/laboratoristas/${this.codigoResp}/`
        );

        if (res.data.message === "Success" && res.data.laboratorista) {
          this.laboratorista = res.data.laboratorista;
        } else {
          alert("Laboratorista no encontrado");
          this.$router.push({ name: "ListLaboratoristas" });
        }
      } catch (error) {
        console.error(error);
        alert("Error al obtener datos del laboratorista");
      }
    },

    async actualizarRegistro() {
      try {
        const res = await axios.put(
          `http://127.0.0.1:8081/api/laboratoristas/laboratoristas/${this.codigoResp}/`,
          this.laboratorista
        );

        if (res.data.message === "Success") {
          alert("Laboratorista actualizado correctamente");
          this.$router.push({ name: "ListLaboratoristas" });
        } else {
          alert(res.data.message || "Error al actualizar");
        }
      } catch (error) {
        console.error(error);
        alert("Error al actualizar laboratorista");
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
