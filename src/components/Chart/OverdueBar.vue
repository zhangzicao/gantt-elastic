<!--
/**
 * @fileoverview OverdueBar component
 * @license MIT
 * @author zhangzicao
 * @package GanttElastic
 */
-->
<template>
  <path
    class="gantt-elastic__chart-row-overdue-bar"
    :style="{ ...root.style['chart-row-overdue-bar'], ...task.style['chart-row-overdue-bar'] }"
    :d="getPoints"
  ></path>
</template>

<script>
export default {
  name: 'OverdueBar',
  inject: ['root'],
  props: ['task','type'],
  data() {
    return {};
  },

  computed: {
    /**
     * Get width
     *
     * @returns {string}
     */
    getPoints() {
      if(this.type==='project') {
        const task = this.task;
        const bottom = task.height - task.height / 4;
        const corner = task.height / 6;
        const smallCorner = task.height / 8;
        return `M ${task.originWidth},0
                L ${task.width - smallCorner} 0
                L ${task.width} ${smallCorner}
                L ${task.width} ${bottom}
                L ${task.width - corner} ${task.height}
                L ${task.width - corner * 2} ${bottom}
                L ${task.originWidth} ${bottom}
                Z
        `;
      }else if(this.type==='milestone') {
        const task = this.task;
        const fifty = task.height / 2;
        let offset = fifty;
        if (task.width / 2 - offset < 0) {
          offset = task.width / 2;
        }
        return `M ${this.task.originWidth},0
                L ${this.task.width-offset} 0
                L ${this.task.width} ${fifty}
                L ${this.task.width-offset} ${this.task.height}
                L ${this.task.originWidth} ${this.task.height}
                Z`
      }
      return `M ${this.task.originWidth},0
              L ${this.task.width} 0
              L ${this.task.width} ${this.task.height}
              L ${this.task.originWidth} ${this.task.height}
              Z`
    },
    /**
     * Get width
     *
     * @returns {string}
     */
    getWidth() {
      let result = this.task.width - this.task.originWidth;
      return result>0?result:0
    },
    /**
     * Get height
     *
     * @returns {number}
     */
    getLeft() {
      return this.task.originWidth;
    },
  }
};
</script>
