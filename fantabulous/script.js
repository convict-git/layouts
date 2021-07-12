const debug = (...args) => {
  console.log(...args);
};

/* some variables to handle the state */
let rows = 25,
  cols = 35,
  blocked_rows = 4,
  blocked_cols = 3,
  N = 10,
  M = 10;

let free_rows = () => {
    return rows - blocked_rows;
  },
  free_cols = () => {
    return cols - blocked_cols;
  };

/* Matrix to store the labels for the cells */
let label_matrix;

const resize_mat = () => {
  label_matrix = new Array(rows);
  for (let r = 0; r < rows; ++r) {
    label_matrix[r] = new Array(cols);
    for (let c = 0; c < cols; ++c) {
      label_matrix[r][c] = `${r + 1}, ${c + 1}`;
    }
  }
};

/* Helper function to give a div dom with classes */
const get_div = (class_str_list, height, width) => {
  let div = document.createElement("div");
  div.classList.add(...class_str_list);
  if (height != null) div.style.height = `${height}px`;
  if (width != null) div.style.width = `${width}px`;
  return div;
};

const cell = {
  height: 30,
  width: 75,
  get_cell: function (r, c) {
    let cell = get_div(["cell"], this.height, this.width);
    if (r != null && c != null) cell.innerHTML = `${label_matrix[r][c]}`;
    return cell;
  },
  populate_cells: function (parent_dom_obj, r_beg, r_end, c_beg, c_end) {
    for (let r = r_beg; r <= r_end; ++r)
      for (let c = c_beg; c <= c_end; ++c)
        parent_dom_obj.append(this.get_cell(r, c));
  },
};
const screen = {
  get_screen_height: () => {
    return (
      cell.height *
      Math.max(blocked_rows + (free_rows() != 0 ? 1 : 0), Math.min(N, rows))
    );
  },
  get_screen_width: () => {
    return (
      cell.width *
      Math.max(blocked_cols + (free_cols() != 0 ? 1 : 0), Math.min(M, cols))
    );
  },
  /* Get the main screen dom */
  get_screen_dom: function () {
    let screen = get_div(
      ["screen-area"],
      this.get_screen_height(),
      this.get_screen_width()
    );
    return screen;
  },
};

const sheet_main_div = document.querySelector(".sheet-main-div");

const redraw = () => {
  debug(rows, cols, blocked_rows, blocked_cols, N, M);
  debug(screen.get_screen_height(), screen.get_screen_width());
  resize_mat();
  /* empty out main sheet */
  sheet_main_div.innerHTML = "";
  let scr_dom = screen.get_screen_dom();

  /* Use need the upper horizontal section ? */
  if (blocked_rows > 0) {
    let hor_div = get_div(["horizontal-section"]);
    /* blocked section - left scrollable section */
    if (blocked_cols > 0) {
      /* blocked section */
      let blocked_sec = get_div(
        ["blocked", "section"],
        cell.height * blocked_rows,
        cell.width * blocked_cols
      );
      cell.populate_cells(
        blocked_sec,
        0,
        blocked_rows - 1,
        0,
        blocked_cols - 1
      );
      hor_div.append(blocked_sec);
    }

    /* left scrollable section? */
    if (free_cols() > 0) {
      let left_scroll_con = get_div(
        ["left-scrollable-container"],
        cell.height * blocked_rows,
        screen.get_screen_width() - cell.width * blocked_cols
      );

      let left_scroll_div = get_div(
        ["left-scroll-div", "section"],
        cell.height * blocked_rows,
        cell.width * free_cols()
      );
      cell.populate_cells(
        left_scroll_div,
        0,
        blocked_rows - 1,
        blocked_cols,
        cols - 1
      );

      left_scroll_con.append(left_scroll_div);
      hor_div.append(left_scroll_con);
    }
    scr_dom.append(hor_div);
  }

  /* down scrollable section - full scrollable section */
  if (free_rows() > 0) {
    let hor_div = get_div(["horizontal-section"]);

    /* down scrollable section */
    if (blocked_cols > 0) {
      let down_scroll_con = get_div(
        ["down-scrollable-container"],
        screen.get_screen_height() - cell.height * blocked_rows,
        cell.width * blocked_cols
      );

      let down_scroll_div = get_div(
        ["down-scroll-div", "section"],
        cell.height * free_rows(),
        cell.width * blocked_cols
      );
      cell.populate_cells(
        down_scroll_div,
        blocked_rows,
        rows - 1,
        0,
        blocked_cols - 1
      );

      down_scroll_con.append(down_scroll_div);
      hor_div.append(down_scroll_con);
    }

    /* full-scrollable section */
    if (free_cols() > 0) {
      let fully_scroll_con = get_div(
        ["fully-scrollable-container"],
        screen.get_screen_height() - cell.height * blocked_rows,
        screen.get_screen_width() - cell.width * blocked_cols
      );

      let fully_scroll_div = get_div(
        ["fully-scroll-div", "section"],
        cell.height * free_rows(),
        cell.width * free_cols()
      );
      cell.populate_cells(
        fully_scroll_div,
        blocked_rows,
        rows - 1,
        blocked_cols,
        cols - 1
      );

      fully_scroll_con.append(fully_scroll_div);
      hor_div.append(fully_scroll_con);
    }

    scr_dom.append(hor_div);
  }
  sheet_main_div.append(scr_dom);
};
