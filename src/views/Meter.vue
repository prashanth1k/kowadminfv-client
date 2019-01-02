<template>
  <div>
    <main>
      <v-container height="400px" fill-height>
        <v-layout flex align-center justify-center row wrap>
          <v-flex xs12>
            <h2>Meter Admin</h2>
          </v-flex>

          <v-flex xs12>
            <br>
            <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
          </v-flex>
          <v-flex xs12 ref="metersNew" v-if="!loading">
            <br>
            <v-card>
              <!-- <v-card-title>Add New Meter</v-card-title> -->
              <v-dialog v-model="dialog" persistent max-width="600px">
                <v-spacer></v-spacer>
                <v-btn slot="activator" color="primary" small dark>Add New</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Add new meter</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md6>
                          <v-text-field
                            v-model="meter.meterNumber"
                            name="meterNumber"
                            label="Meter Number*"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-select
                            :items="['Active', 'Repair' ]"
                            label="Status*"
                            required
                            name="status"
                            hint="Default is 'Active'"
                            v-model="meter.status"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field
                            v-model="meter.curCustomerNumber"
                            name="curCustomerNumber"
                            label="Customer Number*"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="createMeter">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-flex>
          <v-flex xs12 ref="metersList" v-if="!loading">
            <br>
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>

                <v-text-field
                  v-model="meterTableSearch"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <!-- this should be server side paginated & with integrated new button . consider this as placeholder-->
              <v-data-table :headers="meterTableHeaders" :items="meter" :search="meterTableSearch">
                <template slot="items" slot-scope="props">
                  <td class="text-xs">{{ props.item.meterNumber }}</td>
                  <td class="text-xs">{{ props.item.status }}</td>
                  <td class="text-xs">{{ props.item.curCustomerNumber }}</td>
                  <td class="justify-left align-center layout">
                    <v-btn
                      flat
                      small
                      fab
                      class="pt-2 pl-4"
                      :to="{name:'meterDetail', params: {id: props.item.id}}"
                    >
                      <v-icon small>edit</v-icon>
                    </v-btn>
                    <v-btn flat small fab @click="deleteItem(props.item)">
                      <v-icon small>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
                <v-alert
                  slot="no-results"
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ meterTableSearch }}" found no results.</v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>


<script>
//import HelloWorld from '../components/HelloWorld'
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "wMeter",

  mounted() {
    this.findMeter({ query: {} }).then(response => {
      const meter = response.data || response;
    });
  },
  methods: {
    //...mapActions("meter", ["find"]),
    ...mapActions("meter", { findMeter: "find" }),
    createMeter() {
      console.log("creating meter.." + this.valid);
      //if (this.valid) {
      const { Meter } = this.$FeathersVuex;
      const meter = new Meter(this.meter);
      meter.save();
      console.log(this.meter);
      //}
      this.dialog = false;
    },
    deleteItem(item) {
      const index = item.id;
      console.log("deleting.. " + item.id);
      confirm("Are you sure you want to delete this meter?") &&
        //Vue.delete(this.meter, index);
        //store.dispatch("entities/meter/delete", { where: item.id });
        meter.deleteItem(item);
    }
  },
  data(vm) {
    return {
      dialog: false,
      meterTableSearch: "",
      meterTableHeaders: [
        { text: "Meter Number", value: "meterNumber" },
        { text: "Status", value: "status" },
        { text: "Customer Number", value: "curCustomerNumber" },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  computed: {
    ...mapState("meter", { loading: "isFindPending" }),
    ...mapGetters("meter", { findMeterInStore: "find" }),
    meter() {
      return this.findMeterInStore({ query: {} }).data;
    }
  },
  components: {}
};
</script>
