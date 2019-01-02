<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile to="/dashboard">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/meter">
          <v-list-tile-action>
            <v-icon>developer_board</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Meters</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
        <v-list-tile></v-list-tile>
        <v-list-tile to="/settings">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <router-link to="/"> -->
      <v-toolbar-title>
        <v-btn flat to="/">KowAdmin</v-btn>
      </v-toolbar-title>
      <!-- </router-link> -->
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn flat small to="/login">Login</v-btn>
        <v-btn small to="/signup" color="primary">Signup</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <v-btn flat small @click="userLogout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <v-layout>
        <v-flex>&copy; {{ new Date().getFullYear() }}</v-flex>

        <v-flex offset-lg10>Powered by Pragital</v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  computed: {
    ...mapState("auth", { user: "payload" })
  },
  methods: {
    userLogout() {
      this.authLogout()
        .then(() => this.$router.push("/login"))
        .catch(e => console.error("Error " + JSON.stringify(e)));

      console.log("logged out");
    },
    ...mapActions("auth", { authLogout: "logout" }),
    ...mapActions("auth", ["authenticate"])
  },
  data() {
    return {
      drawer: 1
      //
    };
  },
  mounted() {}
};
</script>
