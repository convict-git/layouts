/* Button events */

let rows_btn = document.querySelector("#inp-rows"),
  cols_btn = document.querySelector("#inp-cols"),
  blocked_rows_btn = document.querySelector("#inp-blocked-rows"),
  blocked_cols_btn = document.querySelector("#inp-blocked-cols"),
  n_btn = document.querySelector("#inp-N"),
  m_btn = document.querySelector("#inp-M");

(rows_btn.defaultValue = 25),
  (cols_btn.defaultValue = 35),
  (blocked_rows_btn.defaultValue = 4),
  (blocked_cols_btn.defaultValue = 3),
  (n_btn.defaultValue = 10),
  (m_btn.defaultValue = 10);

/* This function is called at each event of value changes */
const exec = () => {
  redraw();
  assign_scroll_events();
};
exec();

/* Reads inp from the button, corrects invalid input */
const read_n_check = (inp_btn) => {
  let x = parseInt(inp_btn.value.trim() || inp_btn.defaultValue);
  debug(x);
  if (x < 0 || isNaN(x)) {
    inp_btn.value = 0;
    x = 0;
  }
  return x;
};

rows_btn.addEventListener("input", () => {
  rows = read_n_check(rows_btn);
  if (rows < blocked_rows) {
    blocked_rows_btn.value = rows;
    blocked_rows = rows;
  }
  exec();
});

cols_btn.addEventListener("input", () => {
  cols = read_n_check(cols_btn);
  if (cols < blocked_cols) {
    blocked_cols_btn.value = cols;
    blocked_cols = cols;
  }
  exec();
});

blocked_rows_btn.addEventListener("input", () => {
  blocked_rows = read_n_check(blocked_rows_btn);
  if (blocked_rows > rows) {
    blocked_rows_btn.value = rows;
    blocked_rows = rows;
  }
  exec();
});

blocked_cols_btn.addEventListener("input", () => {
  blocked_cols = read_n_check(blocked_cols_btn);
  if (blocked_cols > cols) {
    blocked_cols_btn.value = cols;
    blocked_cols = cols;
  }
  exec();
});

n_btn.addEventListener("input", () => {
  N = read_n_check(n_btn);
  exec();
});

m_btn.addEventListener("input", () => {
  M = read_n_check(m_btn);
  exec();
});
