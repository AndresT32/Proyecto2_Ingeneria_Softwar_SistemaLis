<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white text-center">
        <h4>Lista de Resultados</h4>
      </div>

      <div class="card-body">
        <div class="d-flex justify-content-end mb-3">
          <router-link :to="{ name: 'CrearResultadosMedicosView' }" class="btn btn-success">
            ➕ Nuevo Resultado
          </router-link>
        </div>

        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Código Ingreso</th> <!-- ✅ nueva columna -->
              <th>Paciente</th>
              <th>Laboratorista</th>
              <th>HDL</th>
              <th>LDL</th>
              <th>Triglicéridos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in resultados" :key="r.id_resultado">
              <td>{{ r.id_resultado }}</td>
              <td>{{ r.cod_ingreso__cod_ingreso }}</td> <!-- ✅ nuevo campo -->
              <td>{{ r.cod_ingreso__nombre }} {{ r.cod_ingreso__apellido }}</td>
              <td>{{ r.cod_laboratorista__nombre }} {{ r.cod_laboratorista__apellido }}</td>
              <td>{{ r.hdl }}</td>
              <td>{{ r.ldl }}</td>
              <td>{{ r.trigliceridos }}</td>
              <td>
                <div class="btn-group">
                  <router-link
                    :to="{ name: 'EditarResultadosMedicosView', params: { ID_EM: r.id_resultado } }"
                    class="btn btn-warning btn-sm"
                  >Editar</router-link>
                  <button @click="borrarResultado(r.id_resultado)" class="btn btn-danger btn-sm">
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
  data() {
    return { resultados: [] };
  },
  created() {
    this.consultarResultados();
  },
  methods: {
    async consultarResultados() {
      const res = await axios.get("http://127.0.0.1:8081/api/resultados/resultados/");
      this.resultados = res.data.resultados || [];
    },
    async borrarResultado(id) {
      if (!confirm("¿Deseas eliminar este resultado?")) return;
      const res = await axios.delete(`http://127.0.0.1:8081/api/resultados/resultados/${id}/`);
      if (res.data.message === "Deleted successfully") {
        alert("Resultado eliminado correctamente");
        this.consultarResultados();
      } else alert(res.data.message);
    },
  },
};
</script>
