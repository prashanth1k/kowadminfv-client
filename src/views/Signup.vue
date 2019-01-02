<template name="signup">
  <div>
    <main>
      <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center row wrap>
          <v-flex xs12>
            <h2 class="row">Sign up</h2>
          </v-flex>

          <v-flex xs12>
            <br>
            <v-form
              v-if="!loading"
              ref="signupForm"
              v-model="formValid"
              @submit.prevent="handleSubmit"
              lazy-validation
            >
              <div class="form-group">
                <v-text-field
                  label="Email"
                  type="text"
                  v-model="user.email"
                  name="email"
                  required
                  :rules="[rules.min]"
                ></v-text-field>
              </div>

              <div class="form-group">
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="user.password"
                  name="password"
                  required
                  :rules="[rules.min]"
                ></v-text-field>

                <v-text-field
                  label="Confirm Password"
                  type="password"
                  v-model="user.confirmPassword"
                  name="confirmPassword"
                  required
                  :rules="confirmPasswordRules"
                ></v-text-field>
              </div>

              <div class="form-group">
                <v-btn color="primary" :disabled="!formValid" @click="handleSubmit">Sign up</v-btn>

                <v-btn to="/login">Cancel</v-btn>
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

      user: {
        //name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },

      rules: {
        //        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min. 6 characters"
      },

      confirmPasswordRules: [
        value => value == vm.user.password || "Passwords must match"
      ]
    };
  },
  computed: {
    ...mapState("users", { loading: "isCreatePending" })
  },
  methods: {
    handleSubmit() {
      if (this.$refs.signupForm.validate()) {
        console.log("submitting form..");
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user.save().then(user => {
          console.log("User created");
          console.log(user);

          this.$router.push("/login");
        });
      }
    }
  }
};
</script>
