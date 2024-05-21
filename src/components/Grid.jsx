import React, {useState, useCallback, useRef} from 'react';
import './Grid.css';
import Run from './GridControls.jsx';


const Grid = () =>{

    const [running, set_running] = useState(false);
    const [is_dragging, set_is_dragging] = useState(false);
    const [show_border, set_show_border] = useState(false);
    const [speed, set_speed] = useState(100);
    const [rows, set_rows] = useState(15);
    const [cols, set_cols] = useState(15);

    const [color, set_color] = useState('grey');
    

    const running_ref = useRef(running);
    const speed_ref = useRef(speed);
    const row_ref = useRef(rows);
    const cols_ref = useRef(cols);

    speed_ref.current = speed;
    running_ref.current = running;
    row_ref.current = rows;
    cols_ref.current = cols;

    
    const [grid, set_grid] = useState( () => {
        const rows = [];
        for (let i = 0; i < row_ref.current; ++i)
        {
            rows.push(Array(cols_ref.current).fill(false));
        }
        return rows;
    });

    const handle_mouse_down = (i , j) =>
    {
        set_is_dragging(true);
        const new_grid = grid.slice();
        new_grid[i][j] = !grid[i][j];
        set_grid(new_grid);
    }
    const handle_mouse_enter = (i, j) =>
    {
        if (!is_dragging) return;
        const new_grid = grid.slice();
        new_grid[i][j] = !grid[i][j];
        set_grid(new_grid);
    }
    const handle_mouse_up = () =>
    {
        set_is_dragging(false);
    }

    const run_simulation = useCallback(() =>
    {
        if (!running_ref.current)
        {
            return; 
        }
        set_grid((g) => run_simulation_logic(g));
        setTimeout(run_simulation, speed_ref.current);
    }, []);



    const operations = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
      ];
    
    
    
    
    const run_simulation_logic = (grid) =>
    {
        const new_grid = grid.map(
            (row, i) =>
            row.map(
                (cell, j) =>
                {
                    let neighbors = 0;
                    operations.forEach(
                        ([x, y]) =>
                        {
                            const new_i = i + x;
                            const new_j = j + y;
                            if (new_i >= 0 && new_i < row_ref.current && new_j >= 0 && new_j < cols_ref.current)
                            {
                                neighbors += grid[new_i][new_j]? 1 : 0;
                            }
                        }
                    );
                    if (cell && (neighbors < 2 || neighbors > 3))
                    {
                        return false;
                    }
                    if (!cell && neighbors === 3)
                    {
                        return true;
                    }
                    return cell;
                }
            )
        );
        return new_grid;
    };
    

    return (
        <>
        <button
            onClick={() =>
                {
                    const new_row= Math.min(20, rows + 1);
                    set_rows(new_row);
                    if (rows !== 20)
                    {
                        const new_grid = [...grid, Array(cols).fill(false)];
                        set_grid(new_grid);
                    }
                }
            }>
            Increase Rows
        </button>
        <button onClick={() =>
                {
                    const new_row= Math.max(10, rows - 1);
                    set_rows(new_row);
                    const new_grid = grid.slice(0, new_row);
                    set_grid(new_grid);
                }
            }>
            Decrease Rows
        </button>
        <div className='Grid' 
        style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 20px)`, alignSelf: 'center'}}
        onMouseUp={handle_mouse_up}
        onMouseLeave={handle_mouse_up}
        >
        
            {grid.map((row,i) =>
            row.map((col,j)=>(
                <div
                    key={`${i}-${j}`}

                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: grid[i][j] ? color : undefined,
                        outline: show_border ? 'solid 1px gray' : "none"
                    }}
                    onMouseDown={() =>
                        handle_mouse_down(i, j)
                    }
                    onMouseEnter={() => handle_mouse_enter(i, j)}
                />
            ) ) )}
        </div>
        <Run
            running={running}
            run_simulation={run_simulation}
            set_running={set_running}
            running_ref={running_ref}
        />
        <button onClick={() =>
            {
                set_show_border(!show_border);
            }
        }>
            {show_border ? "Hide border" : "Show border"}
        </button>
        <button
            onClick={() =>
                {
                    const new_speed = Math.max(10, speed - 10);
                    set_speed(new_speed);
                }
            }>
            Increase Speed
        </button>
        <button onClick={() =>
                {
                    const new_speed = Math.min(500, speed + 10);
                    set_speed(new_speed);
                }
            }>
            Decrease Speed
        </button>
        </>
    )
}



export default Grid;

