<template>
  <div class="mainbgclr">
    <v-container fill-height class="SsoView pa-0 pa-sm-3">
      <v-card max-width="400px" class="mblframe mx-auto my-auto elevation-0 pb-1">
        <div class="innerscreen text-center">
          <div class="mt-4">
            <img class="" src="@/assets/logo.svg" width="32%" />
          </div>
          <div>
            <img class="" src="@/assets/gift.svg" width="28%" />
          </div>

          <v-card color="white" class="
              crdbgimg
              elevation-0
              pt-2
              py-4
              px-8
              rounded-0
              text-center
              mt-n2
            ">
            <p class="mb-0 title font-weight-bold black--text">
              Refer your friends to Zebu
            </p>
            <v-card-subtitle class="text-left black--text text-center px-8 pt-3">
              <p class="mb-0 body-2 font-weight-medium">
                Get 20% off brokerage fees for trades made by your friends! in
                every
              </p>
            </v-card-subtitle>
          </v-card>

          <div class="pt-0 py-4 px-5">
            <v-card color="#F9FBFC" class="elevation-0 py-8 px-4 rounded-lg mt-n6 mb-6 text-left">
              <v-row>
                <v-col class="py-0 pr-0" cols="2">
                  <v-icon size="18" color="#121A26">mdi-checkbox-blank-circle</v-icon>
                  <br />
                  <v-divider style="padding-left: 9px" class="mt-n3" vertical></v-divider>
                </v-col>

                <v-col class="py-0 pt-1 pl-0" cols="10" >
                  <div>
                    <v-form ref="inviteForm" @submit.prevent>
                    <p class="caption #505359--text mb-3">
                      Create your referral link, to easy share
                    </p>
                    <v-text-field :disabled="urlisgenerated" v-model="Client_refferal_url" :rules="[() => !!Client_refferal_url || 'This field is required']" :error-messages="errorMessages"
                      @click:append="getrefferalUrl(Client_refferal_url)" dense class="rounded-lg" outlined
                      placeholder="Client Code" required @keyup="
                        Client_refferal_url
                          ? (Client_refferal_url =
                              Client_refferal_url.toUpperCase())
                          : ''
                      " append-icon="mdi-arrow-right"></v-text-field>
                      </v-form>
                    <v-snackbar class="mb-16" bottom v-model="snackbar" dismissible>{{ errMsg }}</v-snackbar>
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0 pr-0" cols="2">
                  <v-icon size="18" color="#121A26">mdi-checkbox-blank-circle</v-icon>
                  <br />
                  <v-divider style="padding-left: 9px" class="mt-n3" vertical></v-divider>
                </v-col>

                <v-col class="py-0 pt-1 pl-0" cols="10">
                  <div>
                    <p class="caption #505359--text mb-3">
                      Refer your family and friends as a quick and easy way to
                      share
                    </p>

                    <v-hover v-slot="{ hover }">
                      <v-btn v-if="whatsappbtn" :href="
                        // $vuetify.breakpoint.mobile
                        //   ? sharetext + Client_refferal_url :
                           sharetextweb + Client_refferal_url
                      " block large color="white" target="_blank" :disabled="!validd" class="btn mb-2 rounded-lg text-capitalize" :style="{
                        'background-color': hover ? 'red' : '#BB86FC',
                      }">
                        <img src="@/assets/whatapp.svg" width="22px" class="mr-1" />
                        <span class="btninrtxt" style="color: black">Refer now</span>
                      </v-btn>
                    </v-hover>

                      
                    <v-btn v-if="morewaytoshare" @click="shareViaWebShare" :disabled="!validd" block large color="white"
                      class="btn mb-2 rounded-lg text-capitalize">
                      <span class="btninrtxt" style="color: black">more ways to share</span>
                    </v-btn>

                    <v-btn v-if="contactBtn" :disabled="!validd" id="authorize_button" block large color="white"
                      class="btn mb-7 rounded-lg text-capitalize" @click="handleAuthClick()">
                      <span class="btninrtxt" style="color: black">Invite my contacts</span>
                    </v-btn>

                    <!-- CONTACTS API START -->

                    <v-bottom-sheet class="pb-16" :retain-focus="true" hide-overlay v-model="sheet">
                      <v-sheet id="btmblrid" class="btmblr mx-auto rounded-lg mb-0 mb-sm-3" width="400px" height="40vh">
                        <v-toolbar dense color="#eceef0" class="elevation-0 px-4">
                          <v-card-text class="pl-0 body-1">Your Contacts
                            <v-icon id="chevronup" @click="RefreshData()" size="20">mdi-refresh</v-icon>
                          </v-card-text>

                          <v-spacer></v-spacer>
                          <v-icon id="chevronup" @click="sheetup()" size="28">mdi-chevron-up</v-icon>
                          <v-icon style="display: none;" id="chevrondnst" @click="sheetdnst()" size="28">
                            mdi-chevron-down</v-icon>
                          <v-icon id="chevrondnhd" @click="sheet = false" size="28">mdi-chevron-down</v-icon>

                        </v-toolbar>
                        <div class="px-4" v-for="contact in contactData" :key="contact.name">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title><span class="body-2">{{
                              contact.names[0].displayName
                              }}</span>
                              </v-list-item-title>
                              <v-list-item-subtitle><span class="caption">{{
                              contact.phoneNumbers[0].canonicalForm
                              }}</span>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-spacer></v-spacer>
                            <v-list-item-content>
                              <div class="text-right">
                                <v-btn v-if="androidLink" :href="
                                  'sms:' +
                                  contact.phoneNumbers[0].canonicalForm +
                                  '/?body=Click this link to open a Trading account with Zebu and Gain an unified Trading and Investment Experience.'
                                " outlined small class="invbtn elevation-0 px-8" color="#2196F3"><span
                                    class="blue--text text-capitalize">
                                    Invite</span></v-btn>

                                <v-btn v-if="iosLink" :href="
                                  'sms:' +
                                  contact.phoneNumbers[0].canonicalForm +
                                  '/&body=Click this link to open a Trading account with Zebu and Gain an unified Trading and Investment Experience. '
                                " outlined small class="invbtn elevation-0 px-8" color="#2196F3"><span
                                    class="blue--text text-capitalize">Invite</span></v-btn>
                              </div>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                        </div>
                        <div v-if="noData" class="my-auto text-center">
                          <v-card-subtitle class="my-auto mt-3">
                            <span style="color:grey;">No Contacts found</span>
                          </v-card-subtitle>
                        </div>
                        <!-- <div>{{errMsg}}</div> -->
                        <!-- <div v-for="contact in contactArray" :key="contact.name">
                          <div class="mb-5 mr-0">
                            <span class="">{{contact.names[0].displayName}}</span>
                            <v-btn class="float-right" outlined color="indigo" x-small>Invite</v-btn>
                             <span class="caption">Invite</span>
                            <div class="caption">{{contact.phoneNumbers[0].canonicalForm}}</div>
                          </div>
                        </div> -->
                      </v-sheet>
                    </v-bottom-sheet>
                    <v-snackbar class="mb-16" bottom v-model="snackbar" dismissible>{{ errMsg }}</v-snackbar>
                    <!-- CONTACTS API END -->
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0 pr-0" cols="2">
                  <v-icon size="18" color="#121A26">mdi-checkbox-blank-circle</v-icon>
                </v-col>

                <v-col class="py-0 pt-1 pl-0" cols="10">
                  <div>
                    <p class="caption #505359--text mb-0">
                      Get 20% off brokerage costs for trades made by your
                      friends.
                    </p>
                    <p id="testing"></p>
                    <!-- <v-btn block large color="white" class="btn mb-2 rounded-lg text-capitalize">
                      <span class="btninrtxt" style="color:black;">Rewards</span>
                    </v-btn> -->
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script src="https://apis.google.com/js/api.js" @load="gapiLoaded()"></script>
    <script src="https://accounts.google.com/gsi/client" @load="gisLoaded()"></script>
<script>
//  import axios from 'axios';
export default {
  data() {
    return {
      snackbar: false,
      errMsg: "",
      sheet: false,
      section: "Loin",
      loading: "",
      contactBtn: true,
      validd:false,
      iosLink: false,
      androidLink: false,
      response: "",
      noData:false,
      errMessage:'',
      snackbar:false,
      gapiInited: true,
      gisInited: true,
      tokenClient: null,
      contactArray: [],
      morewaytoshare: false,
      whatsappbtn: false,
      contactData: [],
      Client_refferal_url: "",
      urlisgenerated: false,
      clientcode: null,
      errorMessages:'',
      sharetext:
        "whatsapp://send?text=Click this link to open a Trading account with Zebu and Gain an unified Trading and Investment Experience. ",
      sharetextweb:"https://wa.me/?text=Click this link to open a Trading account with Zebu and Gain an unified Trading and Investment Experience. ",
    };
  },

  methods: {
    save() {
      this.$refs.inviteForm.validate()
    },
    RefreshData() {
      this.tokenClient.callback = async (resp) => {

          document.getElementById("authorize_button").style.visibility = "none";
          await this.listConnectionNames();
        };

        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          this.tokenClient.requestAccessToken({ prompt: "consent" });
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          this.tokenClient.requestAccessToken({ prompt: "" });
        }
    },
    sheetup() {
      document.getElementById("btmblrid").style.transition = "all 0.3s";
      document.getElementById("btmblrid").style.height = "85vh";
      document.getElementById("chevrondnst").style.display = "block";
      document.getElementById("chevrondnhd").style.display = "none";

    },
    sheetdnst() {
      document.getElementById("chevrondnhd").style.display = "block";
      document.getElementById("chevrondnst").style.display = "none";
      document.getElementById("btmblrid").style.height = "40vh";
    },

    async intializeGapiClient() {
      await gapi.client.init({
        apiKey: "AIzaSyAUcEhX-KRASPntyMGStHApPvzoukW4m7w",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
        ],
      });
      this.gapiInited = true;
      this.maybeEnableButtons();
    },
    getMobileOS() {
      // console.log("assd");
      const ua = navigator.userAgent;
      // console.log("UA", ua);

      if (/android/i.test(ua)) {
        // console.log("Android");
        this.androidLink = true;
        // document.getElementById("testing").innerText = "Android";
        return "Android";
      } else if (
        /iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
      ) {
        // console.log("IOS");
        this.iosLink = true;
        // document.getElementById("testing").innerText = "Ios";
        return "iOS";
      } else {
        // this.contactBtn = false
      }
      return "Other";
    },
    gisLoaded() {
      // console.log("looding gisLoaded");
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id:
          "380806002854-21t5v2dlq870js54mdihiokh9f7ftptt.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/contacts.readonly",
        callback: "", // defined later
      });
      // console.log("this.tokenClient", this.tokenClient);

      this.gisInited = true;
      this.maybeEnableButtons();
    },
    maybeEnableButtons() {
      if (this.gapiInited && this.gisInited) {
        document.getElementById("authorize_button").style.visibility =
          "visible";
      }
    },
    handleSignoutClick() {
      const token = gapi.client.getToken();
      if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken("");
        document.getElementById("content").innerText = "";
        document.getElementById("authorize_button").innerText = "Authorize";
        document.getElementById("signout_button").style.visibility = "hidden";
      }
    },
    async listConnectionNames() {
      let response;
      try {
        // Fetch first 10 files
        response = await gapi.client.people.people.connections.list({
          resourceName: "people/me",
          personFields: "names,emailAddresses,phoneNumbers",
        });
      } catch (err) {
        // document.getElementById("content").innerText = err.message;
        console.log("err",err)
        return;
      }
      const connections = response.result.connections;
      // console.log("con", connections);
      this.contactArray = connections;
      if (!connections) {
        console.log("con not applied");
        this.sheet = true;
        this.errMsg = "No contacts found.";
        this.noData = true
        this.contactData = []
        return;
      }
      // Flatten to string to display
      // console.log("num", connections);
      localStorage.setItem("connectionData", JSON.stringify(this.contactArray));
      var contactsData = localStorage.getItem("connectionData");
      this.contactData = JSON.parse(contactsData);
      const output = connections.reduce((str, person) => {
        if (!person.names || person.names.length === 0) {
          return `${str}Missing display name\n`;
        }
        // return `${str}[${person.names[0].displayName} ${person.phoneNumbers[0].canonicalForm}\n`;
      }, "Connections:\n");
      console.log(connections);
      this.sheet = true;
      this.noData = false;
      document.getElementById("content").innerText = output;
    },
    gapiLoaded() {
      // console.log("looding gapi");
      gapi.load("client", this.intializeGapiClient);
    },
    handleAuthClick() {
      var connectiondata = localStorage.getItem("connectionData");
      // console.log("connectiondata", connectiondata);

      if ((connectiondata == "undefined") || (connectiondata == null)) {
        this.tokenClient.callback = async (resp) => {

          document.getElementById("authorize_button").style.visibility = "none";
          await this.listConnectionNames();
        };

        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          this.tokenClient.requestAccessToken({ prompt: "consent" });
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          this.tokenClient.requestAccessToken({ prompt: "" });
        }
      } else {
      this.contactData = JSON.parse(connectiondata);
        this.sheet = true;
      document.getElementById("btmblrid").style.height = "40vh";
      document.getElementById("chevrondnhd").style.display = "block";
        // console.log("else",this.sheet);
      }
    },



    shareViaWebShare() {
      navigator.share({
        title: "Zebu",
        text: "Zebu offers trading and investment opportunities. Create an account right away. ",
        url: this.Client_refferal_url,
      });
    },

    getrefferalUrl(c) {

        this.$refs.inviteForm.validate()
 
      var respdata = "https://oa.zebull.in/?ref=";
      if (c) {
        var axiosthis = this
        var axios = require('axios');

          var config = {
            method: 'get',
            url: 'https://zebuetrade.com//gen?id='+c,
            headers: { }
          };

          axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            if (response.data.link == "Invalid") {  
              axiosthis.errMsg = "Invalid Client ID"
              axiosthis.snackbar = true

            // console.log(response.data.link);
            } else {
            axiosthis.Client_refferal_url = respdata + c.toUpperCase()
            axiosthis.validd = true
            axiosthis.urlisgenerated = true;

            }
          })
          .catch(function (error) {
            console.log(error);
          });

        
      }
    },
  },
  created() {
    
  },
  mounted() {
    // var url_string = window.location.href;
    var url = new URL(window.location.href);
    var c = url.searchParams.get("cid");
    this.gapiLoaded();
    this.gisLoaded();

    if (c) {
      //console.log("window.location.href : ",window.location.href);
      this.getrefferalUrl(c);
    } else if (localStorage.getItem("cid")) {
      // console.log("cid from storage : ",localStorage.getItem("cid"))
      var cid = localStorage.getItem("cid");
      this.getrefferalUrl(cid);
    } else {
      this.Client_refferal_url = "";
    }
    this.getMobileOS();
  },
};
</script>

<style>
.v-application,
.v-application .display-1,
.v-application .headline,
.v-application .title,
.v-application .subtitle-1,
.v-application .subtitle-2,
.v-application .body-1,
.v-application .body-2,
.v-application .caption {
  font-family: "Inter", sans-serif !important;
}

::-webkit-scrollbar {
  width: 0;
}

.mblframe {
  height: 100% !important;
  overflow-y: hidden !important;
  border-radius: 12px !important;
}

.innerscreen {
  height: 100vh !important;
  overflow-y: scroll !important;
  scroll-behavior: smooth !important;
  /* color: #d6daff; */
}

.innerscreen::-webkit-scrollbar {
  width: 0 !important;
}

.innerscreen::-webkit-scrollbar-track {
  border-radius: 10px;
  color: grey;
}

.innerscreen::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 10px;
}

.mainbgclr {
  background-color: #eceef0 !important;
  height: 100vh !important;
  overflow-y: hidden !important;
}

.SsoView {
  height: 100% !important;
  overflow-y: scroll !important;
}

.crdbgimg {
  background-image: url("@/assets/Artboard.svg") !important;
  background-size: 100% !important;
}

.btn {
  background-color: white !important;
  color: black !important;
  box-shadow: 0px 8px 16px 2px rgba(22, 34, 51, 0.08) !important;
}

.invbtn {
  width: 12px !important;
}

.v-btn:hover:before,
.v-btn:focus:before {
  background-color: blue !important;
}

.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)>.v-input__control>.v-input__slot {
  background-color: white !important;
  box-shadow: none !important;
}

.v-text-field input {
  font-size: 12px !important;
}

.btninrtxt {
  font-size: 12px !important;
  font-weight: medium !important;
}

.btmblr {
  background: white !important;
  box-shadow: 0px 8px 16px 2px rgba(22, 34, 51, 0.1) !important;
  overflow-y: scroll !important;
}

.v-dialog {
  box-shadow: none !important;
}

@media only screen and (max-width: 425px) {
  .mainbgclr {
    background-color: white !important;
  }

  .mblframe {
    width: 100% !important;
    border-radius: 0 !important;
  }

  .innerscreen::-webkit-scrollbar {
    width: 0 !important;
  }

  .btmblr {
    width: 100% !important;
  }
}
</style>