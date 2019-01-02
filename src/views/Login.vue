<template>
  <div>
    <main>
      <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center row wrap>
          <v-flex xs12>
            <h2>Login</h2>
          </v-flex>
          <v-flex xs12>
            <br>
            <v-form
              ref="loginForm"
              @submit.prevent="handleSubmit"
              v-if="!loading"
              v-model="formValid"
            >
              <div class="form-group">
                <v-text-field
                  label="Email"
                  type="text"
                  v-model="email"
                  name="email"
                  :rules="[rules.required]"
                ></v-text-field>
              </div>
              <div class="form-group">
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                  name="password"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>
              </div>
              <div class="form-group">
                <v-btn color="primary" @click="submitLogin" :disabled="!formValid">Login</v-btn>

                <v-btn to="/signup" class="btn btn-link">Signup</v-btn>
              </div>
            </v-form>
            <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data(vm) {
    return {
      formValid: false,
      email: "",
      password: "",

      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min. 6 characters"
      }
    };
  },
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" })
  },
  created() {
    // to-do: reset login status
  },
  methods: {
    //...mapActions("account", ["login", "logout"]),
    ...mapActions("auth", ["authenticate"]),
    submitLogin() {
      if (this.$refs.loginForm.validate()) {
        console.log("Logging in..");
        this.authenticate({
          strategy: "local",
          email: this.email,
          password: this.password
        })
          .then(() => {
            console.log("logged in.");
            this.$router.push("/dashboard");
          })
          .catch(e => {
            console.log("Auth error" + JSON.stringify(e));
          });
      }
    }
  }
};
</script>