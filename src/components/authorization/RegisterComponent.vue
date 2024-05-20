<script setup>

import { useTransStore } from "@/store/store.js";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from 'yup';
import {ref} from "vue";
import {router} from "@/router/router.js";

const errorValid = ref('')

const { errors , defineField , handleSubmit} = useForm({
  validationSchema: toTypedSchema(
      yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
      }))
})

const store  = useTransStore()

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const registerUser = () => {
  store.registerUser(password, email)
  router.push('/login')
}

</script>

<template>
  <div class="register-form">
    <h2>Регистрация</h2>

    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="username">Почта:</label>
        <input type="text" id="mail" v-model="email" v-bind="emailAttrs">
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" v-bind="passwordAttrs">
      </div>

      <button type="submit">Регистрация</button>
      <div class="error-message">{{ errors.email }}</div>
      <div class="error-message">{{ errors.password }}</div>
      <div class="error-message">{{ errorValid }}</div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register-form {
  margin: 100px auto;
  max-width: 300px;
  border: solid #c3c3c3 1px;
  background-color: #e6e6e6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  .form-group {
    margin-bottom: 15px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 200px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
  .success-message {
    color: blue;
    margin-top: 10px;
  }
}


</style>