import moment from 'moment/moment'
import React from 'react'
import { useState } from 'react'
import truncateText from '../../utils/truncateText'

const AssignmentMark = ({ data, handleAddMark }) => {
    const {
        id,
        title,
        createdAt,
        student_name,
        repo_link,
        status,
        totalMark,
        mark: prevMark,
    } = data
    const [mark, setMark] = useState(prevMark || 0)

    return (
        <tr>
            <td className='table-td'>{truncateText(title)}</td>
            <td className='table-td'>
                {moment(createdAt).format('D MMM YYYY, h:mm:ss A')}
            </td>
            <td className='table-td'>{student_name}</td>
            <td className='table-td'>{repo_link}</td>

            {status === 'published' ? (
                <td className='table-td'>{mark}</td>
            ) : (
                <td className='table-td input-mark'>
                    <input
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                    />
                    <svg
                        onClick={() =>
                            handleAddMark(id, Number(mark), Number(totalMark))
                        }
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        className='w-6 h-6 text-green-500 cursor-pointer hover:text-green-400'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4.5 12.75l6 6 9-13.5'
                        />
                    </svg>
                </td>
            )}
        </tr>
    )
}

export default AssignmentMark
