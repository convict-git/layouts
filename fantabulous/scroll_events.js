/* Scroll Event handling */
let assign_scroll_events = () => {
  let left_scroll_container = document.querySelector(
      ".left-scrollable-container"
    ),
    down_scroll_container = document.querySelector(
      ".down-scrollable-container"
    ),
    fully_scroll_container = document.querySelector(
      ".fully-scrollable-container"
    );

  if (left_scroll_container != null) {
    left_scroll_container.onscroll = function () {
      if (fully_scroll_container != null) {
        fully_scroll_container.scrollLeft = this.scrollLeft;
      }
    };
  }

  if (down_scroll_container != null) {
    down_scroll_container.onscroll = function () {
      if (fully_scroll_container != null) {
        fully_scroll_container.scrollTop = this.scrollTop;
      }
    };
  }

  if (fully_scroll_container != null) {
    fully_scroll_container.onscroll = function () {
      if (left_scroll_container != null) {
        left_scroll_container.scrollLeft = this.scrollLeft;
      }
      if (down_scroll_container != null) {
        down_scroll_container.scrollTop = this.scrollTop;
      }
    };
  }
};
