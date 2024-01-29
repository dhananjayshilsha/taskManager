import React, { useState } from 'react'
import { Link } from 'react-router-dom';


import { Table } from '../ui/table';
import TitleWithSort from './utils/title-with-sort'
import { firstCapLetter } from '../ui/firs-cap-letter';
import Badge from '../ui/badge';
import Tooltip from './utils/Tooltip';


export default function TaskList({
    products,
    onSort,
    onOrder,
    handleDelete,
}) {



    let alignLeft = 'left';


    const [sortingObj, setSortingObj] = useState({
        sort: "desc",
        column: null,
    });



    const onHeaderClick = (column) => ({
        onClick: () => {
            onSort((currentSortDirection) =>
                currentSortDirection === "desc" ? "asc" : "desc"
            );
            onOrder(column);

            setSortingObj({
                sort: sortingObj.sort === "desc" ? "asc" : "desc",
                column: column,
            });
        },
    });


    const statusColors = {
        PENDING: 'bg-red-400 text-white',
        PROCESSING: 'bg-yellow-400 text-white',
        COMPLETED: 'bg-green-500 text-white',
    };

    let columns = [
        {
            title: 'Id',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            align: 'center',
            ellipsis: true,
            render: (type, record, index) => {
                const rowCount = index + 1;
                return (
                  <span className="truncate whitespace-nowrap">
                    {rowCount}
                  </span>
                );
              },
        },
        {
            title: (
                <TitleWithSort
                    title='Title'
                    ascending={
                        sortingObj.sort === "asc" && sortingObj.column === 'title'
                    }
                    isActive={sortingObj.column === 'title'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'title',
            key: 'title',
            align: alignLeft,
            width: 250,
            ellipsis: true,
            onHeaderCell: () => onHeaderClick('title'),
        },
        {
            title: (
                <TitleWithSort
                    title='Description'
                    ascending={
                        sortingObj.sort === "asc" && sortingObj.column === 'description'
                    }
                    isActive={sortingObj.column === 'description'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'description',
            key: 'description',
            align: alignLeft,
            width: 300,
            ellipsis: true,
            onHeaderCell: () => onHeaderClick('description'),
        },
        {
            title: 'Task Priority',
            dataIndex: 'priority',
            key: 'priority',
            align: alignLeft,
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            width: 180,
            render: (status, record) => (
                <>
                    <div
                        className={`flex justify-start ${record?.quantity > 0 && record?.quantity < 10
                            ? 'flex-col items-baseline space-y-3 3xl:flex-row 3xl:space-x-3 3xl:space-y-0 rtl:3xl:space-x-reverse'
                            : 'items-center space-x-3 rtl:space-x-reverse'
                            }`}
                    >
                        <Badge
                            text={firstCapLetter(status)}
                            color={
                                statusColors[status.toUpperCase()] || 'bg-accent'
                            }
                        />
                    </div>
                </>
            )
        },
        {
            title: 'Action',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            align: 'center',
            ellipsis: true,
            render: (_id, record) => (
                <>
                    <Tooltip text={"Edit this task"} position={"top"}>
                        <Link to={`/tasks/${record._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                        <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(record._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </span>
                    </Tooltip>
                </>
            ),
        },
    ];


    return (
        <div className="mb-6 overflow-hidden rounded shadow">
            <Table
                /* @ts-ignore */
                columns={columns}
                emptyText='Empty-data'
                data={products}
                rowKey="id"
                scroll={{ x: 900 }}
            />
        </div>
    )
}


