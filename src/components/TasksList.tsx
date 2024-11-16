import { Task } from '../utils/types';

const TasksList = ({ tasks }: { tasks: Task[]|undefined }) => {
  console.dir(tasks)
  return (
    <div>
      
      <div>
        {tasks?.map(task => <p key={task.id}>{task.description}</p>)}
      </div>
    </div>
  );
}

export default TasksList
