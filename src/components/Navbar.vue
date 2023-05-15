<template>
  <header>
    <h1>CurrencyDaily</h1>

    <button @click="toggleMenu">
      <i class="fa-solid fa-bars"></i>
    </button>
    <nav>
      <ul>
        <li>
          <router-link to="/" @click="toggleMenu">Home</router-link>
        </li>
        <li>
          <router-link to="/currencies" @click="toggleMenu">Moedas</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    methods: {
      toggleMenu() {
        const $menu = document.querySelector('nav');

        $menu.classList.toggle('opened');
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-primary);
    padding: 1rem;
    height: 80px;
  }

  h1 {
    color: #fff;
  }

  button {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 26px;
  }

  nav {
    /* display: none; */
    position: absolute;
    top: 80px;
    left: -10000px;
    right: 10000px;
    bottom: 0;
    background-color: var(--color-primary);
    padding: 1.5rem 0 .5rem;
    transition: .4s ease-in-out;

    &.opened {
      display: block;
      left: 0px;
      right: 0px;
    }
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-direction: column;
    list-style: none;
  }

  li {
    text-align: center;
    width: 65%;
    border-bottom: 1px solid #B1ABAB;
  }

  a {
    color: #fff;  
    text-decoration: none;
    font-size: 25px;
  }
</style>