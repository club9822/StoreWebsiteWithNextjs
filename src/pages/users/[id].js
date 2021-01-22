import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { Head } from "next/document";
import { getUser } from '../../api_call';

export async function getServerSideProps(context) {
  const id = context?.query?.id;
  let user = {
    id,
  };

  try {
    user = await getUser(id);
  } catch (e) {
  //
  }
  return {
    props: {
      user,
    },
  };
}

function page(props) {
  // const { query } = useRouter();
  // const id = query?.id;
  const { user: { id = '', mobile = '' } } = props;
  return (
    <Layout>
      <Head>
        <title>About US</title>
      </Head>
      <p>
        <a>
          id:
          {id}
        </a>

      </p>
      <a>
        mobile:
        {' '}
        {mobile}
      </a>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    </Layout>
  );
}

export default page;
