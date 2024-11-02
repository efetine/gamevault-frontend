import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '~/components/ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  hasNextPage: boolean;
  pagesSize: number;
  fetchNextPage: Function;
}

export function DataTablePagination<TData>({
  table,
  pagesSize = 10,
  hasNextPage = false,
  fetchNextPage,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex w-full flex-col items-center justify-between px-2">
      <div className="mx-auto flex items-center justify-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] flex-1 items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={table.getCanPreviousPage() === false}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              if (pagesSize <= table.getPageCount()) {
                fetchNextPage();
              }

              table.nextPage();
            }}
            disabled={table.getCanNextPage() === false && hasNextPage === false}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
