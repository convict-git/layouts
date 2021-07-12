/* Button events */

let rows_btn = document.querySelector("#inp-rows"),
  cols_btn = document.querySelector("#inp-cols"),
  blocked_rows_btn = document.querySelector("#inp-blocked-rows"),
  blocked_cols_btn = document.querySelector("#inp-blocked-cols"),
  N_btn = document.querySelector("#inp-N"),
  M_btn = document.querySelector("#inp-M");

(rows_btn.defaultValue = 25),
  (cols_btn.defaultValue = 35),
  (blocked_rows_btn.defaultValue = 4),
  (blocked_cols_btn.defaultValue = 3),
  (N_btn.defaultValue = 10),
  (M_btn.defaultValue = 10);

let exec = () => {
  redraw();
  assign_scroll_events();
};
exec();

rows_btn.addEventListener("input", () => {
  rows = parseInt(rows_btn.value.trim() || rows_btn.defaultValue);
  if (rows < 0) {
    rows_btn.value = 0;
    rows = 0;
  }
  if (rows < blocked_rows) {
    blocked_rows_btn.value = rows;
    blocked_rows = rows;
  }
  exec();
});

cols_btn.addEventListener("input", () => {
  cols = parseInt(cols_btn.value.trim() || cols_btn.defaultValue);
  if (cols < 0) {
    cols_btn.value = 0;
    cols = 0;
  }
  if (cols < blocked_cols) {
    blocked_cols_btn.value = cols;
    blocked_cols = cols;
  }
  exec();
});

blocked_rows_btn.addEventListener("input", () => {
  blocked_rows = parseInt(
    blocked_rows_btn.value.trim() || blocked_rows_btn.defaultValue
  );
  if (blocked_rows < 0) {
    blocked_rows_btn.value = 0;
    blocked_rows = 0;
  }
  if (blocked_rows > rows) {
    blocked_rows_btn.value = rows;
    blocked_rows = rows;
  }
  exec();
});

blocked_cols_btn.addEventListener("input", () => {
  blocked_cols = parseInt(
    blocked_cols_btn.value.trim() || blocked_cols_btn.defaultValue
  );
  if (blocked_cols < 0) {
    blocked_cols_btn.value = 0;
    blocked_cols = 0;
  }
  if (blocked_cols > cols) {
    blocked_cols_btn.value = cols;
    blocked_cols = cols;
  }
  exec();
});

N_btn.addEventListener("input", () => {
  N = parseInt(N_btn.value.trim() || N_btn.defaultValue);
  if (N < 0) {
    N_btn.value = 0;
    N = 0;
  }
  exec();
});

M_btn.addEventListener("input", () => {
  M = parseInt(M_btn.value.trim() || M_btn.defaultValue);
  if (M < 0) {
    M_btn.value = 0;
    M = 0;
  }
  exec();
});
