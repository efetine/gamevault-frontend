'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { Loading } from '~/components/layout/loading';
import { getUsers } from '~/services/users-service';
import { UsersTable } from './users-table';

export default function AdminUsers() {
  const { data, status, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam }) =>
      getUsers({
        cursor: pageParam,
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  console.log(error);
  const users = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  if (status === 'error') {
    return <div>Cannot show users</div>;
  }

  if (status === 'pending') {
    return <Loading />;
  }

  return (
    <UsersTable
      data={users}
      pagesSize={data.pages.length}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
