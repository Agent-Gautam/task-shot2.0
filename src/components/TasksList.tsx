import { Task } from '../utils/types';
import "keen-slider/keen-slider.min.css";
const TasksList = ({ tasks }: { tasks: Task[]|undefined }) => {
  console.dir(tasks)
  return (
    <div className='keen-slider__slide w-full'>
        {tasks?.map(task => <p key={task.id}>{task.description}</p>)}
    </div>
  );
}

export default TasksList
