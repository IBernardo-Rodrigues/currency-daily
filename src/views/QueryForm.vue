<template>
  <section class="query">
    <h3>Faça sua consulta</h3>
    <h4>Selecione duas moedas!</h4>

    <div>
      <p v-show="error != ''">{{ errorMessage }}</p>
      <form action="">
        
        <select name="first-currency" v-model="firstCurrency">
          <option v-for="(currency, key) in sortedCurrencies" :value="currency[0]">{{ currency[1] }}</option>
        </select>
        <select name="second-currency" v-model="secondCurrency">
          <option v-for="(currency, key) in sortedCurrencies" :value="currency[0]">{{ currency[1] }}</option>
        </select>
        <select name="date" v-model="queryMode">
          <option value="1">Ultimos Dias</option>
          <option value="2">Período Especifíco</option>
        </select>
        <template v-if="queryMode == '1'">
          <input type="number" placeholder="Quantidade" max="31" v-model="daysCount">
        </template>
        <template v-if="queryMode == '2'">
          <input type="date" placeholder="Data de ínicio" v-model="startDate">
          <input type="date" placeholder="Data final" v-model="endDate">
          <input type="number" placeholder="Quantidade" v-model="daysCount">
        </template>
        <button type="submit" @click.prevent="makeQuery">
          Consultar
        </button>
      </form>
    </div>
  </section>
  <section class="results" v-if="cards.length != 0">
    <h3>{{ firstCurrency }} em {{ secondCurrency }}</h3>

    <div class="card" v-for="card in cards">
      <h4>{{ card.bid.replace('.', ',') }} {{ cards[0].name.split('/')[1] }}</h4>
      <p>Variação: {{ card.varBid }} ({{ card.pctChange }}%)</p>
      <p>Compra/Venda: {{ card.bid }} / {{ card.ask }}</p>
      <p>Data: {{ formatDate(card.timestamp) }}</p>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        currencies: {},
        firstCurrency: 'USD',
        secondCurrency: 'BRL',
        startDate: '',
        endDate: '',
        daysCount: '',
        queryMode: '1', 
        cards: [],
        error: ''
      }
    },
    methods: {
      createRequestUrl() {
        switch (this.queryMode) {
          case '1':
            return `https://economia.awesomeapi.com.br/json/daily/${this.firstCurrency}-${this.secondCurrency}/${this.daysCount}`;
            break;
          case '2':
            return `https://economia.awesomeapi.com.br/json/daily/${this.firstCurrency}-${this.secondCurrency}/${this.daysCount}?start_date=${this.startDate.replaceAll('-', '')}&end_date=${this.endDate.replaceAll('-', '')}`;
            break;
          default:
            break;
        }
      },
      makeQuery() {
        const requestUrl = this.createRequestUrl();

        fetch(requestUrl)
          .then(response => {
            if (response.ok) {
              response.json().then(data => this.cards = data);
            } else {
              this.error = 'Verifique sua internet';
            }
          }
          )
          .catch(error => {
            this.error = 'Verifique sua internet';
          })
          
      },
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000);

        const day = this.formatLessThanTen(date.getDate());
        const month = this.formatLessThanTen(date.getMonth() + 1);
        const hours = this.formatLessThanTen(date.getHours());
        const minutes = this.formatLessThanTen(date.getMinutes());

        return `${day}/${month}/${date.getFullYear()} - ${hours}:${minutes}`
      },
      formatLessThanTen(value) {
        return value >= 10 ? value : `0${value}`;
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
      },
      errorMessage() {
        setTimeout(() => {
          this.error = '';
        }, 3000);

        return this.error;
      }
    },
    mounted() {
      fetch('https://economia.awesomeapi.com.br/json/available/uniq')
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.currencies = data)
          } else {
            this.error = 'Verifique sua internet';
          }
        })
        .catch((error) => {
          this.error = 'Verifique sua internet';
        })
    },
    
  }
</script>

<style lang="scss" scoped>
  .query {
    background-color: var(--color-primary);
    padding-bottom: .8rem;

    h3, h4 {
    color: #fff;
    text-align: center;
    }

    h3 {
      font-size: 31.25px;
    }
    
    h4 {
      font-size: 25px;
      font-weight: 400;
    }

    div {
      padding: 2rem 0 .5rem;
    }

    form {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-direction: column;
    }

    select {
      border-radius: 0px;
      border: none;
      padding: .4rem;
      width: 180px;
      background-color: #fff;
    }

    input {
      background: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      padding: 5px;
      color: #fff;
      outline: none;
      width: 140px;
    }

    button {
      padding: 10px 15px;
      background-color: var(--color-secondary);
      color: #fff;
      font-weight: 500;
      border: none;
      transition: .3s ease;

      &:hover, &:active {
        transform: scale(1.1);
        background-color: var(--color-primary);
        border: 1px solid var(--color-secondary);
      }


    }

    p {
      color: #fff;
      background-color: #c55b5b;
      text-align: center;
      width: 60%;
      margin: .5rem auto;
      padding: 5px 10px;
    }
  }

  .results {
    h3 {
      padding: 0 2rem;
      margin: 1.5rem 0 .5rem;
    }
    .card {
      width: 80%;
      border-radius: .8rem;
      border: 1px solid #E3E8ED;
      margin: .5rem auto 1rem;
      padding: 1rem;
      box-shadow: #00000026 1.95px 1.95px 2.6px;

      h4 {
        font-weight: 600;
      }
    }
  }
  
</style>