'use client';

import { ColumnDef } from '@tanstack/react-table';

// import { DataTableColumnHeader } from "./data-table-column-header";
import { GetUser } from '~/services/users-service';

export const columns: ColumnDef<GetUser>[] = [
  {
    accessorKey: 'id',
  },
  {
    accessorKey: 'profileImage',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <img
          alt="Profile image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={row.getValue('profileImage')}
          width="64"
        />
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'bannedReason',
    header: 'Banned Reason',
  },
];
