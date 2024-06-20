<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div v-if="graphData" style="height: 500px">
      <line-chart :chart-data="graphData"></line-chart>
    </div>
    <div v-if="results" class="results">
      <p>Max Profit: {{ results.maxProfit }}</p>
      <p>Max Loss: {{ results.maxLoss }}</p>
      <p>Break Even Points: {{ results.breakEvenPoints.join(", ") }}</p>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import { calculateRiskReward, generateGraphData } from "../utils/strategy";

export default {
  name: "CodingChallenge",
  components: {
    "line-chart": LineChart,
  },
  props: {
    optionsData: Array,
  },
  data() {
    return {
      graphData: null,
      results: null,
    };
  },
  watch: {
    optionsData: {
      immediate: true,
      handler() {
        this.calculate();
      },
    },
  },
  methods: {
    calculate() {
      this.results = calculateRiskReward(this.optionsData);
      this.graphData = generateGraphData(this.optionsData);
    },
  },
};
</script>

<style scoped>
.results {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
}

.results p {
  margin: 5px 0;
}
</style>
