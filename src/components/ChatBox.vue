<script setup>
import { ref } from 'vue'

const messages = ref([
  {
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date()
  }
])

const newMessage = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  // Add user message
  messages.value.push({
    role: 'user',
    content: newMessage.value,
    timestamp: new Date()
  })

  // Clear input
  newMessage.value = ''

  // Simulate assistant response (you can replace this with actual API call)
  setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: 'This is a simulated response. In a real application, this would come from your API.',
      timestamp: new Date()
    })
  }, 1000)
}
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Chat messages container -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-for="(message, index) in messages" :key="index"
           class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
        <div class="flex max-w-[80%] space-x-2">
          <!-- Avatar for assistant -->
          <div v-if="message.role === 'assistant'"
               class="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
            AI
          </div>

          <!-- Message bubble -->
          <div :class="[
            'rounded-lg px-4 py-2',
            message.role === 'user'
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-white text-gray-800 rounded-bl-none shadow'
          ]">
            {{ message.content }}
          </div>

          <!-- Avatar for user -->
          <div v-if="message.role === 'user'"
               class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            U
          </div>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="border-t border-gray-200 p-4 bg-white">
      <div class="flex space-x-4">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          @click="sendMessage"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>
