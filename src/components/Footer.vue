<template>
  <footer>
    <div class="l-footer">
      <Inner>
        <p class="footer-copyright font-google-sans-code">
          <small>
            &copy; 2026 Nakayama Kirin. All rights reserved.
          </small>
        </p>
      </Inner>
    </div>
  </footer>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.l-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  color: map.get($font-color, dark);
  background-color: map.get($theme, dark);
}

.footer-copyright {
  text-align: center;
  font-size: 1.2rem;
}
</style>