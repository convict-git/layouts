const debug = (...args) => {
  console.log(...args);
};

/* some variables to handle the state */
let rows = 25 /* Total rows in the grid */,
  cols = 35 /* Total cols in the grid */,
  blocked_rows = 4 /* Rows to be blocked */,
  blocked_cols = 3 /* Cols to be blocked */,
  N = 10 /* Screen height parameter */,
  M = 10; /* Screen width paramter */

/* functions to return free rows and free cols */
const free_rows = () => {
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
      /* This can be anything, like fetching from a file, server etc */
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

/* Cell */
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

/* Screen */
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

  resize_mat(); /* resize the label matrix based on values in labelmatrix */
  sheet_main_div.innerHTML = ""; /* empty out main sheet */
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
        blocked_sec /* Populate the grid */,
        0,
        blocked_rows - 1,
        0,
        blocked_cols - 1
      );
      /* Add the blocked section in the first horizontal div */
      hor_div.append(blocked_sec);
    }

    /* left scrollable section? */
    if (free_cols() > 0) {
      /* left scrollable container which overflows scroll */
      let left_scroll_con = get_div(
        ["left-scrollable-container"],
        cell.height * blocked_rows,
        screen.get_screen_width() - cell.width * blocked_cols
      );

      /* left scroll actual div which is a grid of cells */
      let left_scroll_div = get_div(
        ["left-scroll-div", "section"],
        cell.height * blocked_rows,
        cell.width * free_cols()
      );
      cell.populate_cells(
        left_scroll_div /* Populate the grid */,
        0,
        blocked_rows - 1,
        blocked_cols,
        cols - 1
      );

      left_scroll_con.append(left_scroll_div); /* Add the div in container */
      hor_div.append(
        left_scroll_con
      ); /* Add the container in horizontal section */
    }
    scr_dom.append(hor_div); /* Add the horizonal section in screeen */
  }

  /* down scrollable section - full scrollable section */
  if (free_rows() > 0) {
    let hor_div = get_div(["horizontal-section"]);

    /* down scrollable section */
    if (blocked_cols > 0) {
      /* down scrollable container which overflows scroll */
      let down_scroll_con = get_div(
        ["down-scrollable-container"],
        screen.get_screen_height() - cell.height * blocked_rows,
        cell.width * blocked_cols
      );

      /* down scroll actual div which is a grid of cells */
      let down_scroll_div = get_div(
        ["down-scroll-div", "section"],
        cell.height * free_rows(),
        cell.width * blocked_cols
      );
      cell.populate_cells(
        down_scroll_div /* Populate grid with cells */,
        blocked_rows,
        rows - 1,
        0,
        blocked_cols - 1
      );

      down_scroll_con.append(down_scroll_div); /* Add the div in container */
      hor_div.append(
        down_scroll_con
      ); /* Add the container in horizontal section */
    }

    /* full-scrollable section */
    if (free_cols() > 0) {
      /* fully scrollable container which overflows scroll */
      let fully_scroll_con = get_div(
        ["fully-scrollable-container"],
        screen.get_screen_height() - cell.height * blocked_rows,
        screen.get_screen_width() - cell.width * blocked_cols
      );

      /* fully scroll actual div which is a grid of cells */
      let fully_scroll_div = get_div(
        ["fully-scroll-div", "section"],
        cell.height * free_rows(),
        cell.width * free_cols()
      );
      cell.populate_cells(
        fully_scroll_div /* Populate grid with cells */,
        blocked_rows,
        rows - 1,
        blocked_cols,
        cols - 1
      );

      fully_scroll_con.append(fully_scroll_div); /* Add the div in container */
      hor_div.append(
        fully_scroll_con
      ); /* Add the container in horizontal section */
    }

    scr_dom.append(hor_div); /* Add the horizonal section in screeen */
  }
  sheet_main_div.append(scr_dom); /* Add the screen to main sheet */

  /* Redrawing complete */
};
