import type { AlignmentX, AlignmentY } from '../../types';

type TableProps<Item extends object = object> = {
  layout?: 'auto' | 'fixed';
  headerAlignment?: {
    x?: AlignmentX;
    y?: AlignmentY;
  };
  contentAlignment?: {
    x?: AlignmentX;
    y?: AlignmentY;
  };
  data: Item[];
  getKey: (item: Item) => React.Key;
  getCell: (item: Item) => React.ReactNode;
};

const Table = <Item extends object>({
  layout = 'auto',
  headerAlignment = {
    x: 'center',
    y: 'middle',
  },
  contentAlignment = {
    x: 'center',
    y: 'middle',
  },
  data,
  getKey,
  getCell,
}: TableProps<Item>) => {
  const itemWithMostKeys =
    data.length === 0
      ? null
      : [...data].sort((a, b) =>
          Object.keys(a).length > Object.keys(b).length
            ? -1
            : Object.keys(a).length < Object.keys(b).length
              ? 1
              : 0,
        )[0];
  const headers = !itemWithMostKeys
    ? []
    : Object.keys(itemWithMostKeys).filter(
        (_, i) =>
          i !==
          Object.values(itemWithMostKeys).findIndex(
            value => value === getKey(itemWithMostKeys),
          ),
      );

  return (
    <table
      className={
        layout === 'fixed' ? 'table-fixed break-all' : 'last:*:break-all'
      }
    >
      <thead
        className={`${
          headerAlignment.x === 'left'
            ? 'text-left'
            : headerAlignment.x === 'right'
              ? 'text-right'
              : 'text-center'
        } ${
          headerAlignment.y === 'top'
            ? 'align-top'
            : headerAlignment.y === 'bottom'
              ? 'align-bottom'
              : 'align-middle'
        }`}
      >
        <tr>
          {headers.map((header, index) => (
            <TableHeader key={index} scope="col">
              {header}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody
        className={`${
          contentAlignment.x === 'left'
            ? 'text-left'
            : contentAlignment.x === 'right'
              ? 'text-right'
              : 'text-center'
        } ${
          contentAlignment.y === 'top'
            ? 'align-top'
            : contentAlignment.y === 'bottom'
              ? 'align-bottom'
              : 'align-middle'
        }`}
      >
        {data.map(item => {
          return <tr key={getKey(item)}>{getCell(item)}</tr>;
        })}
      </tbody>
    </table>
  );
};

const TableHeader = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'th'>) => {
  return <th {...props}>{children}</th>;
};

const TableData = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'td'>) => {
  return <td {...props}>{children}</td>;
};

Table.Header = TableHeader;
Table.Data = TableData;

export default Table;
