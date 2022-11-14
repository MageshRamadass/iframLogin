<template>
  <div>
    <!-- <h1>Local Host</h1> -->
    <div id="buttonDiv"></div>
  </div>
</template>
<script src="https://apis.google.com/js/api:client.js"></script>

<script>
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {};
  },
  mounted() {
    // function
    google.accounts.id.initialize({
      client_id:
        "272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com",
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      type: "standard",
      shape: "pill",
      theme: "filled_black",
      size: "large",
      width: "400",
    });
    google.accounts.id.prompt();
  },
  methods: {
    handleCredentialResponse(response) {
      console.log("working", response);
      let responsePayload = jwt_decode(response.credential);
      console.log("responsePayload", responsePayload);

      console.log("ID: T + " + responsePayload.sub);
      console.log("Full Name: " + responsePayload.name);
      console.log("Given Name:" + responsePayload.given_name);
      console.log("Family Name: " + responsePayload.family_name);
      console.log("Image URL: " + responsePayload.picture);
      console.log("Email: " + responsePayload.email);
    },
  },
};
</script>