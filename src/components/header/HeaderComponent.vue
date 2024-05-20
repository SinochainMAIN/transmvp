<script setup>
import {computed} from "vue";
import {useTransStore} from "@/store/store.js";
import {router} from "@/router/router.js";

const store = useTransStore();

const logOut = () => {
  store.loginOut();
  router.push('/login');
}

const isUserName = computed(() => {
  return store.user
})

</script>

<template>

  <div id="header" class="header">

    <div class="header-container">
      <h3 class="header__logo">TransAgregator</h3>

      <div v-if="!isUserName" class="header-container__navbar">
        <div class="item">
          <router-link to="/" class="item__item-link">Home</router-link>
        </div>
      </div>

      <div v-if="isUserName" class="header-container__navbar">
        <div class="item">
          <router-link to="/" class="item__item-link">Главная</router-link>
        </div>
        <div class="item">
          <router-link to="/cargos" class="item__item-link">Перевозчики</router-link>
        </div>
        <div class="item">
          <router-link to="" class="item__item-link">Грузы</router-link>
        </div>
        <div class="item">
          <router-link to="/user/profile" class="item__item-link">Профиль</router-link>
        </div>
      </div>

      <div v-if="!isUserName" class="header-container__navbar">
        <div class="item">
          <router-link to="/register" class="item__item-link"><button class="btn" >Регистрация</button></router-link>
        </div>
        <div class="item">
          <router-link
              to="/login"
              class="item__item-link">
            <button class="btn" >Войти</button>
          </router-link>
        </div>
      </div>

      <div v-else class="header-container__navbar">
        <div class="item">
          <router-link to="/user/profile" class="item__item-link">{{isUserName}}</router-link>
        </div>
        <div class="item">
          <button class="btn" @click.prevent="logOut">Выйти</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: #777777;
  padding: 20px 20px;
  display: flex;
  .header-container {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &__navbar {
      display: flex;
      align-items: center;
      gap: 30px;
      .item {
        &__item-link  {
          text-decoration: none;
          color: black;
          font-size: 18px;
          font-weight: 500;
          transition: all 0.3s;
          &:hover {
            color: #007bff;
            text-decoration: underline;
          }
        }
        .btn {
          //width: 100%;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>