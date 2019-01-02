import Vue from "vue";
import Vuex from "vuex";
import feathersVuex from "feathers-vuex";
import feathersClient from "./feathers-client";

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, {
  idField: "id"
});

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  plugins: [
    auth({ userService: "users" }),
    service("users", {
      instanceDefaults: {
        email: "",
        password: ""
      }
    }),
    service("meter", {
      instanceDefaults: {
        meterNumber: "",
        status: "Active"
      }
    }),
    service("readings", {
      instanceDefaults: {
        readingVal: "",
        readingDate: "",
        status: "OK",
        user: "User",
        meter: "Meter"
      }
    })
  ],
  state: {},
  mutations: {},
  actions: {}
});
