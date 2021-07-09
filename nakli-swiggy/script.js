var current_offset = 0;
var shift = 232;

document.querySelector(".left-slide-but").addEventListener("click", () => {
  console.log("left clicked");
  current_offset = current_offset + shift;
  document.querySelectorAll(".inside-box").forEach((el) => {
    el.style.transform = `translateX(${current_offset}px)`;
  });
});

document.querySelector(".right-slide-but").addEventListener("click", () => {
  console.log("right clicked");
  current_offset = current_offset - shift;
  document.querySelectorAll(".inside-box").forEach((el) => {
    el.style.transform = `translateX(${current_offset}px)`;
  });
});
