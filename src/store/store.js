import { defineStore } from 'pinia';
import axios from 'axios';
import {axiosWrapper} from "@/helpers/axios-Wrapper.js";
import {router} from "@/router/router.js";

const API_URL = 'http://79.143.30.65/';

export const useTransStore = defineStore('transStore', {
    state: () => ({
        userName: localStorage.getItem('userName'),
        isLoggedIn: false,
        userId: null,
        isLoading: false,
        cargoList: null,
        fetchError: '',
    }),

    actions: {

        async loginUser({password, email}) {
            this.isLoading = true;
           try {

               const response = await axiosWrapper.post( API_URL + 'auth/token/login/', {password, email});
               localStorage.setItem('myToken', response.data.auth_token);

               const responseUserData = await axios.get('http://79.143.30.65/auth/users/me/', {headers: {Authorization: `Token ${localStorage.getItem('myToken')}`}});

               this.userName = responseUserData.data.email;
               localStorage.setItem('userName', this.userName)
               this.userid = responseUserData.data.id;
               this.isLoading = false;

               router.push('/')
           } catch (error) {
               this.fetchError = error
               return error
           }
        },

        async loginOut() {
            await axios.post(API_URL + 'auth/token/logout/', {}, {headers: {Authorization: `Token ${localStorage.getItem('myToken')}`}});
            localStorage.removeItem('myToken');
            localStorage.removeItem('userName');
            this.userName = null;
            this.userid = null;
        },

        async registerUser(password, email) {
            try {
                const response = await axios.post(API_URL + 'auth/users/', {
                    password: password.value,
                    email: email.value,

                }, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })

            } catch (error) {
                console.log('Ошибка', error)
            }
        },

        async fetchCargoList () {
            try {
                const response = await axios.get(API_URL + 'api/v1/current_cargos', {headers: {Authorization: `Token ${localStorage.getItem('myToken')}`}})
                this.cargoList = response.data
            } catch (error) {
                console.log('Ошибка', error)
            }
        }
    },

    getters: {
        user({userName}) {
            return userName
        },
        getUserId({userId}) {
            return userId
        },
        loadingUserData({isLoading}) {
            return isLoading
        },
        getCargoList({cargoList}) {
            return cargoList
        },
        getError({fetchError}) {
            return fetchError
        }
    }
})