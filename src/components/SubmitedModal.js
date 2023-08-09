import React from 'react'

const SubmitedModal = ({ open, control, link }) => {
    return (
        open && (
            <>
                <div
                    onClick={control}
                    className='fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer'
                ></div>
                <div className='rounded w-[400px] md:w-[600px] space-y-8 bg-slate-900 p-10 border-gray-700 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
                    <h2 className='mt-6 text-center text-2xl font-extrabold text-cyan'>
                        আপনি এসাইনমেন্ট এ যা জমা দিয়েছেন
                    </h2>
                    <form className='mt-8 space-y-6'>
                        <div className='rounded-md shadow-sm -space-y-px'>
                            <div className='mb-3 space-y-2'>
                                <label
                                    htmlFor='repoLink'
                                    className='text-sm font-medium'
                                >
                                    Github Repository Link
                                </label>
                                <input
                                    id='repoLink'
                                    name='repoLink'
                                    type='url'
                                    required
                                    className='border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white'
                                    value={link}
                                    disabled
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    )
}

export default SubmitedModal
