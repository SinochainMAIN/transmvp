<script setup>

import {computed, onMounted} from "vue";
import {useTransStore} from "@/store/store.js";

const store = useTransStore()

onMounted(() => {
  store.fetchCargoList()
})

const isCargoList = computed(() => {
  return store.getCargoList
})

</script>

<template>
  <div class="cargos">
    <h2 class="title">Грузы</h2>
    <div class="cargo-list">
      <div v-for="cargo of isCargoList" :key="cargo.id" class="cargo-item">
        <h3 class="">{{cargo.cargo_name}}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cargos {
  margin: 100px auto;
  max-width: 1400px;
  border: solid #c3c3c3 1px;
  background-color: #e6e6e6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  //align-items: center;
  padding: 20px;
  .title {
    text-align: center;
  }
  .cargo-list {

  }
}
</style>