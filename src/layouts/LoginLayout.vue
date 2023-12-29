<template>
  <q-banner class="text-center q-mt-xl">
    <div class="q-gutter-md">
      <q-img style="height: 100px; width: 35%" src="public/titlewhite.jpg" />
      <div class="q-mt-xs" style="width: 100%">
        <q-btn
          style="width: 30%"
          color="blue"
          label="Ingresar"
          @click="login = true"
        />
      </div>
    </div>
  </q-banner>
  <div class="q-pa-md">
    <q-carousel
      style="height: 710px"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      :autoplay="true"
    >
      <q-carousel-slide :name="1">
        <q-img src="public/Venezuela-Esequibo.jpg" />
      </q-carousel-slide>
      <q-carousel-slide :name="2">
        <q-img src="public/esequibomoment.jpg" />
      </q-carousel-slide>
    </q-carousel>
  </div>
  <div class="text-center" style="color: rgb(78, 78, 78); font-size: large">
    Esta app esta probada y certificada por:
  </div>
  <div class="flex flex-center q-gutter-xs">
    <q-card
      v-for="(users, index) in aproved"
      :key="index"
      class="no-shadow"
      bordered
      style="min-width: 30%"
    >
      <q-card-section class="text-center">
        <q-avatar size="100px" class="shadow-10">
          <img :src="users.avatar" />
        </q-avatar>
      </q-card-section>

      <q-card-section class="q-pt-none text-center">
        <div class="text-h6 text-grey-8">
          {{ users.username }}
        </div>
        <div class="text-grey-8" caption>{{ users.des }}</div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          v-for="(btn, index) in users.redes"
          :key="index"
          flat
          round
          :icon="btn.icon"
          class="bg-indigo-7 text-white"
        />
      </q-card-actions>
    </q-card>
  </div>

  <q-dialog v-model="login">
    <q-card style="width: 300px; height: 300px">
      <q-card-section class="q--none">
        <div class="text-h6 text-center">Ingrese sus credenciales</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-input v-model="user.email" filled label="Usuario" />
        <q-input v-model="user.password" filled label="Contrasena" />
      </q-card-section>

      <q-card-actions align="center">
        <div class="full-width text-center">
          <q-btn
            style="width: 150px"
            label="entrar"
            color="primary"
            @click="entrar(user)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar, LocalStorage } from "quasar";

export default {
  setup() {
    const router = useRouter();
    const { $q } = useQuasar();
    const login = ref(false);
    const dates = ref("");
    const user = ref({
      email: "user@app.com",
      password: "123456",
    });
    const aproved = ref([
      {
        username: "Leito Acuña",
        des: "Proximo nemesio",
        avatar: "public/leito.jpg",
        redes: [{ icon: "facebook" }, { icon: "email" }, { icon: "telegram" }],
      },
      {
        username: "Zorry foxie",
        des: "estudiante universitario promedio",
        avatar: "public/foxuser.jpg",
        redes: [{ icon: "facebook" }, { icon: "email" }, { icon: "telegram" }],
      },
      {
        username: "Pugberto Ramirez",
        des: "Defensor de los derechos de la mujer",
        avatar: "public/userdog.jpg",
        redes: [{ icon: "facebook" }, { icon: "email" }, { icon: "telegram" }],
      },
    ]);

    const entrar = (user) => {
      api
        .post("login", { email: user.email, password: user.password })
        .then((res) => {
          LocalStorage.set("DataUser", res.data);
          const dates = LocalStorage.getItem("DataUSer");
          console.log(dates);
          router.replace("/main");
        })
        .catch((err) => {
          console.log(err);
        });
      login.value = false;
    };
    return {
      user,
      slide: ref(2),
      aproved,
      login,
      entrar,
    };
  },
};
</script>
