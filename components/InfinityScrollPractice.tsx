import axios from 'axios';
import React, { Fragment, MutableRefObject, useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { InfinityResponse } from '../pages/api/infinity';
import Link from 'next/link';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function InfinityScrollPractice() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    'projects',
    async ({ pageParam = 0 }) => {
      const res = await axios.get<InfinityResponse>('/api/infinity?cursor=' + pageParam);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  const loadMoreButtonRef: MutableRefObject<HTMLButtonElement | null> =
    useRef<HTMLButtonElement>(null);

  console.log('ref: ', loadMoreButtonRef.current);
  console.log('data: ', data);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === 'loading' && <p>Loading....</p>}
      {status === 'error' && <p>Error....</p>}
      {status === 'success' && (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load Older'
                : 'Nothing more to load'}
            </button>
          </div>

          {data?.pages.map((page) => (
            <Fragment key={page.nextId}>
              {page.data.map((project) => (
                <p
                  style={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    padding: '10rem 1rem',
                    background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={project.id}
                >
                  {project.name}
                </p>
              ))}
            </Fragment>
          ))}
          <div>{isFetching && !isFetchingNextPage ? 'Background Updating....' : null}</div>
        </>
      )}
      <hr />

      <div>
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          style={{ display: `${data ? 'block' : 'none'}` }}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
      <Link href="/about">
        <a>Go to another page</a>
      </Link>
    </div>
  );
}

export default InfinityScrollPractice;
