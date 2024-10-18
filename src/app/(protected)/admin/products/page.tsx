import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
// import { env } from "~/env";

export default async function Admin() {
  // const response = await fetch(`${env.API_URL}/products`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const products = await response.json();

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                query: {
                  page: page - 1,
                },
              }}
              isActive={page <= 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={{
                query: {
                  page: page + 1,
                },
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
}
