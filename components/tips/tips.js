import Component from '../component'
module.exports = {
  show(opts = {}) {
    const options = Object.assign({}, opts);
    const component = new Component({
      scope: `$tip.tips`,
      data: options,
      methods: {
        /**
         * 隐藏
         */
        hide(cb) {
          setTimeout(() => {
            this.setHidden();
            typeof cb === `function` && cb()
          }, options.timer)
        },
				/**
				 * 显示
				 */
        show() {
          this.setVisible();
        },
      },
    });
    component.show()
    component.hide(opts.success);
  }
}