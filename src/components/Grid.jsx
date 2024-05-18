import React, {useState, useEffect} from 'react';
import './Grid.css';

const num_rows = 30;
const num_cols = 30;

const Grid = () =>{
    const [grid, set_grid] = useState( () => {
        const rows = [];
        for (let i = 0; i < num_rows; ++i)
        {
            rows.push(Array(num_cols).fill(false));
        }
        return rows;
    });

    return (
        <div className='Grid' style={{ display: 'grid', gridTemplateColumns: `repeat(${num_cols}, 20px)` }}>

            {grid.map((row,i) =>
            row.map((col,j)=>(
                <div
                    key={`${i}-${j}`}
                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: grid[i][j] ? 'black' : undefined,
                        border: 'solid 1px gray'
                    }}
                    onClick={() =>{
                        const new_grid = grid.slice();
                        new_grid[i][j] = !grid[i][j];
                        set_grid(new_grid);
                    }}
                />
            ) ) )}
        </div>

    )
}


export default Grid;

