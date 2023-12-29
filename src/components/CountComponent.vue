<template>
  <div>{{ nombre }}</div>
  <div>{{ monto }}</div>
  <div>{{ des }}</div>
  {{ console.log(des) }}
</template>
<script>
export default {
  name: "CountComponent",
  props: {
    nombre: {
      type: String,
    },
    monto: {
      type: Number,
    },
    des: {
      type: String,
    },
  },
};
</script>
