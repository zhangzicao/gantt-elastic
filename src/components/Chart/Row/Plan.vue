<!--
/**
 * @fileoverview Plan component
 * @license MIT
 * @package GanttElastic
 */
-->
<template>
  <g
    v-if="rowShowPlanBar"
    class="gantt-elastic__chart-row-bar-wrapper gantt-elastic__chart-row-plan-wrapper"
    :style="{
      ...root.style['chart-row-bar-wrapper'],
      ...root.style['chart-row-plan-wrapper'],
      ...task.style['chart-row-plan-wrapper']
    }"
  >
    <svg
      class="gantt-elastic__chart-row-bar gantt-elastic__chart-row-plan"
      :style="{ ...root.style['chart-row-bar'], ...root.style['chart-row-plan'], ...task.style['chart-row-bar'] }"
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
        class="gantt-elastic__chart-row-bar-polygon gantt-elastic__chart-row-plan-polygon"
        :style="{
          ...root.style['chart-row-bar-polygon'],
          ...root.style['chart-row-plan-polygon'],
          ...task.style['chart-row-plan-polygon']
        }"
        :points="getPoints"
      ></polygon>
      <progress-bar type="task" :task="task" :clip-path="'url(#' + clipPathId + ')'"
                    patternId="planPath"
      ></progress-bar>
    </svg>
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
  name: 'Task',
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
    viewbox(){
      return {
        x: this.task.planX,
        y: this.task.y,
        width: this.task.planWidth,
        height: this.task.height / 2
      }
    },
    /**
     * Get clip path id
     *
     * @returns {string}
     */
    clipPathId() {
      return 'gantt-elastic__task-clip-plan-path-' + this.task.id;
    },

    /**
     * Get points
     *
     * @returns {string}
     */
    getPoints() {
      const viewbox = this.viewbox;
      return `0,0 ${viewbox.width},0 ${viewbox.width},${viewbox.height} 0,${viewbox.height}`;
    }
  }
};
</script>
