import React from 'react';


const Run = ({running, run_simulation, set_running, running_ref}) =>
{
    return (
        <div>
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
        </div>
    )
};

export default Run;

/* const GridControls = ({running, set_running, set_show_border, set_speed}) =>
{
return (
    <div>
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

}; */

