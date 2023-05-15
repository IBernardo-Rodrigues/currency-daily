<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>Sigla</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="currency in sortedCurrencies">
          <td>{{ currency[0] }}</td>
          <td>{{ currency[1] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        currencies: []
      }
    },
    computed: {
      sortedCurrencies() {
        let array = Object.entries(this.currencies);
        let sorted = array.sort((a, b) => {
          const argA = a[1].toUpperCase();
          const argB = b[1].toUpperCase();

          if (argA < argB) {
            return -1;
          }
          
          if (argB < argA) {
            return 1;
          }

          return 0;
        });

        return sorted;
      }
    },
    mounted() {
      fetch('https://economia.awesomeapi.com.br/json/available/uniq')
        .then(response => response.json())
        .then(data => this.currencies = data);
    }
  }
</script>

<style lang="scss" scoped>
  table {
    width: 90%;
    margin: auto;
    border-collapse: collapse;
    margin-top: 1.5rem;
     
    thead {
      background-color: var(--color-primary);
      color: #fff;
      font-weight: 500;
    }

    tbody tr {
      background-color: #f6f6f6;
      text-align: center;
      color: #333333;

      td {
        padding: 4px;

      }
    }
  }
</style>