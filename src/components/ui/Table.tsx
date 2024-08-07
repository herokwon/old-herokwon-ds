import type { AlignmentX, AlignmentY } from '../../types';

type TableProps<Item extends object = object> = {
  alignX?: AlignmentX;
  alignY?: AlignmentY;
  data: Item[];
  getKey: (item: Item) => React.Key;
  getCell: (item: Item) => React.ReactNode;
};

const Table = <Item extends object>({
  alignX = 'left',
  alignY = 'middle',
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
    <table className={`align-${alignX} align-${alignY}`}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <TableHeader key={index} scope="col">
              {header}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
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
