<!--
/**
 * @fileoverview Milestone component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <g
    class="gantt-elastic__chart-row-bar-wrapper gantt-elastic__chart-row-milestone-wrapper"
    :style="{
      ...root.style['chart-row-bar-wrapper'],
      ...root.style['chart-row-milestone-wrapper'],
      ...task.style['chart-row-bar-wrapper']
    }"
  >
    <foreignObject
      class="gantt-elastic__chart-expander gantt-elastic__chart-expander--milestone"
      :style="{
        ...root.style['chart-expander'],
        ...root.style['chart-expander--milestone'],
        ...task.style['chart-expander']
      }"
      :x="task.x - root.state.options.chart.expander.offset - root.state.options.chart.expander.size"
      :y="task.y + (root.state.options.row.height - root.state.options.chart.expander.size) / 2"
      :width="root.state.options.chart.expander.size"
      :height="root.state.options.chart.expander.size"
      v-if="displayExpander"
    >
      <expander :tasks="[task]" :options="root.state.options.chart.expander" type="chart"></expander>
    </foreignObject>
    <svg
      class="gantt-elastic__chart-row-bar gantt-elastic__chart-row-milestone"
      :style="{ ...root.style['chart-row-bar'], ...root.style['chart-row-milestone'], ...task.style['chart-row-bar'] }"
      :x="viewbox.x"
      :y="viewbox.y"
      :width="viewbox.width"
      :height="viewbox.height"
      :viewBox="`0 0 ${viewbox.width} ${viewbox.height}`"
      @click="emitEvent('click', $event)"
      @mouseenter="emitEvent('mouseenter', $event)"
      @mouseover="emitEvent('mouseover', $event)"
      @mouseout="emitEvent('mouseout', $event)"
      @mousemove="emitEvent('mousemove', $event)"
      @mousedown="emitEvent('mousedown', $event)"
      @mouseup="emitEvent('mouseup', $event)"
      @mousewheel="emitEvent('mousewheel', $event)"
      @touchstart="emitEvent('touchstart', $event)"
      @touchmove="emitEvent('touchmove', $event)"
      @touchend="emitEvent('touchend', $event)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath :id="clipPathId">
          <polygon :points="getPoints"></polygon>
        </clipPath>
      </defs>
      <polygon
        class="gantt-elastic__chart-row-bar-polygon gantt-elastic__chart-row-milestone-polygon"
        :style="{
          ...root.style['chart-row-bar-polygon'],
          ...root.style['chart-row-milestone-polygon'],
          ...task.style['base'],
          ...task.style['chart-row-bar-polygon']
        }"
        :points="getPoints"
      ></polygon>
      <progress-bar type="milestone" :task="task" :clip-path="'url(#' + clipPathId + ')'"></progress-bar>
      <postponse-sign :task="task" v-if="root.state.options.chart.postponse.display && task.postponse && task.postponse!=='0'"></postponse-sign>
      <overdue-bar type="milestone"
                   :task="task"
                   v-if="task.showOverdue"
      ></overdue-bar>
    </svg>
    <chart-text :task="task" v-if="root.state.options.chart.text.display"></chart-text>
  </g>
</template>

<script>
import ChartText from '../Text.vue';
import ProgressBar from '../ProgressBar.vue';
import Expander from '../../Expander.vue';
import taskMixin from './Task.mixin.js';
import PostponseSign from "../PostponseSign.vue";
import OverdueBar from "../OverdueBar.vue";
export default {
  name: 'Milestone',
  components: {
    OverdueBar,
    PostponseSign,
    ChartText,
    ProgressBar,
    Expander
  },
  inject: ['root'],
  props: ['task'],
  mixins: [taskMixin],
  data() {
    return {};
  },
  computed: {
    /**
     * Get clip path id
     *
     * @returns {string}
     */
    clipPathId() {
      return 'gantt-elastic__milestone-clip-path-' + this.task.id;
    },

    /**
     * Get points
     *
     * @returns {string}
     */
    getPoints() {
      const task = this.viewbox;
      const fifty = task.height / 2;
      let offset = fifty;
      if (task.width / 2 - offset < 0) {
        offset = task.width / 2;
      }
      return `0,${fifty}
        ${offset},0
        ${task.width - offset},0
        ${task.width},${fifty}
        ${task.width - offset},${task.height}
        ${offset},${task.height}`;
    }
  }
};
</script>
