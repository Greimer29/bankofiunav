<template>
  <div class="q-ma-sm">
    <q-card class="q-pa-xl">
      <div class="text-center text-h6 text-grey-7">
        Configuracion cuenta en Divisas
      </div>
      <q-form class="q-pa-md q-gutter-md">
        <q-select
          v-model="config.operacion"
          filled
          label="Selecciona tu operacion"
        />
        <q-select
          v-model="config.solicitud"
          filled
          label="Selecciona tu solicitud"
        />
        <div class="text-center q-gutter-md">
          <q-btn>Aceptar</q-btn>
        </div>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ConfigDiviComponent",
  setup() {
    const config = ref({
      operacion: "",
      solicitud: "",
    });
    return {
      config,
    };
  },
});
</script>
