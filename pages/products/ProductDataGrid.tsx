import DeleteIcon from '@mui/icons-material/Delete'
import PublishIcon from '@mui/icons-material/Publish'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import {
  DataGrid,
  GridActionsCellItem,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import NextLink from 'next/link'

import { Product } from '@/src/models'

type ProductDataGridProps = {
  products: Product[]
  onDeleteClick: (productId: string) => {}
}

export default function ProductDataGrid(props: ProductDataGridProps) {
  const { products, onDeleteClick } = props
  const theme = useTheme()

  const Link = (props: { href: string; children: React.ReactNode }) => {
    return (
      <Typography
        component={NextLink}
        href={props.href}
        variant="body2"
        sx={{ color: theme.palette.primary.main }}
      >
        {props.children}
      </Typography>
    )
  }

  const currencyFormatter = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
  })

  return (
    <DataGrid
      rows={products}
      columns={[
        {
          field: 'id',
          headerName: 'ID',
          width: 110,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.id?.substring(0, 8) ?? ''}`,
          renderCell: (params: GridRenderCellParams) => (
            <Link href={`/products/${params.row.id}`}>
              {params.row.id.substring(0, 8)}
            </Link>
          ),
        },
        {
          field: 'name',
          headerName: '名稱',
          flex: 1,
          minWidth: 200,
          maxWidth: 500,
          editable: true,
        },
        {
          field: 'price',
          headerName: '售價',
          type: 'number',
          editable: true,
          valueFormatter: ({ value }) => currencyFormatter.format(value),
        },
        {
          field: 'cost',
          headerName: '成本',
          type: 'number',
          editable: true,
          valueFormatter: ({ value }) => currencyFormatter.format(value),
        },
        {
          field: 'provider',
          headerName: '供應商',
          minWidth: 60,
          editable: true,
          type: 'singleSelect',
          valueFormatter: ({ value }) => value,
          valueOptions: [
            {
              value: '',
              label: '-',
            },
            {
              value: 'CAT',
              label: '葉貓子 日韓彩妝食品雜貨批發社團',
            },
            {
              value: 'MONEY',
              label: 'MONEY株式會社',
            },
            {
              value: 'APPLE',
              label: 'GAUK✿日韓台✿彩妝&用品&食品&銀飾等商品',
            },
            {
              value: 'MITAGO',
              label: 'Mitago商城',
            },
          ],
        },
        {
          field: 'offShelfTime',
          headerName: '下架時間',
          // type: 'date',
          // valueGetter: ({ value }) => value && new Date(value),
          width: 200,
          editable: true,
        },
        {
          field: 'actions',
          type: 'actions',
          getActions: params => [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="刪除"
              onClick={() => onDeleteClick(params.id.toString())}
              key="delet"
            />,
            <GridActionsCellItem
              icon={<PublishIcon />}
              label="發佈"
              onClick={() => console.log('Publish', params.id)}
              key="publish"
            />,
          ],
        },
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 25,
          },
        },
      }}
      pageSizeOptions={[10, 25, 50]}
      checkboxSelection
      disableRowSelectionOnClick
      slots={{
        toolbar: GridToolbar,
      }}
    />
  )
}