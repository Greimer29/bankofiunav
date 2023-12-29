<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #2f547e">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-img
            src="public/titleblue.jpg"
            style="height: 35px; width: 150px"
          />
        </q-toolbar-title>

        <div>{{ data }}</div>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-center">
          Menu de navegacion principal
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :counts="countList"
          :solicitudes="soli"
          :divisas="divi"
          @addCount="count"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { api } from "src/boot/axios";
import { LocalStorage, useQuasar } from "quasar";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Principal",
    caption: "Menu principal",
    icon: "home",
    link: "/main",
  },
];

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  emits: ["addCount"],
  setup() {
    const $q = useQuasar();
    const data = LocalStorage.getItem("DataUSer");
    const leftDrawerOpen = ref(false);
    const countList = ref([]);

    const soli = ref([
      { name: "CrediDigital", link: "credidigital" },
      { name: "Referencias", link: "referencias" },
    ]);
    const divi = ref([
      { name: "Apertura", link: "apertura" },
      { name: "Configuraciones", link: "configuraciones" },
    ]);

    const count = (cuenta) => {
      api
        .post("accounts", {
          name: cuenta.name,
          description: cuenta.desc,
          initial_balance: cuenta.initBalan,
        })
        .then((res) => {
          console.log(res.data);
          getCounts();
          $q.notify({
            message: "Cuenta creada exitosamente",
            color: "positive",
            position: "top",
          });
        })
        .catch((err) => {
          console.log(err);
          $q.notify({
            message: "Algo salio mal, revisa la consola",
            color: "negative",
            position: "top",
          });
        });
      console.log(cuenta);
    };
    const getCounts = () => {
      api.get("accounts").then((res) => {
        countList.value = res.data;
      });
    };
    onMounted(() => {
      getCounts();
    });

    return {
      count,
      soli,
      divi,
      data,
      countList,
      getCounts,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
