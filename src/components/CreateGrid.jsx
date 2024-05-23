import React from 'react'

const CreateGrid = ({grid, color, cols, handle_mouse_up, handle_mouse_down, handle_mouse_enter, show_border}) =>
{
    return (
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
    )
}

export {CreateGrid};