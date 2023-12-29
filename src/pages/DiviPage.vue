<template>
  <div class="flex-center q-pa-xl">
    <ApertureComponetn v-show="diviAper" />
    <ConfigDiviComponent v-show="configAper" />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import ApertureComponetn from "src/components/ApertureComponent.vue";
import ConfigDiviComponent from "src/components/ConfigDiviComponent.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DiviPage",
  components: {
    ApertureComponetn,
    ConfigDiviComponent,
  },
  setup() {
    const $route = useRoute();
    const diviAper = ref(false);
    const configAper = ref(false);

    setInterval(() => {
      if ($route.params.id == "apertura") {
        diviAper.value = true;
        configAper.value = false;
      }
      if ($route.params.id == "configuraciones") {
        diviAper.value = false;
        configAper.value = true;
      }
    }, 100);

    return {
      diviAper,
      configAper,
    };
  },
});
</script>
