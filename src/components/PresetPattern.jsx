import React from 'react'


const PresetPattern = ({ grid, set_grid}) =>
{
    
    const patterns = {
        empty: {values: [[false]], max_x: 1, max_y: 1},
        glider: {values:[
            [false, false, false],
            [true, false, false],
            [false, true, true],
            [true, true, false]
        ], max_x: 3, max_y: 4},
    };

    const handle_pattern_change = (e) =>
        {
            const new_pattern = patterns[e.target.value];
            const new_grid = grid.map(
                (row, i) =>
                    row.map(
                        (cell, j) =>
                        {

                            const pattern_i = i % new_pattern.max_x;
                            const pattern_j = j % new_pattern.max_y;
                            return new_pattern.values[pattern_i][pattern_j];
                        }
                    )
            )
            set_grid(new_grid);
        }
    return (
        <div>
            <select onChange={handle_pattern_change}>
                <option selected value="empty">Empty</option>
                <option value="glider">Glider</option>
            </select>
        </div>
    )
};

export {PresetPattern};