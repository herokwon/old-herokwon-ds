import type { AlignmentX, AlignmentY } from '../../types';

type BaseItemProps = {
  id: string;
};

interface TableProps<Item extends BaseItemProps>
  extends React.ComponentPropsWithoutRef<'div'> {
  layout?: 'auto' | 'dynamic' | 'fixed';
  wordBreak?: 'normal' | 'break-all' | 'keep-all';
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
}

const Table = <Item extends BaseItemProps>({
  layout = 'auto',
  wordBreak = 'break-all',
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
  ...props
}: TableProps<Item>) => {
  const headers = Array.from(
    new Set(
      data.flatMap(item => Object.keys(item).filter(key => key !== 'id')),
    ),
  );

  return (
    <div
      {...props}
      className={`w-full py-2 x-scrollbar ${props.className ?? ''}`}
    >
      <table
        className={`${layout === 'fixed' ? 'table-fixed' : ''} ${
          wordBreak === 'break-all'
            ? 'break-all'
            : wordBreak === 'normal'
              ? 'break-normal'
              : 'break-keep'
        }`}
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
          <tr className={layout === 'dynamic' ? 'last:*:w-full' : ''}>
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
    </div>
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
