import Head from 'next/head';

const Index = () => {
  return (
    <div className={'wrap'}>
      <Head>
        <title>Typescript Serverless Nextjs React Boilerplate</title>
      </Head>
      <h1>hello world</h1>
    </div>
  );
}

Index.getInitialProps = () => ({ blah: 'blah' });

export default Index;