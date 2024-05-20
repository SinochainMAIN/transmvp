<script setup>
import {useTransStore} from "@/store/store.js";
import {computed, onMounted} from "vue";

defineProps({
  user: String
})

const store = useTransStore()

const isUserName = computed(() => {
  return store.user
})

const isLoading = computed(() => {
  return store.loadingUserData
})

</script>

<template>
  <div v-if="!isLoading" class="home">
    <h1 v-if="isUserName">Hi , {{isUserName}}</h1>
    <h1 v-if="!isUserName">Hello, You are not authorized</h1>
  </div>
  <div v-if="isLoading" class="loading">
    <h1>Загрузка</h1>
  </div>
</template>

<style scoped lang="scss">
.home {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px 10px;
  text-align: center;
  border: solid #c3c3c3 1px;
  background-color: #e6e6e6;
  border-radius: 5px;
}
.loading {
  //max-width: 600px;
  margin: 50px auto;
  padding: 20px 10px;
  text-align: center;
  border: solid #c3c3c3 1px;
  background-color: #e6e6e6;
  border-radius: 5px;
}
</style>