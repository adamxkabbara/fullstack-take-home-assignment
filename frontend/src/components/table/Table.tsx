import { memo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useQuery } from '@apollo/client/react'
import { GetUsersAndPostsDocument, type GetUsersAndPostsQuery } from '../../__generated__/graphql'
import { useState } from 'react'

import { TableFilters } from './TableFilters'
import { GenericCell } from './cells/GenericCell'
import { HoverableCell } from './cells/HoverableCell'
import { Posttip } from "../Posttip";
import { LoadingSpinner } from '../LoadingSpinner'
import "./Table.css";

const columnHelper = createColumnHelper<GetUsersAndPostsQuery['users'][0]>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: info => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor('posts', {
    header: 'Posts',
    cell: info => (
      <HoverableCell value={info.getValue().length}>
        {
          info.getValue().length ? <Posttip
            posts={info.getValue().map((post) => ({
              title: post.title ?? '',
              body: post.body ?? '',
            }))}
          /> : null
          }
      </HoverableCell>
    ),
    enableSorting: false
  }),
]

const TableContent = memo(() => {
  const { data: usersData, loading, error } = useQuery(GetUsersAndPostsDocument, {
    variables: {
      filters: {},
    },
  })
  
  const data: GetUsersAndPostsQuery['users'] = usersData?.users ?? []
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  if (loading) return <div className='flex justify-center'><LoadingSpinner color='#3f50b5' /></div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <table className='w-full bg-[#323232]'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='text-center p-2'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='p-2 text-left'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='nth-of-type-2:bg-[#404040]'>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} data-cell={cell.column.columnDef.header} className='p-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
    </table>
  )
})

export const Table = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='max-w-2xl p-2'>
      <TableFilters searchValue={searchValue} setSearchValue={setSearchValue} />
      <TableContent />
    </div>
  )
}
