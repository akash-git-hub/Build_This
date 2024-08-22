import React from 'react'
import { InputField } from './InputField'
import { CiSearch } from 'react-icons/ci'


export const SearchPanel = () => {
    return (
        <>
            <InputField startIcon={<CiSearch />} placeholder={'Search project, users...'}  className={'w-50 border-0'}/>
        </>
    )
}
