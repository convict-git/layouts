var current_offset = 0;
var shift = 232;

const addRestItem = function (rating) {
  let html_content = `<div class="image-pos"></div>
  <div class="content-pos">
     <div class="food-name"></div>
     <div class="food-category"></div>
     <div class="food-rating">
        <div class="rating-container">
           <i class="material-icons">star</i>
           <span>${rating}</span>
        </div>
     </div>
     <div class="food-prep-time"></div>
     <div class="food-cost"></div>
  </div>`;
  let rest_dom = document.querySelector(".show-rest");
  let new_item = document.createElement("div");
  new_item.classList.add("dish-card");
  new_item.innerHTML = html_content;
  rest_dom.append(new_item);
};

const leftOffset = function (dom_obj) {
  return dom_obj.getBoundingClientRect().left;
};

const rightOffset = function (dom_obj) {
  return dom_obj.getBoundingClientRect().right;
};

document.querySelector(".left-slide-but").addEventListener("click", () => {
  console.log("left clicked");
  let boxes = document.querySelectorAll(".inside-box");
  let main_slider = document.querySelector(".main-slider");
  // console.log(leftOffset(boxes[0]), leftOffset(main_slider));

  if (leftOffset(boxes[0]) >= leftOffset(main_slider)) {
    // Getting out of bounds, remove the left-slide-but
    console.log("Left Getting out!!");
    document.querySelector(".left-slide-but").classList.add("hidden");
  } else {
    // shift to left
    current_offset = current_offset + shift;
    boxes.forEach((el) => {
      el.style.transform = `translateX(${current_offset}px)`;
    });
  }

  // recover right-slide-but
  if (
    rightOffset(boxes[boxes.length - 1]) - shift <=
    rightOffset(main_slider)
  ) {
    console.log("Right got inside!!");
    document.querySelector(".right-slide-but").classList.remove("hidden");
  }
});

document.querySelector(".right-slide-but").addEventListener("click", () => {
  console.log("right clicked");
  let boxes = document.querySelectorAll(".inside-box");
  let main_slider = document.querySelector(".main-slider");

  if (rightOffset(boxes[boxes.length - 1]) <= rightOffset(main_slider)) {
    // Getting out of bounds, remove the right-slide-but
    console.log("Right Getting out!!");
    document.querySelector(".right-slide-but").classList.add("hidden");
  } else {
    current_offset = current_offset - shift;
    document.querySelectorAll(".inside-box").forEach((el) => {
      el.style.transform = `translateX(${current_offset}px)`;
    });
  }

  // recover left-slide-but is possible
  // console.log(leftOffset(boxes[0]) - shift, leftOffset(main_slider));
  if (leftOffset(boxes[0]) - shift <= leftOffset(main_slider)) {
    console.log("Left got inside!!");
    document.querySelector(".left-slide-but").classList.remove("hidden");
  }
});

for (let x = 1; x <= 15; x++) {
  addRestItem(1 + Math.floor(Math.random() * 5));
}
