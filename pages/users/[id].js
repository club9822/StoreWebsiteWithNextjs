import React from 'react';
import { useRouter } from 'next/router';
import { getUser } from '../../api_call';
import Image from 'next/image'

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
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    </div>
  );
}

export default page;
