<template>
<div>
  <h1>User Settings</h1>
  <router-link to="/settings/email">Email</router-link> |
  <router-link to="/settings/profile">Profile</router-link>
  <router-view/>
  <router-view name="helper"/>
</div>
</template>
