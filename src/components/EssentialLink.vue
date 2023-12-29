<template>
  <q-item tag="a" :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item icon="wallet" label="Divisas">
    <q-list class="q-pl-lg">
      <q-item
        v-for="(divi, index) in divisas"
        :key="index"
        clickable
        tag="a"
        :to="`/divisas/${divi.link}`"
        @click="aa()"
      >
        <q-item-section>
          <q-item-label>{{ divi.name }}</q-item-label>
          <q-item-label caption>{{ divi.link }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
  <q-expansion-item icon="wallet" label="Bolivares">
    <q-list class="q-pl-lg">
      <q-item
        v-for="(count, index) in counts"
        :key="index"
        clickable
        tag="a"
        :to="`/counts/${count.id}`"
        @click="aa()"
      >
        <q-item-section v-if="icon" avatar>
          <q-icon name="money" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ count.name }}</q-item-label>
          <q-item-label caption>{{ count.description }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="text-center">
        <q-btn
          label="anadir cuenta"
          flat
          color="positive"
          @click="newCount = true"
        />
      </q-item>
    </q-list>
  </q-expansion-item>
  <q-item tag="a" to="/">
    <q-item-section v-if="icon" avatar>
      <q-icon name="logout" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Salir</q-item-label>
    </q-item-section>
  </q-item>

  <q-dialog v-model="newCount">
    <q-card style="width: 300px; height: 400px">
      <q-card-section class="q--none">
        <div class="text-h6 text-center">Ingrese datos de la cuenta</div>
        <!-- <q-btn close-popup /> -->
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-input v-model="count.name" filled label="Nombre de la cuenta" />
        <q-input v-model="count.desc" filled label="Descripcion" />
        <q-input
          v-model="count.initBalan"
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
            @click="add(count)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },
    counts: {
      type: Array,
    },
    icon: {
      type: String,
      default: "",
    },
    solicitudes: {
      type: Array,
    },
    divisas: {
      type: Array,
    },
  },
  emits: ["addCount"],
  setup() {
    const newCount = ref(false);
    const count = ref({
      name: "",
      initBalan: "",
      desc: "",
    });
    const aa = () => {
      //window.location.reload();
    };

    function add(count) {
      this.$emit("addCount", count);
      newCount.value = false;
    }
    return {
      count,
      newCount,
      add,
      aa,
    };
  },
});
</script>
