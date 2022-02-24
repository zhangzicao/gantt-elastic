<!--
/**
 * @fileoverview ProgressBar component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <g>
    <g
      class="gantt-elastic__chart-row-progress-bar-wrapper"
      :style="{ ...root.style['chart-row-progress-bar-wrapper'], ...task.style['chart-row-progress-bar-wrapper'] }"
    >
      <defs>
        <pattern
          id="diagonalHatch"
          :width="root.state.options.chart.progress.width"
          :height="root.state.options.chart.progress.width"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            class="chart-row-progress-bar-line"
            :style="{ ...root.style['chart-row-progress-bar-line'], ...task.style['chart-row-progress-bar-line'] }"
            x1="0"
            y1="0"
            x2="0"
            :y2="root.state.options.chart.progress.width"
          />
        </pattern>
      </defs>
      <rect
        v-if="root.state.options.chart.progress.bar"
        class="gantt-elastic__chart-row-progress-bar-solid"
        :style="{ ...root.style['chart-row-progress-bar-solid'], ...task.style['chart-row-progress-bar-solid'] }"
        x="0"
        y="0"
        :width="getProgressWidth"
      ></rect>
      <g v-if="root.state.options.chart.progress.pattern">
        <rect
          class="gantt-elastic__chart-row-progress-bar-pattern"
          :style="{ ...root.style['chart-row-progress-bar-pattern'], ...task.style['chart-row-progress-bar-pattern'], ...(root.state.options.chart.progress.patternType==2?{'fill': 'rgba(0, 0, 0, 0.2)'}:null) }"
          :x="getProgressWidth"
          y="0"
          :width="100 - task.progress + '%'"
          height="100%"
        ></rect>
        <path
          class="gantt-elastic__chart-row-progress-bar-outline"
          :style="{
          ...root.style['chart-row-progress-bar-outline'],
          ...task.style['base'],
          ...task.style['chart-row-progress-bar-outline']
        }"
          :d="getLinePoints"
        ></path>
      </g>
    </g>
    <foreignObject  v-if="root.state.options.chart.progress.textInside"
                    width="48"
                    :height="task.height"
                    :x="task.width/2-24" y="0"
                    requiredExtensions="http://www.w3.org/1999/xhtml">
      <!-- XHTML content goes here -->
      <div
        class="gantt-elastic__chart-row-bar-text"
        :style="{
          ...root.style['chart-row-bar-text'],
          ...task.style['chart-row-bar-text'],
          'line-height': task.height+'px'
        }">{{task.progress}}%</div>
    </foreignObject>
  </g>
</template>

<script>
export default {
  name: 'ProgressBar',
  inject: ['root'],
  props: ['task'],
  data() {
    return {};
  },

  computed: {
    /**
     * Get progress width
     *
     * @returns {string}
     */
    getProgressWidth() {
      return this.task.progress + '%';
    },

    /**
     * Get line points
     *
     * @returns {string}
     */
    getLinePoints() {
      const start = (this.task.width / 100) * this.task.progress;
      return `M ${start} 0 L ${start} ${this.task.height}`;
    },

    /**
     * Get solid style
     *
     * @returns {object}
     */
    getSolidStyle() {
      return Object.assign({}, this.root.state.options.chart.progress.styles.bar.solid, this.task.progressBarStyle.bar);
    },

    /**
     * Get line style
     *
     * @returns {object}
     */
    getLineStyle() {
      return Object.assign(
        {},
        {
          stroke: this.root.state.options.row.styles.bar.stroke + 'a0',
          'stroke-width': this.root.state.options.row.styles.bar['stroke-width'] / 2
        },
        this.task.style
      );
    }
  }
};
</script>
