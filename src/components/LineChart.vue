<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import { reactiveProp } from "vue-chartjs/es/mixins";

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData"],
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
    });
  },
  watch: {
    chartData() {
      this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRatio: false,
      });
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 500px !important;
}
</style>
