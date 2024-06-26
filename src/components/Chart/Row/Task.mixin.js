/**
 * @fileoverview Task mixin
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */

export default {
  props: {
    isPlanBar:{
      type: Boolean
    }
  },
  computed: {
    viewbox(){
      if(this.root.state.options.showPlanBar){
        if(this.rowShowPlanBar)
          return {
            x: this.task.x,
            y: this.task.y + this.task.height/2,
            width: this.task.width,
            height: this.task.height / 2
          }
        else
          return {
            x: this.task.x,
            y: this.task.y + this.task.height/4,
            width: this.task.width,
            height: this.task.height / 2
          }
      }else{
        return {
          x: this.task.x,
          y: this.task.y,
          width: this.task.width,
          height: this.task.height,
        }
      }
    },
    rowShowPlanBar(){
      return this.root.state.options.showPlanBar && this.task.plan !== false && this.task.planX && this.task.planDuration
    },
    /**
     * Get view box
     *
     * @returns {string}
     */
    getViewBox() {
      const task = this.task;
      return `0 0 ${task.width} ${task.height}`;
    },

    /**
     * Get group transform
     *
     * @returns {string}
     */
    getGroupTransform() {
      return `translate(${this.task.x} ${this.task.y})`;
    },

    /**
     * Should we display expander?
     *
     * @returns {boolean}
     */
    displayExpander() {
      const expander = this.root.state.options.chart.expander;
      return expander.display || (expander.displayIfTaskListHidden && !this.root.state.options.taskList.display);
    }
  },
  methods: {
    /**
     * Emit event
     *
     * @param {string} eventName
     * @param {Event} event
     */
    emitEvent(eventName, event) {
      if (!this.root.state.options.scroll.scrolling) {
        this.root.$emit(`chart-${this.task.type}-${eventName}`, { event, data: this.task });
      }
    }
  }
};
