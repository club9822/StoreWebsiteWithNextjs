import React from 'react';
import { useRouter } from 'next/router';
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
    <div>
      <p>
        <a>
          id:
          {id}
        </a>

      </p>
      <a>
        mobile: {mobile}
      </a>
    </div>
  );
}

export default page;
