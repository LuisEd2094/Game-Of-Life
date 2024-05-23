import React from 'react';

const max_size = 20;
const min_size = 10;

const Run = ({running, run_simulation, set_running, running_ref}) =>
{
    return (
        <div>
            <button
            onClick={() =>
                {
                    set_running(!running);
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
        </div>
    )
};

const GridSizeControl = ({rows, set_rows, cols, set_cols, grid, set_grid}) => 
{
    return (
        <div>
            <button
            onClick={() =>
                {
                    console.log(cols);
                    const new_row= Math.min(max_size, rows + 1);
                    if (rows !== 20)
                    {
                        const new_grid = [...grid, Array(cols).fill(false)];
                        set_rows(new_row);
                        set_grid(new_grid);
                    }
                }
            }>
            Increase Rows
            </button>
            <button onClick={() =>
                    {
                        const new_row= Math.max(min_size, rows - 1);
                        set_rows(new_row);
                        const new_grid = grid.slice(0, new_row);
                        set_grid(new_grid);
                    }
                }>
            Decrease Rows
            </button>
            <button
            onClick={() =>
                {
                    const new_cols= Math.min(max_size, cols + 1);
                    if (cols !== 20)
                    {
                        const new_grid = grid.map(row => [...row, false] );
                        set_cols(new_cols);
                        set_grid(new_grid);
                    }
                }
            }>
            Increase Cols
            </button>
            <button
            onClick={() =>
                {
                    const new_cols= Math.max(min_size, cols - 1);
                    if (cols !== 10)
                    {
                        const new_grid = grid.map(row => row.slice(0,  -1) );
                        set_cols(new_cols);
                        set_grid(new_grid);
                    }
                }
            }>
            Decrease Cols
            </button>
        </div>
    )
}


const BorderControl = ({show_border, set_show_border}) =>{
    return (
        <div>
            <button onClick={() =>
                {
                    set_show_border(!show_border);
                }
            }>
            {show_border ? "Hide border" : "Show border"} 
            </button>
        </div>
    )
};

const ChangeColor = ({set_color}) => {
    return (
        <div>
            <button onClick={() => set_color('red')}>Red</button>
            <button onClick={() => set_color('green')}>Green</button>
            <button onClick={() => set_color('blue')}>Blue</button>
            <button onClick={() => set_color('black')}>Black</button>
            <button onClick={() => set_color('white')}>White</button>
            <button onClick={() => set_color('grey')}>Grey</button>

        </div>
    )
}

const SpeedControl = ({speed, set_speed}) => {
    return (
        <div>
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
        </div>
    )
}

export {GridSizeControl, Run, BorderControl, ChangeColor, SpeedControl};