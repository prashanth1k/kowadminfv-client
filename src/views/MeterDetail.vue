<template>
  <div>
    <main>
      <v-container>
        <v-layout text-xs-left wrap>
          <h2 class="pv-5">Meter Detail</h2>
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <span class="title">Meter #: {{meterd.meterNumber}}</span>
              </v-card-title>
              <v-card-text></v-card-text>
            </v-card>
          </v-flex>

          <v-flex>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6 sm6 md3>
                  <v-text-field v-model="meterd.id" name="meterId" label="Meter Id" readonly></v-text-field>
                </v-flex>
                <v-flex xs6 sm6 md3>
                  <v-text-field
                    v-model="meterd.meterNumber"
                    name="meterNumber"
                    label="Meter Number"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs6 sm6 md3>
                  <v-select
                    :items="['Active', 'Repair' ]"
                    label="Status"
                    readonly
                    name="status"
                    hint="Default is 'Active'"
                    v-model="meterd.status"
                  ></v-select>
                </v-flex>
                <v-flex xs6 sm6 md3>
                  <v-text-field
                    v-model="meterd.curCustomerNumber"
                    name="curCustomerNumber"
                    label="Customer Number"
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <hr>

          <v-flex xs12>
            <v-card>
              <v-flex>
                <v-card-title>
                  <h3>Readings</h3>
                </v-card-title>
                <span align-start justify-end>
                  <v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-text-field
                        xl3
                        v-model="readingsTableSearch"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                      <!-- <v-btn color="primary" small @click="dialog= false">New</v-btn> -->
                      <!-- begin dialog -->
                      <v-flex xs12 ref="readingsNew">
                        <br>
                        <v-card>
                          <!-- <v-card-title>Add New Meter</v-card-title> -->
                          <v-dialog v-model="dialog" persistent max-width="600px">
                            <v-spacer></v-spacer>
                            <v-btn slot="activator" color="primary" small dark>Add New</v-btn>
                            <v-card>
                              <v-card-title>
                                <span class="headline">Add new Reading</span>
                              </v-card-title>
                              <v-card-text>
                                <v-container grid-list-md>
                                  <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                      <v-text-field
                                        v-model="readings.meterId"
                                        name="meterId"
                                        label="Meter Id"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                      <v-text-field
                                        v-model="readings.readingVal"
                                        name="readingVal"
                                        label="Reading Value"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                      <v-text-field
                                        v-model="readings.readingDate"
                                        name="readingDate"
                                        label="Reading Date"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
                                <v-btn color="blue darken-1" flat @click="createReadings">Save</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-card>
                      </v-flex>
                      <!-- end dialog -->
                    </v-card-actions>
                  </v-flex>
                </span>
              </v-flex>

              <v-flex>
                <!-- this should be server side paginated & with integrated new button . consider this as placeholder-->
                <v-data-table
                  :headers="readingsTableHeaders"
                  :items="readings"
                  :search="readingsTableSearch"
                >
                  <template slot="items" slot-scope="props">
                    <!-- <td class="text-xs">{{ props.item.id }}</td> -->
                    <td class="text-xs">{{ props.item.readingDate }}</td>
                    <td class="text-xs">{{ props.item.readingVal }}</td>
                    <td class="text-xs">{{ props.item.createdAt }}</td>
                    <td class="justify-left layout">
                      <v-btn flat small dark fab class="pl-4">
                        <v-icon small>edit</v-icon>
                      </v-btn>
                      <v-btn flat small dark fab @click="deleteItem(props.item)">
                        <v-icon small>delete</v-icon>
                      </v-btn>
                    </td>
                  </template>
                  <v-alert
                    slot="no-results"
                    :value="true"
                    color="error"
                    icon="warning"
                  >Your search for "{{ readingsTableSearch }}" found no results.</v-alert>
                </v-data-table>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>
      


<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "MeterD",

  mounted() {
    this.getMeter(this.$route.params.id).then(response => {
      this.meterd = response.data || response;
    });
    this.findReadings({ query: {} }).then(response => {
      const readings = response.data || response;
    });
  },
  methods: {
    ...mapActions("meter", { getMeter: "get" }),
    ...mapActions("readings", { findReadings: "find" }),
    createReadings() {
      console.log("creating reading.." + this.readings);
      //if (this.valid) {
      const { Readings } = this.$FeathersVuex;
      const readings = new Readings(this.readings);
      readings.save();
      console.log(this.readings);
      //}

      //    const { User } = this.$FeathersVuex;
      //         const user = new User(this.user);
      //         user.save().then(user => {

      this.dialog = false;
    },
    deleteItem(item) {
      const index = item.id;
      console.log("deleting.. " + item.id);
      confirm("Are you sure you want to delete this meter?") &&
        Vue.delete(this.readings, index);
    }
  },
  data(vm) {
    return {
      meterd: {},
      //readings: { meterId: this.$route.params.id },
      dialog: false,
      readingsTableSearch: "",
      readingsTableHeaders: [
        // { text: "Id", value: "id" },
        { text: "Date", value: "readingDate" },
        { text: "Reading", value: "readingVal" },
        { text: "Created", value: "createdAt" },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  computed: {
    ...mapState("meter", { loading: "isGetPending" }),
    // ...mapGetters("meter", { findMeterDInStore: "get" }),
    // meterd() {
    //   return this.findMeterDInStore(this.$route.params.id).data;
    // }

    ...mapState("readings", { loadingchild: "isFindPending" }),
    ...mapGetters("readings", { findReadingsInStore: "find" }),

    readings() {
      return this.findReadingsInStore({
        query: { meterId: this.$route.params.id }
      }).data;
      //   return this.findReadingsInStore({ query: {} }).data;
    }
  },
  components: {}
};
</script>