import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Head from 'next/head';
import cn from 'classnames';
import classNames from 'classnames';
import Layout from '../../components/layout';
import styles from './index.module.css';
import { getUsersList } from '../../api_call/index';

const queryString = require('query-string');

function Pagination(props) {
  const { currentPage = 1, count = 0 } = props;
  if (count === 0) {
    return null;
  }
  const pagesCount = Math.ceil(count / 10);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div className="flex flex-1 flex-row bg-gray-100 ">
      {
                pages.map((page) => (
                  <a
                    onClick={() => {
                      if (props.onItemClick) {
                        props.onItemClick(page);
                      }
                    }}
                    key={`page_${page}`}
                    className={classNames('text-gray-700 text-center bg-gray-400 px-4 py-2 m-2', currentPage === page ? 'text-grey-400' : '')}
                  >
                    {page || ''}
                  </a>
                ))
            }
    </div>
  );
}
export async function getStaticPaths() {
  const res = await getUsersList();
  return {
    paths: res?.results?.map((item) => item.id) || [],
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const res = await getUsersList();
  return {
    props: {
      users: res?.results,
      count: res?.count,
      currentPage: 1,
      nextPage: res?.next,
    },
  };
}
function Page(props) {
  const {
    users = [], currentPage = 1, nextPage = null, count = 0,
  } = props;
  const [state, setState] = React.useState({
    users, currentPage, nextPage, count,
  });
  return (
    <Layout>
      <Head>
        <title>About US</title>
      </Head>
      <p className={cn([styles.bigp], [styles.little])}>متن ساهتنگی</p>
      <div className={classNames('flex', 'flex-col', 'h-full')}>
        {
            state?.users.map((item) => <Link href={`users/${item.id}`} key={`item_${item.id}`}>{item.mobile || ''}</Link>)
       }
      </div>
      <Pagination
        currentPage={state.currentPage}
        count={state.count}
        onItemClick={(page) => {
          getUsersList(page).then((res) => {
            console.log('res', res);
            setState({
              ...state,
              users: res.results,
              currentPage: page,
              nextPage: res.next,
            });
          }).catch((e) => {
            console.log(e);
          });
        }}
      />
      <style jsx>
        {`
 
        `}
      </style>
    </Layout>
  );
}

export default Page;
