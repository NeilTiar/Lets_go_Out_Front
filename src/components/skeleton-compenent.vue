<template>
  <div class="skeleton-card" :class="{ 'dark-mode-class': isDarkMode }">
    
    <!-- Image placeholder -->
    <div class="skeleton-image shimmer"></div>

    <!-- Theme placeholder -->
    <div class="skeleton-theme shimmer"></div>

    <!-- Body -->
    <div class="skeleton-body">
      <div class="skeleton-line title shimmer"></div>
      <div class="skeleton-line sub shimmer"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SkeletonCard",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
  },
};
</script>

<style scoped>
/* --- CONTAINER --- */
.skeleton-card {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  padding: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dark-mode-class {
  background: #2e1f47; /* ton dark mode */
}

/* --- IMAGE --- */
.skeleton-image {
  width: 100%;
  height: 170px; /* même taille que .card-image */
  border-radius: 12px;
  background: #d7d7d7;
}

/* --- THEME BAR (h3 remplacé) --- */
.skeleton-theme {
  width: 35%;
  height: 20px;
  border-radius: 6px;
  background: #c9c9c9;
}

/* --- BODY --- */
.skeleton-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-line {
  height: 16px;
  background: #d7d7d7;
  border-radius: 8px;
}

.title {
  width: 70%;
}

.sub {
  width: 40%;
}

/* --- SHIMMER EFFECT --- */
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.55) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(0); }
  100% { transform: translateX(300%); }
}
</style>
