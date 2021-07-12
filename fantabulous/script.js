const debug = (...args) => {
  console.log(...args);
};

/* some variables to handle the state */
let cell_width = 75,
  cell_height = 30,
  rows = 20,
  cols = 30,
  used_rows = 20,
  used_cols = 30,
  remain_rows = 0,
  remain_cols = 0;

/* Matrix to store the labels for the cells */
let label_matrix;

const resize_mat = () => {
  label_matrix = new Array(rows);
  label_matrix.forEach((el, r) => {
    label_matrix[r] = new Array(cols);
  });
};

const screen = {
  get_screen_height: () => {
    return (
      cell_height *
      Math.max(used_rows + Math.min(0, remain_rows - 1), Math.min(20, rows))
    );
  },
  get_screen_width: () => {
    return (
      cell_width *
      Math.max(used_cols + Math.min(0, remain_cols - 1), Math.min(30, cols))
    );
  },
  /* Get the main screen dom */
  get_screen_dom: () => {
    let screen = document.createElement("div");
    screen.classList.add("screen-area");
    screen.style.width = `${this.get_screen_width()}px`;
    screen.style.height = `${this.get_screen_height()}px`;
    return screen;
  },
};

/* Get indivisual cell */
const get_cell = () => {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = `${cell_width}px`;
  cell.style.height = `${cell_height}px`;
  return cell;
};

const sheet_main_div = document.querySelector("sheet-main-div");
