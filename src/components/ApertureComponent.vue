<template>
  <div class="q-ma-sm">
    <q-card class="q-pa-xl">
      <div class="text-center text-h6 text-grey-7">
        Apertura de cuentas en divisas
      </div>
      <q-form class="q-pa-md q-gutter-md">
        <div>Seleccione el tipo de cuenta</div>
        <q-select filled />
        <div>Seleccione la oficina tutora</div>
        <q-select filled label="Estado" />
        <q-select filled label="Agencia" />
        <q-input filled label="Direccion" />
        <div class="text-center">
          <q-checkbox v-model="aceptCondicions" label="Aceptar Condiciones" />
        </div>
        <div class="text-center q-gutter-md">
          <q-btn>Continuar</q-btn>
          <q-btn>Cancelar</q-btn>
        </div>
      </q-form></q-card
    >
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ApertureComponent",
  setup() {
    return {
      aceptCondicions: ref(false),
    };
  },
});
</script>
