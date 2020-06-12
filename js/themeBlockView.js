define([
  "./themeView",
  "core/js/adapt"
], function(ThemeView, Adapt) {

  var ThemeBlockView = ThemeView.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:resize', this.setStyles);
			this.listenTo(Adapt, 'remove', this.remove);
		},

		setStyles: function() {
			this.setBackground();
			this.setMinHeight();
			this.setDividerBlock();
		},

		setBackground: function() {
			var backgroundColor = this.model.get('_themeBlockConfig')._backgroundColor;
			
			if (backgroundColor) {
				this.$el.addClass(backgroundColor);
			}
		},

		setMinHeight: function() {
			var minHeight = 0;
			var minHeights = this.model.get('_themeBlockConfig')._minimumHeights;

			if (minHeights) {

				if(Adapt.device.screenSize == 'large') {
					minHeight = minHeights._large;
				} else if (Adapt.device.screenSize == 'medium') {
					minHeight = minHeights._medium;
				} else {
					minHeight = minHeights._small;
				}
			}

			this.$el.css({
				minHeight: minHeight + "px"
			});
		},

		setDividerBlock: function() {
			var dividerBlock = this.model.get('_themeBlockConfig')._isDividerBlock;

			if (dividerBlock) {
				this.$el.addClass('divider-block');
			}
		},

    	className: function() {
      		return this.model.get("_isDividerBlock") ? "is-divider-block" : "";
    	},

    	setCustomStyles: function() {},

    	onRemove: function() {}

  });

  return ThemeBlockView;

});