<script setup>
const emit = defineEmits(['close'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <p>{{ message }}</p>

      <button class="close-btn" @click="emit('close')">
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  padding: 20px;
  border-radius: 12px;
  min-width: 300px;
  max-width: 500px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
