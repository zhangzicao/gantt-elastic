<!--
/**
 * @fileoverview PostponseBar component
 * @license MIT
 * @author zhangzicao <729300423@qq.com>
 * @package GanttElastic
 */
-->
<template>
  <path
    class="gantt-elastic__chart-row-postponse-bar-outline"
    :style="{
          ...root.style['chart-row-postponse-bar-outline'],
          ...task.style['chart-row-postponse-bar-outline'],
        }"
    :d="getLinePoints"
  ></path>
</template>

<script>
export default {
  name: 'PostponseSign',
  inject: ['root'],
  props: ['task'],
  data() {
    return {};
  },

  computed: {
    /**
     * Get line points
     *
     * @returns {string}
     */
    getLinePoints() {
      const start = this.task.width - this.task.width * this.task.postponse/this.task.duration;
      const height = this.task.height;
      return `M ${start} 1 L ${start} ${height-1}`;
    },
  },
};
</script>
