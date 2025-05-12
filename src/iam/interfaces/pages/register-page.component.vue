<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg p-8 bg-white rounded shadow-md">
      <h1 class="mb-6 text-2xl font-bold text-center">Register</h1>
      <form>
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block mb-2 text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <div class="mb-6">
          <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="button"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Account
        </button>
      </form>
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>