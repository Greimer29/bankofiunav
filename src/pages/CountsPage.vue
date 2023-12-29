<template>
  <q-card flat dense bordered>
    <q-card-section>
      <div class="text-h5 text-grey-8">{{ count.name }}</div>
      <div class="text-grey-5">{{ count.description }}</div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div>
        <span><q-icon name="home"></q-icon></span> saldo total
      </div>
      <div class="font-large" style="font-size: xx-large">
        {{ count.initialBalance }}<span style="font-size: small"> bs</span>
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="q-gutter-md">
        <q-btn label="depositar" color="primary" @click="operar(1)" />
        <q-btn label="retirar" color="primary" @click="operar(2)" />
        <q-btn label="transferir" color="primary" @click="operar(3)" />
      </div>
    </q-card-section>
  </q-card>
  <q-table class="q-mt-md" title="Movimientos realizados" :rows="movRow">
  </q-table>
  <q-toolbar class="q-mt-xl bg-red-1">
    <q-toolbar-title>
      <div class="text-grey-7">Zona Roja</div>
    </q-toolbar-title>
    <div class="q-gutter-md">
      <q-btn
        style="font-size: smaller"
        label="Editar Cuenta"
        color="red-5"
        @click="pliOpen()"
      />
      <q-btn
        style="font-size: smaller"
        label="Borrar Cuenta"
        color="negative"
        @click="pliDelete()"
      />
    </div>
  </q-toolbar>

  <q-dialog v-model="op">
    <q-card style="width: 300px; height: 400px">
      <q-card-section class="q--none">
        <div class="text-h6 text-center">Ingrese datos de la cuenta</div>
        <!-- <q-btn close-popup /> -->
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-select
          v-show="transferir"
          label="Cuenta de destino"
          v-model="cuentaDestino"
          :options="cuentaDestinOP"
          option-label="name"
          emit-value
          map-options
          filled
        ></q-select>
        <q-input
          v-model="operacion.monto"
          type="number"
          filled
          label="Ingrese monto"
        />
        <q-input v-model="operacion.descripcion" filled label="Descripcion" />
      </q-card-section>

      <q-card-actions align="center">
        <div class="full-width text-center">
          <q-btn
            style="width: 70%"
            label="confirmar"
            color="green-6"
            @click="confirmar(operacion)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="edit">
    <q-card style="width: 300px; height: 400px">
      <q-card-section class="q--none">
        <div class="text-h6 text-center">Editar datos de {{ count.name }}</div>
        <!-- <q-btn close-popup /> -->
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-input v-model="count.name" filled label="Nombre de la cuenta" />
        <q-input v-model="count.description" filled label="Descripcion" />
        <q-input
          v-model="count.initialBalance"
          type="number"
          filled
          label="Monto inicial"
        />
      </q-card-section>

      <q-card-actions align="center">
        <div class="full-width text-center">
          <q-btn
            style="width: 70%"
            label="Guardar"
            color="positive"
            @click="editCount(count)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="borrar">
    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-center">
          Estas seguro que deseas borrar: "{{ count.name }}" de tu lista de
          cuentas?
        </div>
        <!-- <q-btn close-popup /> -->
      </q-card-section>
      <q-card-actions align="center">
        <div class="full-width text-center">
          <q-btn
            style="width: 70%"
            label="Eliminar Cuenta"
            color="negative"
            @click="eliminar(idCount)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "CountsPage",
  props: {},
  components: {},
  setup() {
    const $q = useQuasar();
    const today = new Date();
    const $route = useRoute();
    const transferir = ref(false);
    const op = ref(false);
    const edit = ref(false);
    const borrar = ref(false);
    const idCount = $route.params.id;
    const router = useRouter();
    const cuentaDestinOP = ref([]);
    const cuentaDestino = ref();
    const count = ref({});
    const newCount = ref({
      name: count.value.name,
      desc: count.value.desc,
      initBalan: count.value.initBalan,
    });
    const movRow = ref([]);
    const operacion = ref({
      fecha: "",
      countId: "",
      tipo: "",
      descripcion: "",
      monto: "",
    });

    const pliOpen = () => {
      edit.value = true;
    };
    const pliDelete = () => {
      borrar.value = true;
    };

    const eliminar = (id) => {
      api.delete(`accounts/${idCount}`).then((res) => {
        console.log(res.data);
        borrar.value = false;
        router.replace("/main");
      });
    };

    const editCount = (cuenta) => {
      api
        .patch(`accounts/${idCount}`, {
          name: cuenta.name,
          description: cuenta.desc,
          initial_balance: cuenta.initBalan,
        })
        .then((res) => {
          console.log(res.data);
          getCount();
          edit.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const operar = (tipo) => {
      op.value = true;
      if (tipo === 1) {
        operacion.value.tipo = 1;
        transferir.value = false;
      }
      if (tipo === 2) {
        operacion.value.tipo = 2;
        transferir.value = false;
      }
      if (tipo === 3) {
        operacion.value.tipo = 3;
        transferir.value = true;
      }
    };

    const confirmar = (operacion) => {
      const tran = () => {
        api
          .post(`transactions`, {
            date: today,
            account_id: idCount,
            type: operacion.tipo,
            description: operacion.descripcion,
            amount: operacion.monto,
          })
          .then((res) => {
            console.log(res.data);
            op.value = false;
            getTransactions();
          })
          .catch((err) => {
            console.log(err);
            op.value = false;
          });
      };

      if (operacion.tipo === 1) {
        tran();
        api
          .patch(`accounts/${idCount}`, {
            name: count.value.name,
            description: count.value.description,
            initial_balance:
              parseInt(count.value.initialBalance) + parseInt(operacion.monto),
          })
          .then((res) => {
            $q.notify({
              message: "Transacion realizada exitosamente",
              color: "positive",
              position: "top",
            });
            console.log(
              parseInt(count.value.initialBalance) + parseInt(operacion.monto)
            );
            console.log(res.data);
            getCount();
          })
          .catch((err) => {
            $q.notify({
              message: "Algo salio mal, revisa la consola",
              color: "negative",
              position: "top",
            });
            console.log(err);
            op.value = false;
          });
      }
      if (operacion.tipo === 2) {
        if (parseInt(operacion.monto) < parseInt(count.value.initialBalance)) {
          tran();
          api
            .patch(`accounts/${idCount}`, {
              name: count.value.name,
              description: count.value.description,
              initial_balance:
                parseInt(count.value.initialBalance) -
                parseInt(operacion.monto),
            })
            .then((res) => {
              console.log(res.data);
              getCount();
            })
            .catch((err) => {
              console.log(err);
              op.value = false;
            });
        } else {
          $q.notify({
            message: "Saldo Insufucuente",
            color: "negative",
            position: "top",
          });
        }
      }
      if (operacion.tipo === 3) {
        console.log(cuentaDestino.value.id);
        if (
          parseInt(operacion.monto) <
          parseInt(cuentaDestino.value.initialBalance)
        ) {
          tran();
          api
            .patch(`accounts/${cuentaDestino.value.id}`, {
              name: cuentaDestino.value.name,
              description: cuentaDestino.value.description,
              initial_balance:
                parseInt(cuentaDestino.value.initialBalance) +
                parseInt(operacion.monto),
            })
            .then((res) => {
              console.log(res.data);
              getCount();
            })
            .catch((err) => {
              console.log(err);
              op.value = false;
            });
          api
            .patch(`accounts/${idCount}`, {
              name: count.value.name,
              description: count.value.description,
              initial_balance:
                parseInt(count.value.initialBalance) -
                parseInt(operacion.monto),
            })
            .then((res) => {
              console.log(res.data);
              getCount();
            })
            .catch((err) => {
              console.log(err);
              op.value = false;
            });
        } else {
          $q.notify({
            message: "Saldo Insufucuente",
            color: "negative",
            position: "top",
          });
        }
      }
    };

    const getCounts = () => {
      api.get(`accounts`).then((res) => {
        cuentaDestinOP.value = res.data;
      });
    };
    const getCount = () => {
      api.get(`accounts/${idCount}`).then((res) => {
        count.value = res.data;
      });
    };
    const getTransactions = () => {
      api.get(`transactions/${idCount}/2023-12-01/2023-12-31`).then((res) => {
        movRow.value = res.data;
      });
    };

    onMounted(() => {
      getCounts();
      getCount();
      getTransactions();
    });
    onBeforeRouteUpdate(() => {
      getCount();
      console.log("a");
    });

    return {
      count,
      movRow,
      newCount,
      edit,
      borrar,
      op,
      operacion,
      transferir,
      pliOpen,
      pliDelete,
      operar,
      confirmar,
      eliminar,
      editCount,
      getCount,
      cuentaDestino,
      cuentaDestinOP,
    };
  },
});
</script>
