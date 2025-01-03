import React from 'react'
import { InputField } from './InputField'
import { CiSearch } from 'react-icons/ci'


export const SearchPanel = ({className}) => {
    return (
        <>
            <InputField startIcon={<CiSearch />} placeholder={'Search projects ...'} id={'search'}  className={className}/>
        </>
    )
}
