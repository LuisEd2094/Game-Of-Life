import React, {useState, useCallback, useRef} from 'react';
import './Grid.css';

const num_rows = 50;
const num_cols = 50;

const Grid = () =>{
    const [grid, set_grid] = useState( () => {
        const rows = [];
        for (let i = 0; i < num_rows; ++i)
        {
            rows.push(Array(num_cols).fill(false));
        }
        return rows;
    });
    const [running, set_running] = useState(false);
    const [is_dragging, set_is_dragging] = useState(false);
    const [show_border, set_show_border] = useState(false);
    
    const running_ref = useRef(running);
    

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
        setTimeout(run_simulation, 100);
    }, []);

    return (
        <>
        <div className='Grid' 
        style={{ display: 'grid', gridTemplateColumns: `repeat(${num_cols}, 20px)` }}
        onMouseUp={handle_mouse_up}
        onMouseLeave={handle_mouse_up}
        >
        
            {grid.map((row,i) =>
            row.map((col,j)=>(
                <div
                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: grid[i][j] ? 'black' : undefined,
                        outline: show_border ? 'solid 1px gray' : "none"
                    }}
                    onMouseDown={() =>
                        handle_mouse_down(i, j)
                    }
                    onMouseEnter={() => handle_mouse_enter(i, j)}
                />
            ) ) )}
        </div>
        <button
            onClick={() =>
                {
                    set_running(!running); // sets it to the contrary 
                    if (!running)
                    {
                        running_ref.current = true;
                        run_simulation();
                    }
                    else
                    {
                        running_ref.current = false;
                    }
                }
            }
        >
        {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() =>
            {
                set_show_border(!show_border);
            }
        }>
            {show_border ? "Hide border" : "Show border"}
        </button>
        </>
    )
}


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
                        if (new_i >= 0 && new_i < num_rows && new_j >= 0 && new_j < num_cols)
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


export default Grid;

