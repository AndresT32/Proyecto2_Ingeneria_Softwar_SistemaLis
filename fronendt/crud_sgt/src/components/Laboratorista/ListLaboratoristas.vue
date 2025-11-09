<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white text-center">
        <h4>Lista de Laboratoristas</h4>
      </div>

      <div class="card-body">


        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Profesión</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="lab in laboratoristas" :key="lab.cod_laboratorista">
              <td>{{ lab.cod_laboratorista }}</td>
              <td>{{ lab.nombre }}</td>
              <td>{{ lab.apellido }}</td>
              <td>{{ lab.profesion }}</td>
              <td>{{ lab.telefono }}</td>
              <td>
                <div class="btn-group">
                  <router-link
                    :to="{ name: 'EditarLaboratorista', params: { cod_laboratorista: lab.cod_laboratorista } }"
                    class="btn btn-warning btn-sm"
                  >
                    Editar
                  </router-link>

                  <button
                    @click="borrarLaboratorista(lab.cod_laboratorista)"
                    class="btn btn-danger btn-sm"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-footer text-center text-muted">@IngdeSw</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListLaboratoristas",
  data() {
    return {
      laboratoristas: [],
    };
  },
  created() {
    this.consultarLaboratoristas();
  },
  methods: {
    async consultarLaboratoristas() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8081/api/laboratoristas/laboratoristas/"
        );
        this.laboratoristas = res.data.laboratoristas || [];
      } catch (error) {
        console.error("Error al consultar laboratoristas:", error);
      }
    },

    async borrarLaboratorista(codigo) {
      if (!confirm("¿Seguro que deseas eliminar este laboratorista?")) return;

      try {
        const res = await axios.delete(
          `http://127.0.0.1:8081/api/laboratoristas/laboratoristas/${codigo}/`
        );
        if (res.data.message === "Deleted successfully") {
          alert("Laboratorista eliminado correctamente");
          this.consultarLaboratoristas();
        } else {
          alert("Error al eliminar: " + res.data.message);
        }
      } catch (error) {
        console.error("Error al borrar laboratorista:", error);
        alert("Error de conexión al eliminar");
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
.table th,
.table td {
  vertical-align: middle;
}
</style>
