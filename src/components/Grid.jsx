import React, {useState, useCallback, useRef} from 'react';
import './Grid.css';
import {Run, GridSizeControl, BorderControl, ChangeColor, SpeedControl} from './GridControls.jsx';
import { CreateGrid } from './CreateGrid.jsx';

const Grid = () =>{

    const [running, set_running] = useState(false);
    const [is_dragging, set_is_dragging] = useState(false);
    const [show_border, set_show_border] = useState(true);
    const [speed, set_speed] = useState(100);
    const [rows, set_rows] = useState(15);
    const [cols, set_cols] = useState(15);
    const [color, set_color] = useState('grey');


    const control_props = {
        rows,
        set_rows,
        cols,
        set_cols
    };

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
        <GridSizeControl
            {...control_props}
            grid={grid}
            set_grid={set_grid}
        />
        <CreateGrid
            grid={grid}
            color={color}
            cols={cols}
            handle_mouse_up={handle_mouse_up}
            handle_mouse_down={handle_mouse_down}
            handle_mouse_enter={handle_mouse_enter}
            show_border={show_border}
        />
        <Run
            running={running}
            run_simulation={run_simulation}
            set_running={set_running}
            running_ref={running_ref}
        />
        <BorderControl
            show_border={show_border}
            set_show_border={set_show_border}
        />
        <SpeedControl 
            speed={speed}
            set_speed={set_speed}
        />
        <ChangeColor
            set_color={set_color}
        />
        </>
    )
}



export default Grid;

