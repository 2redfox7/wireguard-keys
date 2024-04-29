<template>
  <div>
    <h1 class='title'></h1>
    <vue-telegram-login
      mode="callback"
      telegram-login="YourTelegramBot"
      @callback="yourCallbackFunction" />
  </div>
</template>

<script lang="js">
import {vueTelegramLogin} from 'vue-telegram-login'

export default {
  name: 'your-component',
  components: {vueTelegramLogin},
  methods: {
    yourCallbackFunction (user) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user)
    }
  }
}
</script>

<style scoped></style>
