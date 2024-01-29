import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';
import TaskList from './Task-List';
import Input, { Select } from './utils/Input';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState('desc');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');


  const fetchTasks = useCallback(() => {
    const config = {
      url: `/tasks?orderBy=${orderBy}&sortedBy=${sortedBy}&status=${status}&search=${search}`, method: "get",
      headers: { Authorization: authState.token }
    };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData, orderBy, sortedBy, search, status]);


  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [sortedBy, orderBy])

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [search, status])


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'PROCESSING', label: 'Processing' },
    { value: 'COMPLETED', label: 'Completed' },
  ];



  console.log({ search, status })



  return (
    <>
      <div className="my-2 mx-auto max-w-[900px] py-4">

        <div className=' flex space-x-5'>
          <div>
            {tasks.length !== 0 && <h2 className='my-5 ml-2 md:ml-0 text-xl'>Tasks ({tasks.length})</h2>}
          </div>
          <div className='my-2 ml-2 md:ml-0'>
            <Input
              id="search"
              name="search"
              value={search}
              placeholder="Search here.."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='my-2 ml-2 md:ml-0 flex'>
            <div>
              <Select
                id="filter"
                name="filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={statusOptions}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4 '>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : (
              <>

                <TaskList
                  products={tasks}
                  onOrder={setOrder}
                  onSort={setColumn}
                  handleDelete={handleDelete}
                />

                {/* {tasks.map((task, index) => (
                  <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                    <div className='flex'>

                      <span className='font-medium'>Task #{index + 1}</span>

                      <Tooltip text={"Edit this task"} position={"top"}>
                        <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                          <i className="fa-solid fa-pen"></i>
                        </Link>
                      </Tooltip>

                      <Tooltip text={"Delete this task"} position={"top"}>
                        <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </span>
                      </Tooltip>

                    </div>
                    <div className='whitespace-pre'>{task.description}</div>
                  </div>
                ))} */}

              </>

            )}
          </div>
        )}
      </div>
    </>
  )

}

export default Tasks